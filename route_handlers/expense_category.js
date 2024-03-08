const { Expense } = require("../database/expense");
const { ExpenseCategory } = require("../database/expense_category");

// Create Expense Category
const createExpenseCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;
    const newExpenseCategory = new ExpenseCategory({ name, userId });
    await newExpenseCategory.save();
    res.status(201).json(newExpenseCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All Expense Categories
const getAllExpenseCategories = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const expenseCategories = await ExpenseCategory.find({ userId: userId });
    res.status(201).json(expenseCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense Category
const updateExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(201).json(updatedExpenseCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Expense Category
const deleteExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await Expense.find({ categoryId: id });
    if (expenses.length !== 0) {
      res.status(400).json({
        message:
          "category can not be deleted, items attached with this category",
      });
      return;
    }
    await ExpenseCategory.findByIdAndDelete(id);
    res.status(201).json({ message: "Expense category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createExpenseCategory,
  getAllExpenseCategories,
  updateExpenseCategory,
  deleteExpenseCategory,
};
