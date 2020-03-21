var mongoose = require('mongoose');

var userPost = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  postDesc: String,
  flag: {type: Number, enum: [0, 1], default: 1}, //0 : inactive, 1: active
  comment: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        status: {type: Number, enum: [0, 1], default: 1}, //0 : hide, 1: visible
        createdOn: Date,
  }]
}, {
  timestamps: true
});

var userPost = mongoose.model("UserPost", userPost, "userPost");

module.exports = userPost