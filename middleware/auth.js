require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no token! Can't authorize" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "invalid token" });
  }
}

module.exports = auth;
