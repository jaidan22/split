const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    users: [
      {
        type: String,
        required: true,
      },
    ],
    admin: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
