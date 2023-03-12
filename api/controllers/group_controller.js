const Expense = require("../models/Expense");
const Group = require("../models/Group");

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getGroup = async (req, res) => {
  try {
    const groups = await Group.find({ _id: req.params.id });
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getExpenses = async (req, res) => {
  try {
    const groups = await Expense.find({ group: req.params.id });
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addMem = async (req, res) => {
  try {
    const group = await Group.updateOne(
      { _id: req.body.id },
      { $push: { users: req.body.user } }
    );
    res.status(200).send(group);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const dltMem = async (req, res) => {
  try {
    const group = await Group.updateOne(
      { _id: req.body.id },
      { $pull: { users: req.body.user } }
    );
    res.status(200).send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createGrp = async (req, res) => {
  try {
    const newGroups = new Group({
      groupName: req.body.groupName,
      users: req.body.users,
      admin: req.user.username,
    });
    const group = await newGroups.save();
    res.status(200).send(group);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const dltGrp = async (req, res) => {
  try {
    const groups = await Group.deleteOne({ _id: req.params.id });
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getGroups,
  getGroup,
  getExpenses,
  addMem,
  dltMem,
  createGrp,
  dltGrp,
};
