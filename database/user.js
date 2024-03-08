const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  googleUserId: String,
  hashedPassword: String,
  imageUrl: String,
});
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
