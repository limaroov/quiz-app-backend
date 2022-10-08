const asyncHandler = require("express-async-handler");

const Question = require("../models/Question");
const Theme = require("../models/Theme");

// @route GET /api/question/all
// @desc Getting All Questions
// @access Private
const getAllQuestions = asyncHandler(async (req, res) => {
  const { theme } = req.query;

  if (!theme) {
    res.status(400);
    throw new Error("Please provide enough informations !");
  }

  const existingTheme = await Theme.findOne({ name: theme.toLowerCase() });

  if (!existingTheme) {
    res.status(400);
    throw new Error("No Theme found with that name !");
  }

  const questions = await Question.find({ theme: existingTheme._id });

  res.status(200).json({ message: "All Questions Found !", data: questions });
});

// @route GET /api/question/:id
// @desc Getting Single Question
// @access Public
const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    res.status(400);
    throw new Error("No Question found with that Id !");
  }

  res.status(200).json({ message: "Found Question !", data: question });
});

// @route POST /api/question
// @desc Create Question
// @access Private
const postQuestion = asyncHandler(async (req, res) => {
  const { question, theme, answer, options } = req.body;

  if (!question || !theme || !answer || options.length < 4) {
    res.status(400);
    throw new Error("Please Provide enough informations !");
  }

  const questionTheme = await Theme.findOne({ name: theme.toLowerCase() });

  const newQuestion = await Question.create({
    question,
    theme: questionTheme,
  });

  res.status(201).json({ message: "Question created !", data: newQuestion });
});

// @route PUT /api/question/:id
// @desc Update Question
// @access Private
const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, theme, answer, options } = req.body;

  const exisitingQuestion = await Question.findById(id);

  if (!exisitingQuestion) {
    res.status(404);
    throw new Error("The Question doesn't exisit !");
  }

  const updatedQuestion = await Question.findByIdAndUpdate(id, {
    question,
    theme,
    answer,
    options,
  });

  res.status(200).json({ message: "Question Updated", data: updatedQuestion });
});

// @route DELETE /api/question/:id
// @desc Delete Question
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exisitingQuestion = await Question.findById(id);

  if (!exisitingQuestion) {
    res.status(404);
    throw new Error("The Question doesn't exisit !");
  }

  await exisitingQuestion.remove();
  res.status(200).json({ message: " Question removed ", data: id });
});

module.exports = {
  getAllQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,
};
