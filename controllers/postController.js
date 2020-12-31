const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
const createPost = async (req, res) => {
  const { text } = req.body;

  try {
    // Find current user to get name & avatar
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
const getAllPosts = async (req, res) => {
  try {
    // Get most recent posts - order
    const allPosts = await Post.find().sort({ date: -1 });

    res.json(allPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createPost, getAllPosts };
