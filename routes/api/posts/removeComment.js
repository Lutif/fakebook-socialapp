const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Posts = require('../../../models/Posts');
const User = require('../../../models/User');

//@route   posts/comment/:id
//@desc    add comment on a post
//@access  private

router.delete('/posts/comment/:postId/:commentId', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (
      post.comments.filter(
        comment => comment.id.toString() === req.params.commentId
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'No comment found' });
    }
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.commentId);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
