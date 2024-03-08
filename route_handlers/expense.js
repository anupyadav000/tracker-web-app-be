const { Expense } = require("../database/expense");
const { ExpenseCategory } = require("../database/expense_category");
const { User } = require("../database/user");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const { title, description, categoryId, amount, isExpense } = req.body;

    if (title.length === 0 || categoryId === undefined || amount <= 0) {
      return res
        .status(400)
        .json({ message: "please provide valid input details" });
    }

    // Check if categoryId exists in the database
    const category = await ExpenseCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { id: userId } = req.user;

    const newExpense = new Expense({
      title,
      description,
      categoryId,
      userId,
      isExpense,
      amount,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All Expenses
const getAllExpenses = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const expenses = await Expense.find({ userId: userId });
    res.status(201).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, amount, isExpense } = req.body;

    // Check if categoryId exists in the database
    const category = await ExpenseCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { id: userId } = req.user;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, description, categoryId, userId, amount, isExpense },
      { new: true }
    );
    res.status(201).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(201).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
