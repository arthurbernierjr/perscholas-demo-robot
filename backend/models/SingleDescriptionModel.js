const mongoose = require("mongoose");

const singleDescriptionSchema = new mongoose.Schema({
  userID: String,
  description: String,
});

const singleDescription = mongoose.model(
  "singleDescription",
  singleDescriptionSchema
);

module.exports = singleDescription;
