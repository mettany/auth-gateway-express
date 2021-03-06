const axios = require("axios").default;
const { v4: uuid } = require("uuid");
const { auth } = require("./config");

const scope = "openid profile email offline_access";

const login = (req, res) => {
  if(!req.query.redirect_uri) {
    res.status(400).end("missing redirect_uri param");
    return;
  }
  const state = uuid();
  req.session.state = state;
  req.session.redirect_uri = req.query.redirect_uri;
  const url = `${auth.issuerBaseURL}/authorize?audience=${auth.audience}&scope=${scope}&response_type=code&client_id=${auth.clientID}&redirect_uri=${auth.baseURL}/callback&state=${state}`;
  res.redirect(url);
};

const token = async (req, res) => {
  if(req.query.error) {
    console.log(req.query.error_description);
    res.end(req.query.error_description);
    return; 
  }

  if(req.query.state !== req.session.state) {
    console.log("state not matching during authentication process");
    res.status(403).end();
    return;
  }

  try {
    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("client_id", auth.clientID);
    body.append("client_secret", auth.clientSecret);
    body.append("code", req.query.code);
    body.append("redirect_uri", `${auth.baseURL}/callback`);

    const response = await axios.post(`${auth.issuerBaseURL}/oauth/token`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    req.session.auth = response.data;
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
  res.redirect(req.session.redirect_uri);
};

module.exports = {
  login,
  token,
};
