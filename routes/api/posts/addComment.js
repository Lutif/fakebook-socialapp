const router = require("express").Router();
const auth = require("../../../middleware/auth");
const Posts = require("../../../models/Posts");
const User = require("../../../models/User");

//@route   posts/comment/:id
//@desc    add comment on a post
//@access  private

router.put("/posts/comment/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    };
    // console.log("the new comment is ", newComment);
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// find post
// add comment to comment array
// return comments

module.exports = router;
