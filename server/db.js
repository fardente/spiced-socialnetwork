const pg = require("spiced-pg");
const { compare } = require("bcryptjs");
const hashpass = require("./hashpass");

let db;
if (process.env.DATABASE_URL) {
    db = pg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets.json");
    db = pg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
}

function getUsers() {
    return db
        .query("SELECT * FROM users")
        .then((result) => {
            return result.rows;
        })
        .catch((error) => {
            console.log("db.js get user error", error.message);
            throw error.message;
        });
}

function getUserById(id) {
    return db
        .query(
            "SELECT id, firstname, lastname, avatar_url, email, bio FROM users WHERE id = $1",
            [id]
        )
        .then((result) => {
            return result.rows[0];
        })
        .catch((error) => {
            console.log("db.js get user by ID error", id, error.message);
            throw error.message;
        });
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => {
            return result.rows[0];
        })
        .catch((error) => {
            console.log("db.js get user by email error", error.message);
            throw error.message;
        });
}

async function getFriends(id) {
    try {
        const { rows } = await db.query(
            "SELECT * FROM friends WHERE (sender_id = $1 OR receiver_id = $1) AND accepted = true",
            [id]
        );
        return rows;
    } catch (error) {
        console.error("db getFriends ", error);
        throw error;
    }
}

