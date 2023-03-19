const User = require("../models/User");
const Debt = require("../models/Debt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const previous = async (req, res) => {
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
    const users = await User.find(
      {
        username: { $in: [...bIds, ...lIds] },
      },
      { username: 1, name: 1 }
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.findOne(
      { username: req.params.username },
      { password: 0 }
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = (req, res) => {};

const dltUser = (req, res) => {};

const dltAllUsers = (req, res) => {};

module.exports = {
  getUser,
  previous,
  getUsers,
  updateUser,
  dltUser,
  dltAllUsers,
};
