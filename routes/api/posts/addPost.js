const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Posts = require('../../../models/Posts');
const User = require('../../../models/User');

//@route  /posts
//@desc   create a post
//@access private

router.post(
  '/posts',
  [
    auth,
    [
      check('text', 'Text is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        console.error(err.message);
        return res.status(400).json(err.array());
      }
      const user = await User.findOne({ _id: req.user.id }).select('-password');
      let newPost = Posts({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
// check for required data
//extract data and contruct post object
// populate post object with user data
//save post object and return same.
