import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Hiển thị hiệu ứng loading ngay lập tức
        setErrorMessage(""); // Đặt lại thông báo lỗi nếu có
    
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/login.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );
    
            const data = await response.json();
    
            if (data.status === "success") {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
    
                // Hiển thị thông báo thành công
                setSuccessMessage(true);
    
                // Điều hướng sau khi đăng nhập thành công
                setTimeout(() => {
                    navigate(data.role === "admin" ? "/admin" : "/");
                }, 3000);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Lỗi khi gửi request:", error);
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false); // Ẩn loading khi xử lý xong
        }
    };
    

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
            {/* Loading Overlay */}
            {successMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-40 w-40 border-t-8 border-blue-500 mb-6"></div>
                    <p className="text-white text-2xl font-bold animate-pulse">
                        🎉 Đăng nhập thành công! Đang chuyển hướng...
                    </p>
                </div>
            )}

            {/* Card container */}
            <div
                className={`relative bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg ${
                    isLoading ? "opacity-30" : ""
                }`}
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7.003 7.003 0 015 10a1 1 0 012 0 5 5 0 105 5 1 1 0 010 2zm0-4.43a3.002 3.002 0 01-2-5.65 1 1 0 112 0 3 3 0 010 5.65z"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">
                    Chào Mừng Trở Lại!
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Đăng nhập vào tài khoản của bạn
                </p>

                {/* Error message */}
                {errorMessage && (
                    <div className="mb-4 text-center text-red-500 font-medium animate-pulse">
                        {errorMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Nhập email hoặc số điện thoại"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <span className="absolute left-4 top-3 text-gray-400">
                            📧
                        </span>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <span className="absolute left-4 top-3 text-gray-400">
                            🔒
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "⏳ Đang xử lý..." : "🚀 Đăng nhập"}
                    </button>
                </form>

                {/* Register & Forgot Password */}
                <div className="mt-6 text-center text-gray-500">
                    <p>
                        Chưa có tài khoản?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Đăng ký ngay
                        </button>
                    </p>
                    <p className="mt-2">
                        <button
                            onClick={() => navigate("/forgot-password")}
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Quên mật khẩu?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
