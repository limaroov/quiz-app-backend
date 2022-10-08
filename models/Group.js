const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  wins: [
    {
      quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
