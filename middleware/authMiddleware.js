const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authProtect = async (req, res, next) => {
  let token;

  // Check if token exist and start with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // req.user = await User.findById(decoded.id).select("-password");
      req.user = decoded.user;
      next();
    } catch (err) {
      console.error(err.message);
      res
        .status(401)
        .json({ errors: [{ msg: "Not authorized, token failed" }] });
      // throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json({ errors: [{ msg: "Not authorized, no token" }] });
    // throw new Error("Not authorized, no token");
  }
};

module.exports = authProtect;
