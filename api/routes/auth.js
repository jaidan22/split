const express = require("express");
const authController = require("../controllers/auth_controller");
const app = express();

// Login
app.post("/login", authController.login);

// Logout
app.post("/logout", authController.logout);

// Sign Up
app.post("/signup", authController.signup);

module.exports = app;
