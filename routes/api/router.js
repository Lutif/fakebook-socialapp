const express = require('express');

const auth = require('./auth');
const users = require('./users');
const posts = require('./posts/posts');
const profile = require('./profile/profile');

const router = express.Router();

//@route  api/
//@desc  Test
//@access public

router.use([auth, users, posts, profile]);

module.exports = router;
