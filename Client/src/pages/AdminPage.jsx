import React, { useState } from "react";
import AdminReportsPage from "./AdminReportsPage";
import UsersPage from "./UsersPage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("reports");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 border-b-2 ${
            activeTab === "reports"
              ? "border-amber-600 font-semibold"
              : "border-transparent"
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 border-b-2 ${
            activeTab === "users"
              ? "border-amber-600 font-semibold"
              : "border-transparent"
          }`}
        >
          Users
        </button>
      </div>

      <div>
        {activeTab === "reports" && <AdminReportsPage />}
        {activeTab === "users" && <UsersPage />}
      </div>
    </div>
  );
}
