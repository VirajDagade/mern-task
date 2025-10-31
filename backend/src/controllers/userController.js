import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// ────────────── Update password ──────────────
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch)
    return res.status(400).json({ error: "Current password incorrect" });

  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated successfully" });
};
