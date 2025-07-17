import React from "react";
import ModeToggle from "@/theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Trust Reports</h1>
        <div className="flex items-center justify-between space-x-6">
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
