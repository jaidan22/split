const express = require("express");
const userController = require("../controllers/user_controller");
const verify = require("../verifyToken");
const app = express();

// Get all users
app.get("/users", verify, userController.getUsers);

// Get a single user
app.get("/user/:id", verify, userController.getUser);

// Edit user
app.put("/user/:id", verify, userController.updateUser);

// Delete a user
app.delete("/user/:id", verify, userController.dltUser);

// Delete all users
app.delete("/users", verify, userController.dltAllUsers);

module.exports = app;
