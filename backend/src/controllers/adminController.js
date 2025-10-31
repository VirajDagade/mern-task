import User from "../models/userModel.js";
import Store from "../models/storeModel.js";
import Rating from "../models/ratingModel.js";

// ────────────────────────────────
// 1️⃣  Add new user
export const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const user = await User.create({ name, email, password, address, role });
  res.status(201).json({ message: "User created", user });
};

// ────────────────────────────────
// 2️⃣  Add new store
export const addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  const store = await Store.create({
    name,
    email,
    address,
    owner: ownerId || null,
  });

  res.status(201).json({ message: "Store created", store });
};

// ────────────────────────────────
// 3️⃣  Get list of users (filters + pagination + sorting)
export const getUsers = async (req, res) => {
  const {
    name,
    email,
    role,
    sort = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (email) filter.email = new RegExp(email, "i");
  if (role) filter.role = role;

  const users = await User.find(filter)
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await User.countDocuments(filter);
  res.json({ count, users });
};

// ────────────────────────────────
// 4️⃣  Get list of stores (with avg rating)
export const getStores = async (req, res) => {
  const {
    name,
    address,
    sort = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (address) filter.address = new RegExp(address, "i");

  const stores = await Store.find(filter)
    .populate("owner", "name email")
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  // compute average rating for each store
  const storesWithAvg = await Promise.all(
    stores.map(async (store) => {
      const ratings = await Rating.find({ store: store._id });
      const avg =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0;
      return { ...store.toObject(), averageRating: avg.toFixed(1) };
    })
  );

  const count = await Store.countDocuments(filter);
  res.json({ count, stores: storesWithAvg });
};

// ────────────────────────────────
// 5️⃣  Dashboard summary
export const getDashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStores = await Store.countDocuments();
  const totalRatings = await Rating.countDocuments();

  res.json({ totalUsers, totalStores, totalRatings });
};
