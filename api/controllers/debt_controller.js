const Debt = require("../models/Debt");
const Group = require("../models/Group");
const User = require("../models/User");

// GET DETAILS OF A SINGLE DEBT
const getDebt = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id });
    res.status(200).send(debt);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET LIST OF ALL DEBTS
const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find();
    res.status(200).send(debts);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET LIST OF ALL DEBTS B/W 2 USERS
const getDebtBwUsers = async (req, res) => {
  try {
    const debts = await Debt.find({
      lender: { $in: [req.user.username, req.params.with] },
      borrower: { $in: [req.user.username, req.params.with] },
    }).sort({ creationDate: 1 });
    res.status(200).send(debts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// GET LIST OF PEERS, TRANSACTIONS AND NET DEBT
const getPeers = async (req, res) => {
  try {
    const borrowers = await Debt.find(
      { lender: req.user.username },
      { borrower: 1 }
    );
    const bIds = borrowers.map((b) => b.borrower);

    const lenders = await Debt.find(
      { borrower: req.user.username },
      { lender: 1 }
    );
    const lIds = lenders.map((l) => l.lender);

    const grpmems = await Group.find(
      { users: { $in: [req.user.username] } },
      { users: 1 }
    );
    const gIds = [
      ...new Set(
        grpmems.map((g) => g.users).reduce((acc, curr) => acc.concat(curr), [])
      ),
    ];

    // USERNAME OF PEERS
    const peers = [...new Set([...lIds, ...bIds, ...gIds])];

    // TRANSACTIONS BETWEEN PEERS
    const debtsBwPeers = await Debt.find(
      {
        $and: [
          { borrower: { $in: peers } },
          { lender: { $in: peers } },
          { settled: false },
        ],
      },
      { lender: 1, borrower: 1, amount: 1 }
    );

    // GET NET DEBT
    const netDebt = peers.map((p) => {
      let net = 0;
      for (let x in debtsBwPeers) {
        if (debtsBwPeers[x].lender == p) net -= debtsBwPeers[x].amount;
        else if (debtsBwPeers[x].borrower == p) net += debtsBwPeers[x].amount;
      }
      return { name: p, netDebt: net };
    });
    netDebt.sort((a, b) => a.netDebt - b.netDebt).reverse();

    res.status(200).send({ peers, debtsBwPeers, netDebt });
  } catch (err) {
    res.status(503).send(err);
    console.log(err);
  }
};

// VIEW SIMPLIFIED DEBTS
const getSimplifiedDebts = async (req, res) => {
  try {
    const netDebt = req.body.netDebt;
    netDebt.sort((a, b) => a.netDebt - b.netDebt).reverse();

    const transactions = [];
    const l = netDebt.length;

    // LOGIC FOR SIMPLIFIED SETTLING
        // 1. Sort users according to their net Debt (-ve debt => to recieve)
        // 2. if first or last index of netDebt is 0, return netDebt (since sum of net debt of peers will be zero)
        // 3. Add new record to transaction object
        // 3. Add the highest +ve value to the highest -ve value
        // 5. Goto 1
    
    for (; netDebt[0].netDebt != 0 && netDebt[l - 1].netDebt != 0; ) {
      transactions.push({
        from: netDebt[0].name,
        to: netDebt[l - 1].name,
        amount: netDebt[0].netDebt,
      });
      netDebt[l - 1].netDebt += netDebt[0].netDebt;
      netDebt[0].netDebt = 0;
      netDebt.sort((a, b) => a.netDebt - b.netDebt).reverse();
    }

    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

// SETTLE SIMPLIFIED DEBTS
const settleSimplifiedDebts = async (req, res) => {
  try {
    const debtsBwPeers = req.body.debtsBwPeers;
    const ids = debtsBwPeers.map((debt) => debt._id);
    console.log(ids);

    const settled = await Debt.updateMany(
      {
        _id: { $in: ids },
      },
      { settled: true }
    );

    res.status(200).send(settled);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

const getLended = async (req, res) => {
  try {
    const debts = await Debt.find({
      $and: [{ lender: req.user.username }, { settled: false }],
    });
    let total = 0;
    debts.map((d) => {
      total += d.amount;
    });
    res.status(200).send({ debts, total });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOwed = async (req, res) => {
  try {
    const borrower = req.user.username;
    const debts = await Debt.find({ $and: [{ borrower }, { settled: false }] });
    let total = 0;
    debts.map((d) => {
      total += d.amount;
    });
    res.status(200).send({ debts, total });
  } catch (err) {
    res.status(500).send(err);
  }
};

const addDebt = async (req, res) => {
  try {
    const newDebt = new Debt({
      lender: req.user.username,
      borrower: req.body.borrower,
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
          lender: req.user.username,
          borrower: req.body.borrower,
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
      { $and: [{ lender: req.user.username }, { _id: req.params.id }] },
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
      { $and: [{ borrower: req.params.with }, { lender: req.user.username }] },
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
      lender: req.params.lender,
      borrower: req.params.borrower,
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
  getPeers,
  getSimplifiedDebts,
  settleSimplifiedDebts,
  getOwed,
  getLended,
  addDebt,
  settleDebt,
  delDebt,
  delDebts,
  editDebt,
  settleAll,
};
