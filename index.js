const express = require("express");
const session = require("express-session");

const config = require("./lib/config");
const { login, token } = require("./lib/auth");

const app = express();
app.use(session(config.session));

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + (req.session.cookie.maxAge / 1000) + "s</p>");
  } else {
    req.session.views = 1;
    res.write("welcome to the session demo. refresh!");
  }
  if(req.session.auth) res.write("Authenticated");
  res.end();
});

app.get("/login", login);
app.get("/callback", token);



app.listen(config.port, () => console.log(`App listening on port ${config.port}`));