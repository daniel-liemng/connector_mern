const authProtect = require("../../middleware/authMiddleware");
const postController = require("../../controllers/postController");
const { postValidator } = require("../../validator/postValidator");

const router = require("express").Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post("/", authProtect, postValidator, postController.createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", authProtect, postController.getAllPosts);

module.exports = router;
