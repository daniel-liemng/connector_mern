const authProtect = require("../../middleware/authMiddleware");
const authController = require("../../controllers/authController");

const router = require("express").Router();

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
router.get("/", authProtect, authController.authUser);

module.exports = router;
