const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [50],
  },
  creationDatetime: {
    type: Date,
    default: Date.now,
  },
  lender: {
    type: String,
    required: true,
  },
  borrowers: {
    type: Array,
    default: [],
  },
  amount: {
    type: Number,
    required: true,
    min: [0],
    max: [1000000],
  },
  settled: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