async function getFriendsAndWannabes(user_id) {
    try {
        const { rows } = await db.query(
            `SELECT users.id, firstname, lastname, avatar_url, accepted
                FROM friends
                JOIN users
                ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
                OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
                OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
            [user_id]
        );
        return rows;
    } catch (error) {
        console.error("db getFriendsAndWannabes", error);
    }
}

async function getFriendshipStatus(viewer_id, viewee_id) {
    try {
        const { rows } = await db.query(
            "SELECT * FROM friends WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)",
            [viewer_id, viewee_id]
        );
        return rows[0];
    } catch (error) {
        console.error("db getFriendshipStatus ", error);
        throw error;
    }
}

async function addFriend({ sender_id, receiver_id }) {
    try {
        const { rows } = await db.query(
            "INSERT INTO friends (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
            [sender_id, receiver_id]
        );
        return rows;
    } catch (error) {
        console.error("db addFriend ", error);
        throw error;
    }
}

async function acceptFriendRequest(id) {
    try {
        const { rows } = await db.query(
            "UPDATE friends SET accepted = true WHERE id = $1 RETURNING *",
            [id]
        );
        return rows;
    } catch (error) {
        console.error("db acceptFriendRequest", error);
        throw error;
    }
}

async function deleteFriendship(id) {
    try {
        const result = await db.query(
            "DELETE FROM friends WHERE id = $1 RETURNING *",
            [id]
        );
        return result;
    } catch (error) {
        console.error("db deleteFriendship", error);
        throw error;
    }
}

async function getRecentUsers(limit) {
    try {
        const { rows } = await db.query(
            "SELECT id, firstname, lastname, avatar_url FROM users ORDER BY id DESC LIMIT $1",
            [limit]
        );
        return rows;
    } catch (error) {
        console.error("db.js getRecentUsers", error);
        throw error;
    }
}

async function searchUser(query) {
    try {
        const { rows } = await db.query(
            "SELECT id, firstname, lastname, avatar_url FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1",
            [query + "%"]
        );
        return rows;
    } catch (error) {
        console.error("db searchUser", error);
        throw error;
    }
}

async function checkMail(email) {
    let exists = false;
    console.log("checking mail", email);
    try {
        console.log("enter try");
        exists = await db.query("SELECT id FROM users WHERE email = $1", [
            email,
        ]);
        exists = exists.rows[0];
        console.log("Exists", exists);
        exists = !!exists;
    } catch (error) {
        console.log("error", error);
        exists = false;
    }
    return exists;
}

async function addCode(email, code) {
    let result;
    try {
        result = await db.query(
            "INSERT INTO passreset (email, code) VALUES ($1, $2) RETURNING email",
            [email, code]
        );
    } catch (error) {
        console.log("db addCode error", error);
        result = false;
    }
    return result;
}

async function checkCode(email) {
    let storedCode;
    try {
        storedCode = await db.query(
            "SELECT * FROM passreset WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1",
            [email]
        );
        storedCode = storedCode.rows[0].code;
        console.log("got code from db", storedCode);
    } catch (error) {
        console.log("db checkCode error", error);
        storedCode = null;
    }
    return storedCode;
}

async function changePassword(email, newpassword) {
    console.log("db changepassword", email, newpassword);
    let passwordhash = await hashpass(newpassword);
    console.log("db changepw new hash", passwordhash);
    let result = await db.query(
        "UPDATE users SET passwordhash = $2 WHERE email = $1",
        [email, passwordhash]
    );
    return result;
}

function login({ email, password }) {
    return getUserByEmail(email).then((user) => {
        if (user) {
            return compare(password, user.passwordhash).then((result) => {
                if (result) {
                    return user.id;
                }
                throw new Error("Wrong password!");
            });
        }
        throw new Error(`No user with email ${email} found`);
    });
}

function addUser({ firstname, lastname, email, password }) {
    return hashpass(password)
        .then((passwordhash) => {
            return db
                .query(
                    "INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ($1,$2,$3,$4) RETURNING *",
                    [firstname, lastname, email, passwordhash]
                )
                .then((result) => {
                    return result.rows[0];
                })
                .catch((error) => {
                    console.log("db.js addUser error", error.message);
                    throw error.message;
                });
        })
        .catch((error) => {
            console.log("db adduser hashpass error", error.message);
            throw error.message;
        });
}

async function updateBio(id, bio) {
    console.log("db update bio", id, bio);
    const result = await db.query("UPDATE users SET bio = $2 WHERE id = $1", [
        id,
        bio,
    ]);
    console.log(result);
    return result;
}

async function updateAvatar(id, avatar_url) {
    const result = await db.query(
        "UPDATE users SET avatar_url = $2 WHERE id = $1 RETURNING *",
        [id, avatar_url]
    );
    return result.rows[0].avatar_url;
}

async function getChat() {
    try {
        const { rows } = await db.query(
            `SELECT chat.id, sender_id, message, firstname, lastname, avatar_url, chat.created_at 
            FROM chat
            JOIN users on users.id = sender_id
            ORDER BY chat.id DESC LIMIT 10`,
            []
        );
        return rows;
    } catch (error) {
        console.error("db getChat", error);
        throw error;
    }
}

// Get messages in reverse order, obsolete with flex-direction: column-reverse;
// async function getChat() {
//     try {
//         const { rows } = await db.query(
//             `SELECT * FROM (SELECT chat.id, sender_id, message, firstname, lastname, avatar_url, chat.created_at
//             FROM chat
//             JOIN users on users.id = sender_id
//             ORDER BY chat.id DESC LIMIT 10) AS M ORDER BY id ASC`,
//             []
//         );
//         return rows;
//     } catch (error) {
//         console.error("db getChat", error);
//         throw error;
//     }
// }

async function addChat(id, message) {
    try {
        const { rows } = await db.query(
            "INSERT INTO chat (sender_id, message) VALUES ($1, $2) RETURNING *",
            [id, message]
        );
        return rows[0];
    } catch (error) {
        console.error("db addChat", error);
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserByEmail,
    getUserById,
    getRecentUsers,
    addFriend,
    acceptFriendRequest,
    getFriends,
    getFriendsAndWannabes,
    getFriendshipStatus,
    deleteFriendship,
    searchUser,
    checkMail,
    addCode,
    checkCode,
    changePassword,
    login,
    addUser,
    updateAvatar,
    updateBio,
    getChat,
    addChat,
};
