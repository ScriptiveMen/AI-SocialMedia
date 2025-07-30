const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - please login again!",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = userModel.findOne({ _id: decode.id });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token - please login again.",
    });
  }
}

module.exports = authMiddleware;
