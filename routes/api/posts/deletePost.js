const express = require('express');
const router = express.Router();
const Post = require('../../../models/Posts');
const auth = require('../../../middleware/auth');

//@route Delete api/posts/:id
//@desc  Delete a post
//@access private

router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ msg: 'No post found   ' });
    }
    if (post.user.toString() !== user_id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    return res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'No post found   ' });
    }
    return res.status(500).send('server error');
  }
});

module.exports = router;
