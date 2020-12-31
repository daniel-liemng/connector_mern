const authProtect = require("../../middleware/authMiddleware");
const profileController = require("../../controllers/profileController");
const {
  profileValidator,
  experienceValidator,
  educationValidator,
} = require("../../validator/profileValidator");

const router = require("express").Router();

// @route   GET api/profile/me
// @desc    Get current, logged in user profile
// @access  Private
router.get("/me", authProtect, profileController.getCurrentUserProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  authProtect,
  profileValidator,
  profileController.createUpdateProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", profileController.getAllProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:userId", profileController.getProfileByUserId);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", authProtect, profileController.deleteProfile);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  authProtect,
  experienceValidator,
  profileController.addExperience
);

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:expId",
  authProtect,
  profileController.deleteExperience
);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  authProtect,
  educationValidator,
  profileController.addEducation
);

// @route   DELETE api/profile/education/:eduId
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:eduId",
  authProtect,
  profileController.deleteEducation
);

// @route   GET api/profile/github/:username
// @desc    Get user repo from Github
// @access  Public
router.get("/github/:username", profileController.getGithubRepos);

module.exports = router;
