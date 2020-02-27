const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();
const Profile = require('../../../models/Profile');
const { check, validationResult } = require('express-validator');

//@route  api/profile/experience
//@desc  add_Experience
//@access private

router.put(
  '/profile/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('from', 'From is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      let error = validationResult(req);
      if (!error.isEmpty()) {
        console.error(error.message);
        res.status(400).json({ msg: error.array() });
      }

      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      Console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
