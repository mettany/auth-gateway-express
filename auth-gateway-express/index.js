const express = require("express");
const cors = require("cors");
const session = require("express-session");

const config = require("./lib/config");
const { login, token, getUserInfos, authProxy } = require("./lib/auth");

const app = express();
const appAdmin = express();

const sessionMiddlware = session(config.session);
const corsMiddleware = cors({ origin: true, credentials: true});
app.use(sessionMiddlware);
appAdmin.use(sessionMiddlware);
app.use(corsMiddleware);
appAdmin.use(corsMiddleware);

app.get("/login", login);
app.get("/callback", token);
app.get("/userinfos", getUserInfos);
appAdmin.get("/auth", authProxy);

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));
appAdmin.listen(3001, () => console.log("AppAdmin listening on port 3001"));