import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

  // fetch all stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/stores");
        setStores(res.data.stores);
      } catch (err) {
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const openStore = async (id) => {
    try {
      const res = await api.get(`/stores/${id}`);
      setSelected(res.data.store);
      setUserRating(res.data.userRating?.rating || 0);
      setComment(res.data.userRating?.comment || "");
    } catch {
      setError("Failed to fetch store details");
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/stores/${selected._id}/rate`, {
        rating: userRating,
        comment,
      });
      alert("Rating submitted!");
      setSelected(null);
    } catch {
      alert("Error submitting rating");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading stores...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Stores</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              key={store._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
              onClick={() => openStore(store._id)}
            >
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.address}</p>
              <p className="mt-2">Email: {store.email}</p>
            </div>
          ))}
        </div>

        {/* Popup rating modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
              <p className="mb-4 text-gray-600">{selected.address}</p>

              <form onSubmit={handleRatingSubmit}>
                <label className="block mb-2">Your Rating (1–5):</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={userRating}
                  onChange={(e) => setUserRating(Number(e.target.value))}
                  className="border p-2 w-full rounded mb-3"
                  required
                />
                <textarea
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border p-2 w-full rounded mb-3"
                />

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
