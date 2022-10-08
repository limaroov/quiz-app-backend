const express = require("express");

const router = express.Router();

const {
  getAllGroups,
  getGroup,
  postGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");

// /group  => Get ALl groups
router.get("/", getAllGroups);

// /group/:id  =>Get Single group
router.get("/:id", getGroup);

// /group  =>Create group
router.post("/", postGroup);

// /group/:id  =>Update  group
router.put("/:id", updateGroup);

// /group/:id  =>Delete  group
router.delete("/:id", deleteGroup);

module.exports = router;
