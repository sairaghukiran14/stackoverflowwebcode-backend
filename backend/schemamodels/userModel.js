const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    fullname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
