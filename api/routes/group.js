const express = require("express");
const groupController = require("../controllers/group_controller");
const verify = require("../verifyToken");
const router = express.Router();

// Create group
router.post("/group", verify, groupController.createGrp);

// List all groups
router.get("/groups", verify, groupController.getGroups);

// Get a particular group
router.get("/group/:id", verify, groupController.getGroup);

// Get all expenses in a group
router.get("/group/expenses/:id", verify, groupController.getExpenses);

// Add user to group
router.put("/group/addUser", verify, groupController.addMem);

// Delete user from group
router.put("/group/dltUser", verify, groupController.dltMem);

// Delete group
router.delete("/group/:id", verify, groupController.dltGrp);

module.exports = router;
