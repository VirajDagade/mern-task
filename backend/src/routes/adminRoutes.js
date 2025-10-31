import express from "express";
import {
  addUser,
  addStore,
  getUsers,
  getStores,
  getDashboard,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/users", addUser);
router.post("/stores", addStore);
router.get("/users", getUsers);
router.get("/stores", getStores);
router.get("/dashboard", getDashboard);

export default router;
