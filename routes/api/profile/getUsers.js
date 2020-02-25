const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();
const Profile = require('../../../models/Profile');
// const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route  api/profile
//@desc  get all user list
//@access public
router.get('/profile', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.send(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
