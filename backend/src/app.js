import express from "express";
import helmet from "helmet";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

// default root
app.get("/", (req, res) =>
  res.json({ ok: true, message: "API up. Visit /api/health" })
);

// error handler (should be last)
app.use(errorHandler);

export default app;
