const express = require("express");
const debtController = require("../controllers/debt_controller");
const Debt = require("../models/Debt");
const verify = require("../verifyToken");
const app = express();

// List of all debts.
app.get("/debts", verify, debtController.getDebts);

// List of all debts lended by signed in user
app.get("/lended", verify, debtController.getLended);

// List of all debts owed by signed in user
app.get("/owed", verify, debtController.getOwed);

// Get details of a single debt.
app.get("/debts/:id", verify, debtController.getDebt);

// Get debts by between 2 users
app.get("/debts/:from/:to", verify, debtController.getDebtBwUsers);

// Get a list of transactions for smart settling
app.get("/peers", verify, debtController.getPeers);

// Get a list of transactions for smart settling
app.post("/debts/simplified", verify, debtController.getSimplifiedDebts);

// Add a new debt between two users.
app.post("/debts", verify, debtController.addDebt);

// Edit debt
app.put("/debts/edit/:id", verify, debtController.editDebt);

// Settle a debt between two users.
app.put("/debts/settle/:id", verify, debtController.settleDebt);

// Settle all debt between two users.
app.put("/debts/settleAll/:with", verify, debtController.settleAll);

// Delete a single debt.
app.delete("/debts/:id", verify, debtController.delDebt);

// Delete all debts between a lender and borrower.
app.delete("/debts/:from/:to", verify, debtController.delDebts);

// =================== TESTING =============================
app.delete("/debt/:to", async (req, res) => {
  try {
    const debt = await Debt.deleteMany({
      from: req.params.to,
    });
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = app;
