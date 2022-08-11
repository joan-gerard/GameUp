const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  profileImageUrl: String,
  createdAt: String,
});

module.exports = model('User', UserSchema)