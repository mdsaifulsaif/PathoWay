import React from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-md">
        <FaBan className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          403 - Forbidden
        </h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
