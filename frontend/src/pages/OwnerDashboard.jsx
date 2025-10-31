import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);

  // load stores owned by the logged-in owner
  useEffect(() => {
    const fetchStores = async () => {
      const res = await api.get("/admin/stores"); // we can reuse admin list
      const myId = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1])
      ).id;
      const owned = res.data.stores.filter((s) => s.owner?._id === myId);
      setStores(owned);
    };
    fetchStores();
  }, []);

  const openStore = async (id) => {
    setSelected(id);
    const r = await api.get(`/owner/${id}/ratings`);
    const a = await api.get(`/owner/${id}/average`);
    setRatings(r.data.ratings);
    setAverage(a.data.average);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">My Stores</h2>

        {/* List of owned stores */}
        <div className="grid md:grid-cols-3 gap-4">
          {stores.map((s) => (
            <div
              key={s._id}
              onClick={() => openStore(s._id)}
              className={`p-4 border rounded-lg shadow cursor-pointer ${
                selected === s._id ? "border-blue-600" : ""
              }`}
            >
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.address}</p>
              <p className="text-sm mt-1">Email: {s.email}</p>
            </div>
          ))}
        </div>

        {/* Ratings section */}
        {selected && (
          <div className="mt-8 bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">
              Ratings for selected store
            </h3>
            <p className="mb-4 text-gray-600">Average Rating: {average}</p>

            {ratings.length === 0 ? (
              <p>No ratings yet</p>
            ) : (
              <table className="min-w-full bg-white rounded">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">User</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Rating</th>
                    <th className="p-2 text-left">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((r) => (
                    <tr key={r._id} className="border-b">
                      <td className="p-2">{r.user?.name}</td>
                      <td className="p-2">{r.user?.email}</td>
                      <td className="p-2">{r.rating}</td>
                      <td className="p-2">{r.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
