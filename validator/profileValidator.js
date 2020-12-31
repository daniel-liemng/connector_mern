const { body, validationResult } = require("express-validator");

const profileValidator = [
  body("status", "Status is required").not().isEmpty(),
  body("skills", "Skills is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { profileValidator };
