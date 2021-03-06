const express = require("express");
const session = require("express-session");
const { createProxyMiddleware } = require("http-proxy-middleware");

const config = require("./lib/config");
const { login, token } = require("./lib/auth");

const app = express();
app.use(session(config.session));

app.get("/login", login);
app.get("/callback", token);

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV === "DEV") {
  app.use(createProxyMiddleware({ target: "ws://localhost:4000", changeOrigin: true}));
}

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));