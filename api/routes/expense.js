const express = require("express");
const expenseController = require("../controllers/expense_controller");
const verify = require("../verifyToken");
const app = express();

// List of all expenses.
app.get("/expenses", verify, expenseController.getExpenses);

// Get details of a single expense.
app.get("/expenses/:id", verify, expenseController.getExpense);

// Get a list of all optimised debts.
// app.get("/optimisedDebts", expenseController.getOptimisedDebts);

// Get debts by between 2 users
// app.get("/debts/:from/:to", expenseController.getDebtBetweenUsers);

// Add a new expense 
app.post("/expense", verify, expenseController.addExpense);

// Settle a expense 
app.put("/expense/settle/:id", verify, expenseController.settleExpense);

// Edit a expense 
app.put("/expense/edit/:id", verify, expenseController.editExpense);

// Delete a single expense.
app.delete("/expense/:id", verify, expenseController.delExpense);

// Delete all expense between a lender and borrower.
// app.delete("/expense/:from/:to", expenseController.delExpense);

module.exports = app;
