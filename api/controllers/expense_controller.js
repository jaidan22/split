const Debt = require("../models/Debt");
const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).send(expenses);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id });
    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addExpense = async (req, res) => {
  try {
    let borrowers = req.body.borrowers;

    // to add Debt records while adding or editing expense
    borrowers = await Promise.all(
      borrowers.map(async (b) => {
        if (req.user.username != b[0]) {
          const newDebt = new Debt({
            lender: req.user.username,
            title: req.body.title,
            borrower: b[0],
            amount: b[1],
            group: req.body.group,
          });

          const debt = await newDebt.save();
          return [...b, debt._id.toString()];
        }
        return b;
      })
    );

    const newExpense = new Expense({
      title: req.body.title,
      lender: req.user.username,
      borrowers: borrowers,
      amount: req.body.amount,
      group: req.body.group,
    });

    const expense = await newExpense.save();

    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

const settleExpense = async (req, res) => {
  try {
    const expense = await Expense.updateOne(
      { $and: [{ lender: req.user.username }, { _id: req.params.id }] },
      {
        $set: { settled: true },
      }
    );
    let borrowers = await Expense.findOne(
      { _id: req.params.id },
      { borrowers: 1 }
    );
    if (borrowers) {
      borrowers.borrowers.map(async (b) => {
        if (b[2]) {
          await Debt.updateOne(
            { _id: b[2] },
            {
              $set: { settled: true },
            }
          );
        }
      });
    }
    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

const editExpense = async (req, res) => {
  try {
    const expense = await Expense.updateOne(
      { $and: [{ lender: req.user.username }, { _id: req.params.id }] },
      {
        $set: {
          title: req.body.title,
          borrowers: req.body.borrowers,
          amount: req.body.amount,
        },
      }
    );

    if (req.body.borrowers) {
      req.body.borrowers.map(async (b) => {
        if (b[2]) {
          await Debt.updateOne(
            { _id: b[2] },
            {
              $set: { amount: b[1], group: req.body.group },
            }
          );
        }
      });
    }

    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

const delExpense = async (req, res) => {
  try {
    const borrowers = await Expense.findOne(
      { _id: req.params.id },
      { borrowers: 1 }
    );

    if (borrowers) {
      borrowers.borrowers.map(async (b) => {
        if (b[2]) {
          await Debt.deleteOne({ _id: b[2] });
        }
      });
    }

    const expense = await Expense.deleteOne({ _id: req.params.id });
    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getExpenses,
  getExpense,
  addExpense,
  settleExpense,
  editExpense,
  delExpense,
};
