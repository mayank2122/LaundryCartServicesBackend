const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  password: { type: String, required: true },
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
