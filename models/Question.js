const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  theme: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: { type: String, required: true },
  options: [{ option: String }],
});

module.exports = mongoose.model("Question", QuestionSchema);
