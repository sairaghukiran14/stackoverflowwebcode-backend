const mongoose = require("mongoose");

const comments = new mongoose.Schema(
  {
    body: {
      type: "string",
      required: true,
    },
    user_id: {
      type: "string",
      required: true,
    },
    question_id: {
      type: "string",
      required: true,
    },
    anwser_id: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", comments);
