const express = require('express');
const router = express.Router();
const Post = require('../../../models/Posts');
const auth = require('../../../middleware/auth');
//@route Get api/posts
//@desc  Get all the posts
//@access private

router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send('server error');
  }
});

module.exports = router;
