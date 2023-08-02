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
  // Check film ID in TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${req.body.film}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + process.env.TMDB_TOKEN,
      },
    }
  );
  if (response.status !== 200) {
    res.status(400);
    throw new Error("Film ID not found in TMDB API");
  }

  if (!req.body.watched && !req.body.rating && !req.body.comments) {
    res.status(400);
    throw new Error(
      "Please indicate some interaction: watched, rating, or comments"
    );
  }

  // Check if interaction with film already exits for user
  const oldInteraction = await Interaction.findOne({
    film: req.body.film,
  }).exec();
  if (oldInteraction) {
    res.status(400);
    throw new Error("Interaction with Film already exists");
  }

  const interaction = await Interaction.create({
    user: req.user.id,
    film: req.body.film,
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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns interaction
  if (interaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Check for same film id
  if (interaction.film.toString() !== req.body.film) {
    res.status(400);
    throw new Error("Old and new interactions' film IDs do not match");
  }

  const updatedInteraction = await Interaction.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
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

  if (!interaction) {
    res.status(400);
    throw new Error("Interaction not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user owns interaction
  if (interaction.user.toString() !== req.user.id) {
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
