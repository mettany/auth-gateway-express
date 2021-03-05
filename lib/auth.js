const { AuthorizationCode } = require("simple-oauth2");
const { v4: uuid } = require("uuid");
const { auth } = require("./config");

const client = new AuthorizationCode({
  client: {
    id: auth.clientID,
    secret: auth.clientSecret
  }, 
  auth: {
    tokenHost: auth.issuerBaseURL,
    authorizePath: "/authorize"
  }
});

const login = (req, res) => {
  const state = uuid();
  req.session.state = state;
  const authorizationUri = client.authorizeURL({
    redirect_uri: `${auth.baseURL}/callback`,
    scope: "openid profile email offline_access",
    state
  });
  res.redirect(authorizationUri)
}

const token = async (req, res) => {
  const tokenParams = {
    code: req.query.code,
    redirect_uri: `${auth.baseURL}/callback`,
    scope: "openid profile email offline_access",
  };
  try {
    const accessToken = await client.getToken(tokenParams);
    req.session.auth = accessToken.token;
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
  res.redirect("/");
}

module.exports = {
  login,
  token
};
