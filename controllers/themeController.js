const asyncHandler = require("express-async-handler");

const Theme = require("../models/Theme");

// @route GET /api/theme/all
// @desc Getting All Themes
// @access Private
const getAllThemes = asyncHandler(async (req, res) => {
  const themes = await Theme.find();

  res
    .status(200)
    .json({ message: "Successfuly found all themes ", data: themes });
});

// @route GET /api/theme/:id
// @desc Getting Single Theme
// @access Public
const getTheme = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const theme = await Theme.findById(id);

  if (!theme) {
    res.status(404);
    throw new Error("Theme not found");
  }

  res.status(200).json({ message: "Theme Found !", data: theme });
});

// @route POST /api/theme
// @desc Create Theme
// @access Private
const postTheme = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide enough informations !");
  }

  const theme = await Theme.create({ name });

  res.send(201).json({ message: "Theme Created Successfuly !", data: theme });
});

// @route PUT /api/theme/:id
// @desc Update Theme
// @access Private
const updateTheme = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const theme = await Theme.findById(id);

  if (!theme) {
    res.status(404);
    throw new Error("Theme not found");
  }

  if (!name) {
    res.status(404);
    throw new Error("Theme Not Found");
  }

  const updatedTheme = await Theme.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  res.status(200).json({ message: "Theme updated !", data: updatedTheme });
});

// @route DELETE /api/theme/:id
// @desc Delete Theme
// @access Private
const deleteTheme = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const theme = await Theme.findById(id);

  if (!theme) {
    res.status(404);
    throw new Error("Theme Not Found");
  }

  await theme.remove();
  res.status(200).json({ message: " Theme removed ", data: id });
});

module.exports = {
  getAllThemes,
  getTheme,
  postTheme,
  updateTheme,
  deleteTheme,
};
