import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";
import User from "../models/userModel.js";

// @desc    Get lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });
  res.status(200).json(lists);
});

// @desc    Set lists
// @route   POST /api/lists
// @access  Private
const setList = asyncHandler(async (req, res) => {
  if (!req.body.listName) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const list = await List.create({
    user: req.user.id,
    listName: req.body.listName,
  });
  res.status(200).json(list);
});

// @desc    Update lists
// @route   PUT /api/lists
// @access  Private
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns list
  if (list.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedList = await List.findByIdAndUpdate(
    req.params.id,
    { listName: req.body.listName },
    {
      new: true,
    }
  );

  res.status(200).json(updatedList);
});

// @desc    Delete lists
// @route   DELETE /api/lists
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns list
  if (list.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await list.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getLists, setList, updateList, deleteList };
