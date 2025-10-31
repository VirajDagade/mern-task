import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  // check existing
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const user = await User.create({ name, email, password, address, role });
  const token = generateToken(user);

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
