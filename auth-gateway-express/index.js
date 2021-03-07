const express = require("express");
const cors = require("cors");
const session = require("express-session");

const config = require("./lib/config");
const { login, token, getUserInfos, authProxy } = require("./lib/auth");

const app = express();
app.use(session(config.session));
app.use(cors({ origin: true, credentials: true}));

app.get("/login", login);
app.get("/callback", token);
app.get("/userinfos", getUserInfos);
app.get("/auth", authProxy);

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));