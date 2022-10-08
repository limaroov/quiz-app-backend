const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    },
  ],
});

module.exports = mongoose.model("Theme", ThemeSchema);
