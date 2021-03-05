const {secret, clientID, clientSecret, issuerBaseURL, protocol, host, port} = require("./config.json");

const config = {
  auth: {
    authRequired: false,
    auth0Logout: true,
    secret,
    baseURL: `${protocol}://${host}${port ? ":"+port : ""}`,
    clientID,
    clientSecret,
    issuerBaseURL,
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