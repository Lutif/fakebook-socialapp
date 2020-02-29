const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

//@route  api/profile/education/:edu_id
//@desc  delete_Education
//@access private

router.delete('/profile/education/:edu_id', auth, async (req, res) => {
  try {
    //get user id
    //get edu_id
    //find profile
    // find index using edu_id
    //splice using index
    const removeEduId = req.params.edu_id;
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });
    const removeIndex = profile.education
      .map(edu => edu.id)
      .indexOf(removeEduId);
    if (removeIndex == -1) {
      throw Error('No record found');
    }
    profile.education.splice(removeIndex, 1);
    profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
