import express, { Router } from "express";
const router = express.Router();
import {
  getLists,
  setList,
  updateList,
  deleteList,
} from "../controllers/listController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getLists).post(protect, setList);
router.route("/:id").put(protect, updateList).delete(protect, deleteList);

export default router;
