const express = require('express');
const router = express.Router();
const Profile = require('../../../models/Profile');
// const User = require('../../models/User');

//@route  api/profile/user/:user_id
//@desc  get user profile by id
//@access public
router.get('/profile/user/:user_id', async (req, res) => {
  try {
    const id = req.params.user_id;
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) return res.status(400).send('Profile not found');
    res.send(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') return res.send('Profile not found');
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
