const express = require("express");
const session = require("express-session");

const config = require("./lib/config");
const { login, token } = require("./lib/auth");

const app = express();
app.use(session(config.session));

app.get("/login", login);
app.get("/callback", token);

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));