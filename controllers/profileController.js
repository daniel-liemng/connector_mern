const User = require("../models/User");
const Profile = require("../models/Profile");

// @route   GET api/profile/me
// @desc    Get current, logged in user profile
// @access  Private
const getCurrentUserProfile = async (req, res) => {
  try {
    // Get profile by the ID from authProtect - Private
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
const createUpdateProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;

  // skills input: string -> an array
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  // Build social Object
  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);

    await profile.save();

    res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // Show error if userId in URL not in the ObjectID types of Mongoose
    if (err.kind === "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "Profile Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    // Delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Delete user
    await User.findOneAndRemove({ _id: req.user.id });

    // Delete posts

    res.json({ msg: "User, Profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
const addExperience = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  try {
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExperience);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    // No index found
    if (removeIndex === -1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Experience Not Found" }] });
    }

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // Show error if expId in URL not in the ObjectID types of Mongoose
    if (err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "Experience Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
const addEducation = async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  try {
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEducation);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/profile/education/:eduId
// @desc    Delete education from profile
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    // No index found
    if (removeIndex === -1) {
      return res.status(400).json({ errors: [{ msg: "Education Not Found" }] });
    }

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // Show error if eduId in URL not in the ObjectID types of Mongoose
    if (err.kind === "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "Education Not Found" }] });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCurrentUserProfile,
  createUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
};
