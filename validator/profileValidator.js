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

const experienceValidator = [
  body("title", "Title is required").not().isEmpty(),
  body("company", "Company is required").not().isEmpty(),
  body("from", "From date is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const educationValidator = [
  body("school", "School is required").not().isEmpty(),
  body("degree", "Degree is required").not().isEmpty(),
  body("fieldofstudy", "Field of study is required").not().isEmpty(),
  body("from", "From date is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { profileValidator, experienceValidator, educationValidator };
