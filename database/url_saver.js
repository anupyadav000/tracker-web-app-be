const mongoose = require("mongoose");

// Define the schema for your MongoDB collection
const urlSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "UrlCategory" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Url = mongoose.model("Url", urlSchema);

module.exports = {
  Url,
};
