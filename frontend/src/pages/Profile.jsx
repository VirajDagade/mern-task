import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/password", { currentPassword, newPassword });
      setMsg("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
          >
            Update
          </button>

          {msg && <p className="text-center mt-3 text-sm">{msg}</p>}
        </form>
      </div>
    </>
  );
}
