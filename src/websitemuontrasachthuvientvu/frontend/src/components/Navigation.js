import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineBarChart } from "react-icons/ai"; // Import icon từ react-icons

const Navigation = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại để xác định nút đang active.

  return (
    <nav className="bg-gray-100 border-b shadow-lg">
      <div className="container mx-auto flex justify-center p-4 space-x-6">
        {/* Nút Home */}
        <Link
          to="/"
          className={`flex items-center px-6 py-4 text-lg font-semibold rounded-2xl ${
            location.pathname === "/"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-blue-500 border border-blue-500"
          } hover:bg-blue-600 hover:text-white transition duration-300`}
        >
          <AiFillHome className="mr-2 text-2xl" /> {/* Icon Home */}
          Home
        </Link>

        {/* Nút Dashboard */}
        <Link
          to="/dashboard"
          className={`flex items-center px-6 py-4 text-lg font-semibold rounded-2xl ${
            location.pathname === "/dashboard"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-blue-500 border border-blue-500"
          } hover:bg-blue-600 hover:text-white transition duration-300`}
        >
          <AiOutlineBarChart className="mr-2 text-2xl" /> {/* Icon Dashboard */}
          Thống kê
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
