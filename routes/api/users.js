const userController = require("../../controllers/userController");
const { userRegisterValidator } = require("../../validator/userValidator");

const router = require("express").Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", userRegisterValidator, userController.registerUser);

module.exports = router;
