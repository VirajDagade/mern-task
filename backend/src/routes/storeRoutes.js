import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getStores,
  getStoreById,
  rateStore,
} from "../controllers/storeController.js";

const router = express.Router();

router.get("/", getStores);
router.get("/:id", protect, getStoreById); // optional: allow logged-in users only
router.post("/:id/rate", protect, rateStore);

export default router;
