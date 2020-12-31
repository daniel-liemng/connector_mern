const { body, validationResult } = require("express-validator");

const postValidator = [
  body("text", "Text is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { postValidator };
