const express = require("express");
const userController = require("../controllers/user_controller");
const verify = require("../verifyToken");
const router = express.Router();

// Get all users
router.get("/users", verify, userController.getUsers);

// Get users to which signed in user has done transactions
router.get("/previous", verify, userController.previous);

// Get a single user
router.get("/user/:username", verify, userController.getUser);

// Edit user
router.put("/user/:id", verify, userController.updateUser);

// Delete a user
router.delete("/user/:id", verify, userController.dltUser);

// Delete all users
router.delete("/users", verify, userController.dltAllUsers);

module.exports = router;
