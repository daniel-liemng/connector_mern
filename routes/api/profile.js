const authProtect = require("../../middleware/authMiddleware");
const profileController = require("../../controllers/profileController");

const router = require("express").Router();

// @route   GET api/profile/me
// @desc    Get current, logged in user profile
// @access  Private
router.get("/me", authProtect, profileController.getCurrentUserProfile);

module.exports = router;
