import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        class: "",
        major: "",
        faculty: "",
        school: "",
        phone: "",
        email: "",
        address: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            setTimeout(() => {
                if (data.message === "Đăng ký thành công") {
                    navigate("/login");
                } else if (data.message === "Số điện thoại đã tồn tại") {
                    setErrorMessage("Số điện thoại này đã được sử dụng. Vui lòng thử số khác.");
                } else if (data.message === "Email đã tồn tại") {
                    setErrorMessage("Email này đã được sử dụng. Vui lòng thử email khác.");
                } else {
                    setErrorMessage(data.message);
                }
                setIsLoading(false);
            }, 3000);
        } catch (error) {
            console.error("Lỗi khi gửi request:", error);
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại!");
            setIsLoading(false);
        }
    };


    return (
        <div
            className="relative min-h-screen flex items-center justify-center p-6"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1735644020/Logotimdothatlac_1_qdrlei.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-40 w-40 border-t-8 border-green-400 mb-6"></div>
                    <p className="text-white text-2xl font-bold animate-pulse">
                        ⏳ Đang xử lý, nếu thành công sẽ chuyển hướng sang trang đăng nhập ...
                    </p>
                </div>
            )}

            {/* Card container */}
            <div className="relative flex bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-7xl">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://res.cloudinary.com/duk8odqun/image/upload/v1736451153/tthl_nucvkl.jpg"
                        alt="Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <FontAwesomeIcon icon={faUser} className="text-white text-4xl" />
                        </div>
                    </div>
                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">
                        Đăng Ký Tài Khoản
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Vui lòng điền đầy đủ thông tin của bạn
                    </p>

                    {/* Error message */}
                    {errorMessage && (
                        <div className="mb-4 text-center text-red-500 font-medium animate-pulse">
                            {errorMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ và tên"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                👤
                            </span>
                        </div>

                        {/* Date */}
                        <div className="relative">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                📅
                            </span>
                        </div>

                        {/* Class */}
                        <div className="relative">
                            <input
                                type="text"
                                name="class"
                                placeholder="Lớp"
                                value={formData.class}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                🏫
                            </span>
                        </div>

                        {/* Major */}
                        <div className="relative">
                            <input
                                type="text"
                                name="major"
                                placeholder="Ngành học"
                                value={formData.major}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                📚
                            </span>
                        </div>
                        {/* Faculty */}
                        <div className="relative">
                            <input
                                type="text"
                                name="faculty"
                                placeholder="Khoa"
                                value={formData.faculty}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                🏛️
                            </span>
                        </div>

                        {/* School */}
                        <div className="relative">
                            <input
                                type="text"
                                name="school"
                                placeholder="Trường"
                                value={formData.school}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                🎓
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                📱
                            </span>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                📧
                            </span>
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                🏠
                            </span>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-500">
                                🔒
                            </span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                            {isLoading ? "⏳ Đang xử lý..." : "🚀 Đăng Ký"}
                        </button>

                        {/* Login */}
                        <div className="mt-6 text-center text-gray-500">
                            <p>
                                Bạn đã có tài khoản?{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-green-500 font-medium hover:underline"
                                >
                                    Đăng nhập ngay
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Register;
