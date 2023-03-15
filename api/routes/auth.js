const express = require("express");
const authController = require("../controllers/auth_controller");
const router = express.Router();

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

// Sign Up
router.post("/signup", authController.signup);

module.exports = router;
