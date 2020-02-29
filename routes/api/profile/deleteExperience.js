const router = require('express').Router();
const auth = require('../../../middleware/auth');
const profile = require('../../../models/Profile');

router.delete('/profile/experience/:exp_id', auth, async (req, res) => {
  try {
    const removeId = req.params.exp_id;
    const userId = req.user.id;
    let profile = await Profile.findOne({ user: userId });
    const removeIndex = profile.experience.map(exp => exp.id).indexOf(removeId);
    if (removeIndex == -1) {
      throw Error('No record found');
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
