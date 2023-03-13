const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({},{password:0});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.findOne({ username: req.params.username },{password:0});
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
  getUsers,
  updateUser,
  dltUser,
  dltAllUsers,
};
