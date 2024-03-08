const mongoose = require("mongoose");

// Define the schema for your MongoDB collection
const toDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ToDoCategory" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = {
  ToDo,
};
