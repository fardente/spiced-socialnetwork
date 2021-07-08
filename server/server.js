const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// app.get("/users", (request, response) => {
//     console.log("getiusers");
//     db.getUsers().then((result) => {
//         console.log("getingusers", result);
//         response.json(result);
//     });
// });

app.post("/api/register", (request, response) => {
    // console.log("adding user", request.body);
    db.addUser(request.body)
        .then((result) => {
            // console.log("server register post result", result);
            response.json(result);
        })
        .catch((error) => {
            console.log("server.js register", error);
            response.status(400);
            response.json(error);
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
