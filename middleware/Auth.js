const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
  try {
    const token = req.headers["auth-token"];

    console.log("token", token);

    let decoded = jwt.verify(token, "jwtsecretkey");

    if (!decoded) {
      return res.status(404).json({
        status: false,
        message: "please login to continue",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: " something went wrong try again later ",
    });
  }
}

module.exports = authorization;
