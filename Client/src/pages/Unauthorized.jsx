import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">
        401 - Unauthorized
      </h1>
      <p className="text-gray-600 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/login"
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
