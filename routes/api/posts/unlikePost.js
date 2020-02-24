const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Posts = require('../../../models/Posts');

//@route Put api/posts/unlike/:id
//@dec   unlike any the post
//@access private

router.put('/posts/unlike/:id', auth, async (req, res) => {
  try {
    post = await Posts.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json('User not liked yet');
    }
    const removeIndex = post.likes
      .map(likes => likes.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
