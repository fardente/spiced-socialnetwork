const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const uploader = require("./uploader");
const { upload } = require("./s3");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");

const awsBucketUrl = "https://nandoseimer.s3.amazonaws.com/";

app.use(compression());

app.use(express.json());

app.use(
    cookieSession({
        secret: "This is the most secret secret",
        maxAge: 1000 * 60 * 60 * 24,
    })
);

app.use(csurf());

app.use(function (request, response, next) {
    response.cookie("csrftoken", request.csrfToken());
    next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api/user/id.json", (request, response) => {
    response.json({
        userId: request.session.userId,
    });
});

app.get("/api/user/", async (request, response) => {
    response.json(await db.getUserById(request.session.userId));
});

app.get("/api/user/:id", async (request, response) => {
    const id = request.params.id;
    console.log(id);
    response.json(await db.getUserById(id));
});

// app.get("/api/user/", (request, response) => {
//     db.getUserByEmail(request.body.email).then((user) => {
//         response.json(user);
//     });
// });

app.post("/password/reset/start", async (request, response) => {
    // console.log(request.body);
    let exists = await db.checkMail(request.body.email);
    if (exists) {
        const secretCode = cryptoRandomString({
            length: 6,
        });
        let storeCode = await db.addCode(request.body.email, secretCode);
        console.log("server stored code", storeCode);
        let mail = sendEmail({
            subject: "Your code to reset your password",
            message: `Please enter the following code to reset your password: ${secretCode}`,
            email: "schwip+ses2@mailbox.org",
        });
        console.log(mail);
    }
    response.json({
        exists,
    });
});

app.post("/password/reset/verify", async (request, response) => {
    console.log(request.body);
    let storedCode = await db.checkCode(request.body.email);
    console.log("server ", storedCode, request.body.code);
    let codeValid = storedCode == request.body.code;
    console.log("server codes match ", codeValid);
    if (codeValid) {
        let passwordChange = await db.changePassword(
            request.body.email,
            request.body.newpassword
        );
        response.json({
            success: passwordChange,
        });
    } else {
        response.json({
            success: false,
        });
    }
});

app.post("/api/login", (request, response) => {
    console.log("logging in user", request.body);
    db.login(request.body)
        .then((result) => {
            console.log("server login post result", result);
            request.session.userId = result;
            response.json(result);
        })
        .catch((error) => {
            console.log("server.js login", error);
            response.statusCode = 400;
            response.json({ error: error });
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
            response.json({ error: error });
        });
});

app.post("/api/user/updatebio", async (request, response) => {
    const result = await db.updateBio(request.session.userId, request.body.bio);
    response.json(result);
});

app.post(
    "/api/upload",
    uploader.single("file"),
    upload,
    async (request, response) => {
        console.log(request.body, request.file);
        request.body.url = awsBucketUrl + request.file.filename;
        if (request.file) {
            let result = await db.updateAvatar(
                request.session.userId,
                request.body.url
            );
            response.json(result);
        } else {
            response.json({
                success: false,
            });
        }
    }
);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
