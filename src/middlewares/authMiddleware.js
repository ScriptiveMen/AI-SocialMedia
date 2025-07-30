const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - please login again!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ _id: decoded.id });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token - please login again.",
    });
  }
}

module.exports = authMiddleware;
