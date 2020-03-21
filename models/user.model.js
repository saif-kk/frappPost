var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  mobile: Number,
  email: String
}, {
  timestamps: true
});


userSchema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("User", userSchema, "user");

module.exports = User;