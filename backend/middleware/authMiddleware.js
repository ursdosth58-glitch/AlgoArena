const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

  try {

    let token = req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        message: "Not authorized, no token",
      });

    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token failed",
    });

  }

};

module.exports = protect;