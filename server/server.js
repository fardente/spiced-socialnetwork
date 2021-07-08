const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");

app.use(compression());

app.use(express.json());

app.use(
    cookieSession({
        secret: "This is the most secret secret",
        maxAge: 1000 * 60 * 60 * 24,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// app.get("/users", (request, response) => {
//     console.log("getiusers");
//     db.getUsers().then((result) => {
//         console.log("getingusers", result);
//         response.json(result);
//     });
// });

app.get("/api/user/id.json", function (request, response) {
    response.json({
        userId: request.session.userId,
    });
});

app.post("/api/register", (request, response) => {
    // console.log("adding user", request.body);
    db.addUser(request.body)
        .then((result) => {
            console.log("server register post result", result, result.id);
            request.session.userId = result.id;
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
