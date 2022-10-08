const express = require("express");

const router = express.Router();

const {
  getAllQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// /question  => Get ALl questions
router.get("/all", getAllQuestions);

// /question/:id  =>Get Single question
router.get("/:id", getQuestion);

// /question  =>Create question
router.post("/", postQuestion);

// /question/:id  =>Update  question
router.put("/:id", updateQuestion);

// /question/:id  =>Delete  question
router.delete("/:id", deleteQuestion);

module.exports = router;
