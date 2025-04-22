const mongoose = require("mongoose");

const bulkDescriptionSchema = new mongoose.Schema({
  userID: String,
  bulkDescriptions: Array,
  storeName: String,
  bulkDescriptionID: String,
  date: Date,
});

const BulkDescription = mongoose.model(
  "BulkDescription",
  bulkDescriptionSchema
);

module.exports = BulkDescription;
