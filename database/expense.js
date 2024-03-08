const mongoose = require("mongoose");

// Define the schema for your MongoDB collection
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  amount: { type: Number },
  isExpense: { type: Boolean, default: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseCategory" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {
  Expense,
};
