const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  username: { type: String, require: true },
  avatar: { type: String, require: true },
});

const UserModel = mongoose.model("User", userShema);
module.exports = UserModel;
