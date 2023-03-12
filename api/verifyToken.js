const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verify(req, res, next) {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
    //   console.log(user);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Not authenticated");
  }
}

module.exports = verify;
