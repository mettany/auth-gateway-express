const axios = require("axios").default;
const { v4: uuid } = require("uuid");
const { auth } = require("./config");

const scope = "openid profile email offline_access";

const login = (req, res) => {
  const state = uuid();
  req.session.state = state;
  const url = `${auth.issuerBaseURL}/authorize?audience=${auth.audience}&scope=${scope}&response_type=code&client_id=${auth.clientID}&redirect_uri=${auth.baseURL}/callback&state=${state}`;
  res.redirect(url);
};

const token = async (req, res) => {
  if(req.query.error) {
    console.log(req.query.error_description);
    res.end(req.query.error_description);
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
  res.redirect("/");
};

module.exports = {
  login,
  token,
};
