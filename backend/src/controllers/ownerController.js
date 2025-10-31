import Store from "../models/storeModel.js";
import Rating from "../models/ratingModel.js";

// ────────────── 1️⃣ Get ratings for a store owned by the user ──────────────
export const getStoreRatings = async (req, res) => {
  const { storeId } = req.params;

  const store = await Store.findById(storeId);
  if (!store) return res.status(404).json({ error: "Store not found" });

  // check ownership
  if (store.owner?.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Access denied: not your store" });
  }

  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
  } = req.query;

  const ratings = await Rating.find({ store: storeId })
    .populate("user", "name email")
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Rating.countDocuments({ store: storeId });
  res.json({ count, ratings });
};

// ────────────── 2️⃣ Get average rating for a store owned by the user ──────────────
export const getStoreAverage = async (req, res) => {
  const { storeId } = req.params;

  const store = await Store.findById(storeId);
  if (!store) return res.status(404).json({ error: "Store not found" });

  if (store.owner?.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Access denied: not your store" });
  }

  const ratings = await Rating.find({ store: storeId });
  const average =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  res.json({
    storeId,
    average: average.toFixed(1),
    totalRatings: ratings.length,
  });
};
