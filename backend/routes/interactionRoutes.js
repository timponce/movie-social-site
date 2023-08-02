import express, { Router } from "express";
const router = express.Router();
import {
  getInteractions,
  setInteraction,
  updateInteraction,
  deleteInteraction,
} from "../controllers/interactionController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getInteractions).post(protect, setInteraction);
router
  .route("/:id")
  .put(protect, updateInteraction)
  .delete(protect, deleteInteraction);

export default router;
