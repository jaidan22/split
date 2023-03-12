const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema({
  from: {
    type: String,
    max: [30],
    required: true,
  },
  to: {
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
  group: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Debt", DebtSchema);
