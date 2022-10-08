const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  themes: [
    {
      theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
      },
    },
  ],
  winner: { type: mongoose.Schema.Types.ObjectId },
  lowestScore: Number,
  highestScore: Number,
  code: { type: String, required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
