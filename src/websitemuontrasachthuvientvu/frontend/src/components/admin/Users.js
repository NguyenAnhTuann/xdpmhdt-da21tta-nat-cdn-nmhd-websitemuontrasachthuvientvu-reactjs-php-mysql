import { faEdit, faPlus, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false });


    const [formData, setFormData] = useState({
        name: "",
        password: "",
        date: "",
        class: "",
        major: "",
        faculty: "",
        school: "",
        phone: "",
        email: "",
        address: "",
    });


    const navigate = useNavigate();

    const handleResetForm = () => {
        setFormData({
            name: "",
            password: "",
            date: "",
            class: "",
            major: "",
            faculty: "",
            school: "",
            phone: "",
            email: "",
            address: "",
        });
    };


    const showNotification = (message) => {
        setNotification({ message, visible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false });
    };



    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost/websitemuontrasachthuvientvu/backend/admin/users/users.php"
                );
                const result = await response.json();
                setUsers(result);
            } catch (error) {
                console.error("Error fetching users data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async () => {
        const phoneRegex = /^\d{10}$/; // Chỉ chấp nhận 10 số
        if (!phoneRegex.test(formData.phone)) {
            showNotification("Số điện thoại phải đúng 10 chữ số");
            return;
        }

        const isPhoneDuplicated = users.some(user => user.phone === formData.phone);
        if (isPhoneDuplicated) {
            showNotification("Số điện thoại đã tồn tại. Vui lòng nhập số khác.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email hợp lệ
        if (!emailRegex.test(formData.email)) {
            showNotification("Email không hợp lệ");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/admin/users/add_users.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                setUsers([...users, { ...formData, id: result.newId }]);
                handleResetForm();
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };



    const handleUpdateUser = async (id) => {
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/admin/users/update_users.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, id }),
                }
            );
            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                setUsers(users.map((user) => (user.id === id ? formData : user)));
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa người dùng này không?")) {
            try {
                const response = await fetch(
                    "http://localhost/websitemuontrasachthuvientvu/backend/admin/users/delete_users.php",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id }),
                    }
                );
                const result = await response.json();
                if (result.success) {
                    showNotification(result.message);
                    setUsers(users.filter((user) => user.id !== id));
                } else {
                    showNotification(result.message);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (users.length === 0) return <p className="text-center text-gray-500">No users found.</p>;

    return (

        <div className="p-4 bg-gray-50 min-h-screen">
            {notification.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-[28rem] max-w-full">
                        {/* Biểu tượng */}
                        <div className="flex justify-center mt-6 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7.003 7.003 0 015 10a1 1 0 012 0 5 5 0 105 5 1 1 0 010 2zm0-4.43a3.002 3.002 0 01-2-5.65 1 1 0 112 0 3 3 0 010 5.65z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="px-6 py-2 text-center text-gray-700 text-base font-medium">
                            {notification.message}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center px-6 py-4">
                            <button
                                onClick={closeNotification}
                                className="text-black px-6 py-2 text-sm font-medium rounded-2xl bg-gray-300 hover:bg-gray-600 transition border-2"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}




            <div className="relative bg-gradient-to-r from-gray-100 to-white p-10 rounded-xl shadow-2xl">
                {/* Tiêu đề */}
                <h2 className="text-center text-6xl font-extrabold text-gray-800 tracking-wider uppercase mb-4">
                    Quản Lý Thông Tin Người Dùng
                </h2>

                {/* Đường viền dưới tiêu đề */}
                <div className="w-40 h-2 bg-black mx-auto rounded-full"></div>
                {/* Nút quay lại */}
                <div className="absolute top-4 left-4">
                    <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105 text-lg font-medium"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Trở về Trang Quản Trị
                    </button>
                </div>
            </div>

            <div className="mb-8 p-8 bg-white shadow-2xl rounded-xl border border-gray-200">
                {/* Tiêu đề */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full shadow-lg">
                        <span className="text-white text-2xl">👤</span>
                    </div>
                    <h3 className="ml-4 text-3xl font-bold text-gray-800">
                        THÊM HOẶC CẬP NHẬT THÔNG TIN NGƯỜI DÙNG
                    </h3>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-6">
                    {Object.keys(formData).map((field) => (
                        <div key={field} className="relative">
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                {field === "id"
                                    ? "ID"
                                    : field === "name"
                                        ? "Họ và Tên"
                                        : field === "date"
                                            ? "Ngày Sinh"
                                            : field === "class"
                                                ? "Lớp"
                                                : field === "major"
                                                    ? "Ngành"
                                                    : field === "faculty"
                                                        ? "Khoa"
                                                        : field === "school"
                                                            ? "Trường"
                                                            : field === "phone"
                                                                ? "Số Điện Thoại"
                                                                : field === "email"
                                                                    ? "Email"
                                                                    : field === "address"
                                                                        ? "Địa Chỉ"
                                                                        : field === "password"
                                                                            ? "Mật Khẩu"
                                                                            : field.toUpperCase()}
                            </label>
                            <div className="relative">
                                <input
                                    type={field === "password" ? "password" : field === "date" ? "date" : "text"}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    readOnly={field === "id"} // Chỉ đọc nếu là ID
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 ${field === "id" ? "bg-gray-100 cursor-not-allowed" : "focus:ring-blue-400"
                                        } focus:outline-none pl-12`}
                                    placeholder={
                                        field === "id"
                                            ? "ID không thể chỉnh sửa"
                                            : field === "name"
                                                ? "Nhập họ và tên"
                                                : field === "date"
                                                    ? "Chọn ngày sinh"
                                                    : field === "class"
                                                        ? "Nhập lớp"
                                                        : field === "major"
                                                            ? "Nhập ngành học"
                                                            : field === "faculty"
                                                                ? "Nhập khoa"
                                                                : field === "school"
                                                                    ? "Nhập trường"
                                                                    : field === "phone"
                                                                        ? "Nhập số điện thoại"
                                                                        : field === "email"
                                                                            ? "Nhập email"
                                                                            : field === "address"
                                                                                ? "Nhập địa chỉ"
                                                                                : field === "password"
                                                                                    ? "Nhập mật khẩu"
                                                                                    : ""
                                    }
                                />
                                <div className="absolute left-4 top-3 text-gray-500 text-xl">
                                    {field === "id"
                                        ? "👤"
                                        : field === "name"
                                            ? "👤"
                                            : field === "date"
                                                ? "📅"
                                                : field === "class"
                                                    ? "🏫"
                                                    : field === "major"
                                                        ? "📚"
                                                        : field === "faculty"
                                                            ? "🏛️"
                                                            : field === "school"
                                                                ? "🎓"
                                                                : field === "phone"
                                                                    ? "📱"
                                                                    : field === "email"
                                                                        ? "📧"
                                                                        : field === "address"
                                                                            ? "🏠"
                                                                            : field === "password"
                                                                                ? "🔒"
                                                                                : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Buttons */}

                <div className="mt-6 flex justify-center space-x-4">
                    {/* Nút Thêm */}
                    <button
                        onClick={handleAddUser}
                        className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Thêm
                    </button>

                    {/* Nút Cập nhật */}
                    <button
                        onClick={() => handleUpdateUser(formData.id)}
                        className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                    >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Cập nhật
                    </button>

                    {/* Nút Reset */}
                    <button
                        onClick={handleResetForm}
                        className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                    >
                        <FontAwesomeIcon icon={faSync} className="mr-2" />
                        Reset
                    </button>
                </div>

            </div>


            <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg p-4">
                <table className="w-full border-collapse border border-gray-200">
                    {/* Header */}
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                        <tr>
                            {[
                                "ID",
                                "Tên người dùng",
                                "Ngày sinh",
                                "Lớp",
                                "Ngành",
                                "Khoa",
                                "Trường",
                                "Số điện thoại",
                                "Email",
                                "Địa chỉ",
                                "Thao tác",
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 border-r border-blue-300 text-left text-sm font-semibold uppercase"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3 border-r border-gray-200">{user.id}</td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {user.name}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {user.date}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200">{user.class}</td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {user.major}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {user.faculty}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {user.school}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200">{user.phone}</td>
                                <td className="px-6 py-3 border-r border-gray-200">{user.email}</td>
                                <td className="px-6 py-3 border-r border-gray-200 break-words max-w-lg">
                                    {user.address}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 flex space-x-2">
                                    {/* Nút Sửa */}
                                    <button
                                        onClick={() => {
                                            // Loại bỏ `otp` và `otp_expiry` khỏi đối tượng `user`
                                            const { otp, otp_expiry, ...rest } = user;
                                            setFormData(rest);
                                        }}
                                        className="flex items-center justify-center px-4 py-2 shadow border border-gray-300 rounded-full text-black hover:bg-gray-300 transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Sửa
                                    </button>
                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="flex items-center justify-center px-4 py-2 shadow border border-gray-300 rounded-full text-white bg-red-600 hover:bg-red-700 transition"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div >
    );
};

export default Users;
