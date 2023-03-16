const express = require("express");
const groupController = require("../controllers/group_controller");
const verify = require("../verifyToken");
const router = express.Router();

// Create group
router.post("/group", verify, groupController.createGrp);

// List groups of signed in user
router.get("/groups", verify, groupController.getGroups);

// Get a particular group
router.get("/group/:id", verify, groupController.getGroup);

// Get all expenses in a group
router.get("/group/expenses/:id", verify, groupController.getExpenses);

// Add users to group
router.put("/group/addUsers", verify, groupController.addMem);

// Delete users from group
router.put("/group/dltUsers", verify, groupController.dltMem);

// Delete group
router.delete("/group/:id", verify, groupController.dltGrp);

module.exports = router;
