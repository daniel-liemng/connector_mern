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

// @route   GET api/posts/:postId
// @desc    Get a post by ID
// @access  Private
router.get("/:postId", authProtect, postController.getSinglePost);

// @route   DELETE api/posts/:postId
// @desc    Delete a post - Just creator can delete post
// @access  Private
router.delete("/:postId", authProtect, postController.deletePost);

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put("/like/:postId", authProtect, postController.likePost);

// @route   PUT api/posts/unlike/:postId
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:postId", authProtect, postController.unlikePost);

module.exports = router;
