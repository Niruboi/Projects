const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const decryptData = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decryptData.userId;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
