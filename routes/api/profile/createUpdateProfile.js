const express = require("express");
const auth = require("../../../middleware/auth");
const router = express.Router();
const Profile = require("../../../models/Profile");
const { check, validationResult } = require("express-validator");

//@route  api/profile/me
//@desc  create_update_profile
//@access private

router.post(
  "/profile/me",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log("profile/me get was hit");
    try {
      let err = validationResult(req);
      if (!err.isEmpty()) return res.status(400).json({ error: err.array() });
      profileFields = createProfile(req);
      //check if profile exist
      let profile = await Profile.findOne({ user: req.user.id });
      //Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }
      //create new
      else {
        profile = new Profile(profileFields);
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.send("server error");
    }
  }
);

module.exports = router;

function createProfile(req) {
  const {
    company,
    location,
    website,
    bio,
    status,
    github,
    skills,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube
  } = req.body;

  //creating profile
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (status) profileFields.status = status;
  if (location) profileFields.location = location;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (github) profileFields.github = github;
  if (skills && !Array.isArray(skills)) {
    profileFields.skills = skills.split(",").map(skill => skill.trim());
  }
  //creating profile.social
  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;
  if (youtube) profileFields.social.youtube = youtube;
  if (linkedin) profileFields.social.linkedin = linkedin;

  return profileFields;
}
