const {secret, clientID, clientSecret, issuerBaseURL, protocol, host, port, audience} = require("../config.json");

const config = {
  auth: {
    baseURL: `${protocol}://${host}${port ? ":"+port : ""}`,
    clientID,
    clientSecret,
    issuerBaseURL,
    audience,
  },
  session: {
    secret,
    name: "app-session",
    resave: true,
    saveUninitialized: true,
    cookie: {
      signed: true,
      secure: false,
      maxAge: 86400000,
      httpOnly: true,
    }
  },
  port
};

module.exports = config;