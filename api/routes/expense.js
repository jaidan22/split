const express = require("express");
const expenseController = require("../controllers/expense_controller");
const verify = require("../verifyToken");
const router = express.Router();

// List of all expenses.
router.get("/expenses", verify, expenseController.getExpenses);

// Get details of a single expense.
router.get("/expenses/:id", verify, expenseController.getExpense);

// Get a list of all optimised debts.
// router.get("/optimisedDebts", expenseController.getOptimisedDebts);

// Get debts by between 2 users
// router.get("/debts/:from/:to", expenseController.getDebtBetweenUsers);

// Add a new expense
router.post("/expense", verify, expenseController.addExpense);

// Settle a expense
router.put("/expense/settle/:id", verify, expenseController.settleExpense);

// Edit a expense
router.put("/expense/edit/:id", verify, expenseController.editExpense);

// Delete a single expense.
router.delete("/expense/:id", verify, expenseController.delExpense);

// Delete all expense between a lender and borrower.
// router.delete("/expense/:from/:to", expenseController.delExpense);

module.exports = router;
