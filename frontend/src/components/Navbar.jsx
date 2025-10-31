import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Stores
        </Link>
        {role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}
        {role === "owner" && (
          <Link to="/owner" className="hover:underline">
            Owner
          </Link>
        )}
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
      <button onClick={handleLogout} className="hover:underline">
        Logout
      </button>
    </nav>
  );
}
