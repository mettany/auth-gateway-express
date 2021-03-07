const {secret, clientID, clientSecret, issuerBaseURL, protocol, host, cookieDomain, port, audience, env} = require("../config.json");

const config = {
  env,
  auth: {
    baseURL: `${protocol}://${host}${env === "DEV" ? ":"+port : ""}`,
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
      domain: cookieDomain
    }
  },
  port
};

module.exports = config;