const asyncHandler = require("express-async-handler");
const Group = require("../models/Group");

// @route GET /api/group/all
// @desc Getting All Groups
// @access Private
const getAllGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find();

  res
    .status(200)
    .json({ message: "Successfuly Found all groups", data: groups });
});

// @route GET /api/group/:id
// @desc Getting Single Group
// @access Public
const getGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const group = await Group.findById(id);

  if (!group) {
    res.status(404);
    throw new Error("Group Not found");
  }

  res.status(200).json({ message: "Group Found", data: group });
});

// @route POST /api/group
// @desc Create Group
// @access Private
const postGroup = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (!name || members.length < 1) {
    res.status(400);
    throw new Error("Please provide enough informations !");
  }

  const newMembers = members.map((m) => ({ name: m }));

  const group = await Group.create({ name, members: newMembers });

  res.status(201).json({ message: "Group Created", data: group });
});

// @route PUT /api/group/:id
// @desc Update Group
// @access Private
const updateGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, members } = req.body;

  const group = await Group.findById(id);

  if (!group) {
    res.status(404);
    throw new Error("Group Not found");
  }

  if (!name || members.length < 1) {
    res.status(400);
    throw new Error("Please provide enough informations !");
  }

  const newMembers = members.map((m) => ({ name: m }));

  const newGroup = await Group.findByIdAndUpdate(
    id,
    { name, members: newMembers },
    { new: true }
  );

  res.status(200).json({ message: "Group Updated !", data: newGroup });
});

// @route DELETE /api/group/:id
// @desc Delete Group
// @access Private
const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const group = await Group.findById(id);

  if (!group) {
    res.status(404);
    throw new Error("Group Not found");
  }

  await Group.remove();
  res.status(200).json({ message: "Group deleted", data: id });
});

module.exports = {
  getAllGroups,
  getGroup,
  postGroup,
  updateGroup,
  deleteGroup,
};
