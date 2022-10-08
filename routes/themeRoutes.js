const express = require("express");

const router = express.Router();

const {
  getAllThemes,
  getTheme,
  postTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/themeController");

// /theme  => Get ALl themes
router.get("/all", getAllThemes);

// /theme/:id  =>Get Single theme
router.get("/:id", getTheme);

// /theme  =>Create theme
router.post("/", postTheme);

// /theme/:id  =>Update  theme
router.put("/:id", updateTheme);

// /theme/:id  =>Delete  theme
router.delete("/:id", deleteTheme);

module.exports = router;
