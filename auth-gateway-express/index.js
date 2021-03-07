const express = require("express");
const cors = require("cors");
const session = require("express-session");
const jwt_decode = require("jwt-decode");

const config = require("./lib/config");
const { login, token } = require("./lib/auth");

const app = express();
app.use(session(config.session));
app.use(cors({ origin: true, credentials: true}));

app.get("/login", login);
app.get("/callback", token);
app.get("/userinfos", (req, res) => {
  const session = req.session.auth;
  if(session) {
    res.json(jwt_decode(session.id_token));
    return;
  }
  res.status(401).end();
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));