const Debt = require("../models/Debt");

const getDebt = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id });
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find();
    res.status(200).send(debts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getDebtBwUsers = async (req, res) => {
  try {
    const from = req.params.from;
    const to = req.params.to;

    if (from != req.user.username) {
      res.status(503).send("not allowed");
      return;
    }

    const debts = await Debt.find({ from, to });
    res.status(200).send(debts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getLended = async (req, res) => {
  try {
    const debts = await Debt.find({
      $and: [{ from: req.user.username }, { settled: false }],
    });
    res.status(200).send(debts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOwed = async (req, res) => {
  try {
    const to = req.user.username;
    const debts = await Debt.find({ $and: [{ to }, { settled: false }] });
    res.status(200).send(debts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addDebt = async (req, res) => {
  try {
    const newDebt = new Debt({
      from: req.user.username,
      to: req.body.to,
      amount: req.body.amount,
      group: req.body.group,
    });

    const debt = await newDebt.save();

    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

const editDebt = async (req, res) => {
  try {
    const debt = await Debt.updateOne(
      { _id: req.params.id },
      {
        $set: {
          from: req.user.username,
          to: req.body.to,
          amount: req.body.amount,
          group: req.body.group,
        },
      }
    );
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

const settleDebt = async (req, res) => {
  try {
    const debt = await Debt.updateOne(
      { $and: [{ to: req.user.username }, { _id: req.params.id }] },
      {
        $set: { settled: true },
      }
    );
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

const settleAll = async (req, res) => {
  try {
    const debt = await Debt.updateMany(
      { $and: [{ to: req.params.with }, { from: req.user.username }] },
      {
        $set: { settled: true },
      }
    );
    res.status(200).send(debt);
  } catch (err) {
    res.status(503).send(err);
  }
};

const delDebt = async (req, res) => {
  try {
    const debt = await Debt.deleteOne({ _id: req.params.id });
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

const delDebts = async (req, res) => {
  try {
    const debt = await Debt.deleteMany({
      from: req.params.from,
      to: req.params.to,
    });
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getDebt,
  getDebts,
  getDebtBwUsers,
  getOwed,
  getLended,
  addDebt,
  settleDebt,
  delDebt,
  delDebts,
  editDebt,
  settleAll,
};
