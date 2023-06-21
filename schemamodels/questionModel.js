const mongoose = require("mongoose");

const questions = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    body: {
      type: "string",
      required: true,
    },
    user_id: {
      type: "string",
      required: true,
    },
    tags: {
      type: "string",
      required: true,
    },
    anwsers_count: {
      type: "number",
      required: true,
    },
    view_count: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("questions", questions);
