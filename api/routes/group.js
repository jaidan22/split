const express = require("express");
const groupController = require("../controllers/group_controller");
const verify = require("../verifyToken");
const app = express();

// Create group
app.post("/group", verify, groupController.createGrp);

// List all groups
app.get("/groups", verify, groupController.getGroups);

// Get a particular group
app.get("/group/:id", verify, groupController.getGroup);

// Get all expenses in a group
app.get("/group/expenses/:id", verify, groupController.getExpenses);

// Add user to group
app.put("/group/addUser", verify, groupController.addMem);

// Delete user from group
app.put("/group/dltUser", verify, groupController.dltMem);

// Delete group
app.delete("/group/:id", verify, groupController.dltGrp);

module.exports = app;
