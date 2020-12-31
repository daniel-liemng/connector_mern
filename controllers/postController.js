const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");
const router = require("../routes/api/posts");

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

// @route   GET api/posts/:postId
// @desc    Get a post by ID
// @access  Private
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/posts/:postId
// @desc    Delete a post - Just creator can delete post
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }

    // Check if user is the creator
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "User Not Authorized" }] });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ errors: [{ msg: "Post already liked" }] });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/posts/unlike/:postId
// @desc    Unike a post
// @access  Private
const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }

    // Check if the post has not been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Post has not yet been liked" }] });
    }

    // Get the remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // No index found
    if (removeIndex === -1) {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
};
