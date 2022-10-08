const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const Quiz = require("../models/Quiz");

// @route GET /api/quiz/all
// @desc Getting All Quizes
// @access Private
const getAllQuizes = asyncHandler(async (req, res) => {
  const quizes = await Quiz.find();
  res
    .status(200)
    .json({ message: "Successfuly Found All Quizes", data: quizes });
});

// @route GET /api/quiz/:id
// @desc Getting Single Quiz
// @access Public
const getQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const quiz = await Quiz.findById(id).populate("themes");

  // if there is No Quiz
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz Not found");
  }

  res.status(200).json({ message: "QUiz Found", data: quiz });
});

// @route POST /api/quiz
// @desc Create Quiz
// @access Private
const postQuiz = asyncHandler(async (req, res) => {
  const { name, themes } = req.body;

  if (!name || themes.length < 1) {
    res.status(400);
    throw new Error("Please Provide more informations !");
  }

  const quizCode = slugify(name);

  const quizThemes = thems.map((t) => {
    return { theme: t };
  });

  const newQuiz = await Quiz.create({
    name: name,
    themes: quizThemes,
    code: quizCode,
  });

  res.status(201).json({ message: " Theme Created", data: newQuiz });
});

// @route PUT /api/quiz/:id
// @desc Update Quiz
// @access Private
const updateQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, themes, code } = req.body;

  const quiz = await Quiz.findById(id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz Not Found");
  }

  if (!code || !name || themes.length < 1) {
    res.status(400);
    throw new Error("Please Provide more informations !");
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    id,
    { name, themes, code },
    { new: true }
  );

  res.status(200).json({ message: "Quiz Updated", data: updatedQuiz });
});

// @route DELETE /api/quiz/:id
// @desc Delete Quiz
// @access Private
const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quiz = await Quiz.findById(id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz Not Found");
  }

  await quiz.remove();

  res.status(200).json({ message: "Quiz Deleted", data: id });
});

module.exports = {
  getAllQuizes,
  getQuiz,
  postQuiz,
  updateQuiz,
  deleteQuiz,
};
