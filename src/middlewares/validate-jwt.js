const jwt = require("jsonwebtoken");
const { checkJWT } = require("../helpers/jwt");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There is no token in the request",
    });
  }
  const [valid, uid] = checkJWT(token);
  if (!valid) {
    return res.status(401).json({
      ok: false,
      msg: "Token is not valid",
    });
  }
  req.uid = uid;

  next();
};

module.exports = {
  validateJWT,
};
