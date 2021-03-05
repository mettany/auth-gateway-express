const express = require("express");
const session = require("express-session");
const auth = require("express-openid-connect");

const config = require("./config");

const app = express();
app.use(session(config.session));

app.get("/", function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader("Content-Type", "text/html")
    res.write("<p>views: " + req.session.views + "</p>")
    res.write("<p>expires in: " + (req.session.cookie.maxAge / 1000) + "s</p>")
    res.end()
  } else {
    req.session.views = 1
    res.end("welcome to the session demo. refresh!")
  }
});


app.listen(config.port, () => console.log(`App listening on port ${config.port}`));