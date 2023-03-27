const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema({
  title: {
    type: String,
    max: [50],
  },
  lender: {
    type: String,
    max: [30],
    required: true,
  },
  borrower: {
    type: String,
    max: [30],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  settled: {
    type: Boolean,
    default: false,
  },
  creationDatetime: {
    type: Date,
    default: Date.now,
  },
  group: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Debt", DebtSchema);
