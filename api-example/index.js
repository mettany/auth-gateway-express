const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const config = require("./lib/config");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${config.issuerBaseURL}.well-known/jwks.json`
  }),
  audience: config.audience,
  issuer: config.issuerBaseURL,
  algorithms: ["RS256"]
});

const app = express();
app.use(cors({ origin: true, credentials: true}));
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));