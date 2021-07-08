const pg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = pg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets.json");
    db = pg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
}

function getUsers() {
    return db
        .query("SELECT * FROM useres")
        .then((result) => {
            return result.rows;
        })
        .catch((error) => {
            console.log("db.js get user error", error);
        });
}

function addUser({ firstname, lastname, email, passwordhash }) {
    return db
        .query(
            "INSERT INTO users (firstname, lastname, email, passwordhash) VALUES ($1,$2,$3,$4) RETURNING *",
            [firstname, lastname, email, passwordhash]
        )
        .then((result) => {
            console.log("db.js Added user ", result);
            return result.rows;
        })
        .catch((error) => {
            console.log("db.js addUser error", error);
        });
}

module.exports = {
    getUsers,
    addUser,
};
