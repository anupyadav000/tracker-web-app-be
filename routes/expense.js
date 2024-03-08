const express = require("express");
const {
  createExpenseCategory,
  getAllExpenseCategories,
  updateExpenseCategory,
  deleteExpenseCategory,
} = require("../route_handlers/expense_category");
const {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} = require("../route_handlers/expense");
const authenticateUser = require("../authentication/middleware");
const expenseRouter = express.Router();

expenseRouter.use(authenticateUser);

expenseRouter.post("/category", createExpenseCategory);
expenseRouter.get("/category", getAllExpenseCategories);
expenseRouter.patch("/category/:id", updateExpenseCategory);
expenseRouter.delete("/category/:id", deleteExpenseCategory);

expenseRouter.post("/", createExpense);
expenseRouter.get("/", getAllExpenses);
expenseRouter.patch("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

module.exports = expenseRouter;
