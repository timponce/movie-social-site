import asyncHandler from "express-async-handler";
import Interaction from "../models/interactionModel.js";
import User from "../models/userModel.js";

// @desc    Get user interactions
// @route   GET /api/interactions
// @access  Private
const getInteractions = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({ user: req.user.id });
  res.status(200).json(interactions);
});

// @desc    Creat new interaction
// @route   POST /api/interactions
// @access  Private
const setInteraction = asyncHandler(async (req, res) => {
  if (!req.body.watched && !req.body.rating && !req.body.comments) {
    res.status(400);
    throw new Error(
      "Please indicate some interaction: watched, rating, or comments"
    );
  }
  const interaction = await Interaction.create({
    user: req.user.id,
    // film: req.film.id,
    watched: req.body.watched,
    rating: req.body.rating,
    comments: req.body.comments,
  });
  res.status(200).json(interaction);
});

// @desc    Update interaction
// @route   PUT /api/interactions
// @access  Private
const updateInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  // Check for interaction
  if (!interaction) {
    res.status(400);
    throw new Error("Interaction not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns interaction
  if (interaction.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedInteraction = await Interaction.findByIdAndUpdate(
    req.params.id,
    {
      watched: req.body.watched,
      rating: req.body.rating,
      comments: req.body.comments,
    },
    { new: true }
  );

  res.status(200).json(updatedInteraction);
});

// @desc    Delete interaction
// @route   DELETE /api/interactions
// @access  Private
const deleteInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("Interaction not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns interaction
  if (interaction.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await interaction.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export {
  getInteractions,
  setInteraction,
  updateInteraction,
  deleteInteraction,
};
