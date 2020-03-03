const express = require('express');
const router = express.Router();
const Post = require('../../../models/Posts');
const User = require('../../../models/User');
const auth = require('../../../middleware/auth');

//@route Put api/posts/like/:id
//@desc  like a post
//@access private

router.put('/posts/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'User already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
//find the post with id
// find user by user_id
//confirm if no user with this id in post's like array
//add user to post's like array
//return
