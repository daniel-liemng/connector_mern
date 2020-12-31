const authProtect = require("../../middleware/authMiddleware");
const authController = require("../../controllers/authController");
const { userLoginValidator } = require("../../validator/userValidator");

const router = require("express").Router();

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
router.get("/", authProtect, authController.authUser);

// @route   POST api/auth
// @desc    Login user: Authenticate user and get token
// @access  Public
router.post("/", userLoginValidator, authController.loginUser);

module.exports = router;
