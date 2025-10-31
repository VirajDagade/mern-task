import Store from "../models/storeModel.js";
import Rating from "../models/ratingModel.js";

// ────────────── 1️⃣ Get all stores ──────────────
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
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Store.countDocuments(filter);
  res.json({ count, stores });
};

// ────────────── 2️⃣ Get single store with avg + user rating ──────────────
export const getStoreById = async (req, res) => {
  const { id } = req.params;

  const store = await Store.findById(id).populate("owner", "name email");
  if (!store) return res.status(404).json({ error: "Store not found" });

  const ratings = await Rating.find({ store: id });
  const average =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  let userRating = null;
  if (req.user) {
    userRating = await Rating.findOne({ user: req.user._id, store: id });
  }

  res.json({ store, average: average.toFixed(1), userRating });
};

// ────────────── 3️⃣ Submit or update rating ──────────────
export const rateStore = async (req, res) => {
  const { id } = req.params; // store id
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5)
    return res.status(400).json({ error: "Rating must be between 1 and 5" });

  let userRating = await Rating.findOne({ user: req.user._id, store: id });

  if (userRating) {
    userRating.rating = rating;
    userRating.comment = comment || "";
    await userRating.save();
    return res.json({ message: "Rating updated", rating: userRating });
  } else {
    const newRating = await Rating.create({
      user: req.user._id,
      store: id,
      rating,
      comment,
    });
    return res
      .status(201)
      .json({ message: "Rating submitted", rating: newRating });
  }
};
