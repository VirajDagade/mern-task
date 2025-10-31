import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getStoreRatings,
  getStoreAverage,
} from "../controllers/ownerController.js";

const router = express.Router();

router.use(protect);

router.get("/:storeId/ratings", getStoreRatings);
router.get("/:storeId/average", getStoreAverage);

export default router;
