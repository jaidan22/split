const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [50],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  creationDatetime: {
    type: Date,
    default: Date.now,
  },
  lender: {
    type: String,
    required: true,
  },
  borrowers: [
    {
      type: [String, Number],
      required: true,
    },
  ],
  amount: {
    type: Number,
    required: true,
    min: [0],
    max: [1000000],
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
