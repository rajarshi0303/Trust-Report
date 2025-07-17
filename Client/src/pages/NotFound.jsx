import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        Page not found. The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
