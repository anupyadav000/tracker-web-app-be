const mongoose = require("mongoose");

// Define the schema for your MongoDB collection
const urlCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create a model based on the schema
const UrlCategory = mongoose.model("UrlCategory", urlCategorySchema);

module.exports = {
  UrlCategory,
};
