const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);
    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("Wrong Password");

    const { id, username } = user;
    const token = jwt.sign(
      { id, username },
      process.env.JWT_SECRET
      // , { expiresIn: "30d" }
    );

    // console.log(user.);
    // const { password, ...rest } = user;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    console.log(err, res);
    res.status(500).json(err);
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const data = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = new User(data);

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { login, signup, logout };
