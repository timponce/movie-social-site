import express, { Router } from "express";
const router = express.Router();
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/filmController.js";

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

export default router;
