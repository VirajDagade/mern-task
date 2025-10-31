import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.put("/password", protect, updatePassword);

export default router;
