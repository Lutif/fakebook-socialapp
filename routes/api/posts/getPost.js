const express = require('express');
const router = express.Router();
const Post = require('../../../models/Posts');
const auth = require('../../../middleware/auth');

//@route Get api/posts/:id
//@desc  Get post by id
//@access private

router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post_id = req.params.id;
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ msg: 'No post found   ' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'No post found   ' });
    }
    res.status(500).send('server error');
  }
});

module.exports = router;
