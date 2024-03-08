const mongoose = require("mongoose");

// Define the schema for your MongoDB collection
const toDoCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const ToDoCategory = mongoose.model("ToDoCategory", toDoCategorySchema);

module.exports = {
  ToDoCategory,
};
