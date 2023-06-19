const mongoose = require("mongoose");

const votes = new mongoose.Schema(
  {
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
    value: {
      type: "string",
      required: true,
      // +1 for Upvote and -1 for downVote
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("votes", votes);
