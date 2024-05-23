const mongoose = require('mongoose');


const PostsModel = mongoose.model(
    //"node-video-api",
    "users-db-test",
    {
      author: {
        type: String,
        required: true
      },
      bid: {
        type: String,//type number
        required: true
      },
      story: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: false
      },
      videoUrl: {
        type: String,
        required: false
      },
      date: {
          type: Date,
          default: Date.now
      }
    },
    //"runways"
    "users"
);

module.exports = { PostsModel };