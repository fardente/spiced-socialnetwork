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
        .query("SELECT * FROM users WHERE id = $1", [id])
        .then((result) => {
            return result.rows[0];
        })
        .catch((error) => {
            console.log("db.js get user by ID error", error.message);
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

module.exports = {
    getUsers,
    getUserByEmail,
    getUserById,
    checkMail,
    addCode,
    checkCode,
    changePassword,
    login,
    addUser,
    updateAvatar,
    updateBio,
};
