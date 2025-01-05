import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });


    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000); // Ẩn sau 3 giây
    };

    // Lấy thông tin người dùng từ localStorage
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
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...userData,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/update_profile.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.message === "Cập nhật thành công") {
                showNotification("Cập nhật thông tin thành công!", "success");
                localStorage.setItem("user", JSON.stringify(formData));
                setTimeout(() => navigate("/edit-profile"), 3000);
            } else {
                showNotification("Lỗi: " + data.message, "error");
            }


        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            showNotification("Có lỗi xảy ra, vui lòng thử lại!", "error");
        }

    };

    return (

        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1735325448/1_x7mrol.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            
            {notification.show && (
                <div
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-md shadow-md text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {notification.message}
                </div>
            )}

            <div className="bg-white bg-opacity-90 shadow-lg rounded-xl w-full max-w-2xl p-8 space-y-6">
                <div className="flex items-center justify-start w-full mb-4">
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-gray-400 text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        ← Quay về Trang Chủ
                    </button>
                </div>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                        <svg
                            className="w-12 h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 11.002 6.002A3 3 0 0112 5zm0 14c-2.671 0-5.067-1.256-6.597-3.21a7.972 7.972 0 0113.194 0C17.067 17.744 14.671 19 12 19z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Chỉnh Sửa Thông Tin</h2>
                    <p className="text-gray-500">Cập nhật thông tin cá nhân của bạn để hoàn thiện hồ sơ</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tên"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Lớp</label>
                            <input
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                placeholder="Lớp"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Major */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngành học</label>
                            <input
                                name="major"
                                value={formData.major}
                                onChange={handleChange}
                                placeholder="Ngành học"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Faculty */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Khoa</label>
                            <input
                                name="faculty"
                                value={formData.faculty}
                                onChange={handleChange}
                                placeholder="Khoa"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* School */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Trường</label>
                            <input
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                placeholder="Trường"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Số điện thoại"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Địa chỉ"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                        >
                            Cập Nhật Thông Tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
