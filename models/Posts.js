const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      name: {
        type: String
      },

      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Posts = new mongoose.model("post", postSchema);

module.exports = Posts;
//text
//user
//time
//likes
////user
//comment
////user
////time
////text
