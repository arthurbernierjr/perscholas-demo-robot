const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userID: String,
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  stores: { type: Array, default: [{ storeName: "", aboutStore: "" }] },
  isSubscribed: Boolean,
  descriptionCount: { type: Number, default: 1 },
  language: { type: String, default: "English" },
  planType: { type: String, default: "unlimited" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
