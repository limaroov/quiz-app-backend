const express = require("express");

const router = express.Router();

const {
  getAllQuizes,
  getQuiz,
  postQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// /quiz  => Get ALl quizes
router.get("/all", getAllQuizes);

// /quiz/:id  =>Get Single quiz
router.get("/:id", getQuiz);

// /quiz  =>Create Quiz
router.post("/", postQuiz);

// /quiz/:id  =>Update  quiz
router.put("/:id", updateQuiz);

// /quiz/:id  =>Delete  quiz
router.delete("/:id", deleteQuiz);

module.exports = router;
