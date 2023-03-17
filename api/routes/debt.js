const express = require("express");
const debtController = require("../controllers/debt_controller");
const Debt = require("../models/Debt");
const verify = require("../verifyToken");
const router = express.Router();

// List of all debts.
router.get("/debts", verify, debtController.getDebts);

// List of all debts lended by signed in user
router.get("/lended", verify, debtController.getLended);

// List of all debts owed by signed in user
router.get("/owed", verify, debtController.getOwed);

// Get details of a single debt.
router.get("/debts/:id", verify, debtController.getDebt);

// Get debts by between 2 users
router.get("/debts/bw/:with", verify, debtController.getDebtBwUsers);

// Get a list of peers,debts and netdebts for smart settling
router.get("/peers", verify, debtController.getPeers);

// Get a list of transactions for smart settling
router.post("/debts/simplified", verify, debtController.getSimplifiedDebts);

// settling
router.post(
  "/debts/simplified/settle",
  verify,
  debtController.settleSimplifiedDebts
);

// Add a new debt between two users.
router.post("/debts", verify, debtController.addDebt);

// Edit debt
router.put("/debts/edit/:id", verify, debtController.editDebt);

// Settle a debt between two users.
router.put("/debts/settle/:id", verify, debtController.settleDebt);

// Settle all debt between two users.
router.put("/debts/settleAll/:with", verify, debtController.settleAll);

// Delete a single debt.
router.delete("/debts/:id", verify, debtController.delDebt);

// Delete all debts between a lender and borrower.
router.delete("/debts/:from/:to", verify, debtController.delDebts);


module.exports = router;
