import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  // fetch dashboard summary
  useEffect(() => {
    if (tab === "dashboard") fetchDashboard();
    else if (tab === "users") fetchUsers();
    else if (tab === "stores") fetchStores();
  }, [tab]);

  const fetchDashboard = async () => {
    const res = await api.get("/admin/dashboard");
    setSummary(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data.users);
  };

  const fetchStores = async () => {
    const res = await api.get("/admin/stores");
    setStores(res.data.stores);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await api.post("/admin/users", form);
    alert("User added!");
    setForm({ name: "", email: "", password: "", address: "", role: "user" });
    fetchUsers();
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    await api.post("/admin/stores", storeForm);
    alert("Store added!");
    setStoreForm({ name: "", email: "", address: "", ownerId: "" });
    fetchStores();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTab("dashboard")}
            className={`px-4 py-2 rounded ${
              tab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setTab("users")}
            className={`px-4 py-2 rounded ${
              tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("stores")}
            className={`px-4 py-2 rounded ${
              tab === "stores" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Stores
          </button>
        </div>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">{summary.totalUsers}</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">Total Stores</h3>
              <p className="text-2xl font-bold">{summary.totalStores}</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">Total Ratings</h3>
              <p className="text-2xl font-bold">{summary.totalRatings}</p>
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div>
            <form
              onSubmit={handleAddUser}
              className="bg-white p-4 rounded shadow mb-4"
            >
              <h3 className="text-lg font-bold mb-2">Add User</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add User
              </button>
            </form>

            <h3 className="text-lg font-semibold mb-2">All Users</h3>
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* STORES */}
        {tab === "stores" && (
          <div>
            <form
              onSubmit={handleAddStore}
              className="bg-white p-4 rounded shadow mb-4"
            >
              <h3 className="text-lg font-bold mb-2">Add Store</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  placeholder="Name"
                  value={storeForm.name}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, name: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={storeForm.email}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, email: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Address"
                  value={storeForm.address}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, address: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  placeholder="Owner ID (optional)"
                  value={storeForm.ownerId}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, ownerId: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Store
              </button>
            </form>

            <h3 className="text-lg font-semibold mb-2">All Stores</h3>
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Address</th>
                  <th className="p-2 text-left">Avg Rating</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((s) => (
                  <tr key={s._id} className="border-b">
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.email}</td>
                    <td className="p-2">{s.address}</td>
                    <td className="p-2">{s.averageRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
