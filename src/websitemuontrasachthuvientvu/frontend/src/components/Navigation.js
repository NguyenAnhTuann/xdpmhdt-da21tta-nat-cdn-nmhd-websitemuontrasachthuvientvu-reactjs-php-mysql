import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faBook } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-100 border-b shadow-lg">
      <div className="container mx-auto flex justify-center p-4 space-x-6">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${
            location.pathname === "/"
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
          } rounded-2xl flex items-center`}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3 text-2xl" /> {/* Home Icon */}
          Home
        </button>

        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${
            location.pathname === "/dashboard"
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
          } rounded-2xl flex items-center`}
        >
          <FontAwesomeIcon icon={faChartBar} className="mr-3 text-2xl" /> {/* Dashboard Icon */}
          Thống kê
        </button>

        {/* Quy định Button */}
        <button
          onClick={() => navigate("/rules")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${
            location.pathname === "/rules"
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
          } rounded-2xl flex items-center`}
        >
          <FontAwesomeIcon icon={faBook} className="mr-3 text-2xl" /> {/* Quy định Icon */}
          Nội quy thư viện
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
