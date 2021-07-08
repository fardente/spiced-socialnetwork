const pg = require("spiced-pg");
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

module.exports = {
    getUsers,
    addUser,
};
