const userController = require("../../controllers/userController");
const userValidator = require("../../validator/userValidator");

const router = require("express").Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", userValidator, userController.registerUser);

module.exports = router;
