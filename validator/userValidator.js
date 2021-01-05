const { body, validationResult } = require("express-validator");

const userRegisterValidator = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is at least 6 characters long").isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const userLoginValidator = [
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { userRegisterValidator, userLoginValidator };
