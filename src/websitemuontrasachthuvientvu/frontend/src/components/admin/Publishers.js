import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";


const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", visible: false });

    const showNotification = (message) => {
        setNotification({ message, visible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false });
    };

    const [newPublisher, setNewPublisher] = useState({
        id: null,
        name: "",
    });

    // Fetch publishers
    const fetchPublishers = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/publishers/publishers.php");
            const result = await response.json();
            setPublishers(result);
        } catch (error) {
            console.error("Error fetching publishers data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublishers();
    }, []);

    const handleAddOrUpdatePublisher = async () => {
        const endpoint = newPublisher.id
            ? "http://localhost/websitemuontrasachthuvientvu/backend/admin/publishers/update_publisher.php"
            : "http://localhost/websitemuontrasachthuvientvu/backend/admin/publishers/add_publisher.php";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPublisher),
            });

            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                fetchPublishers();
                handleReset();
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error adding or updating publisher:", error);
            showNotification("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    };


    // Delete publisher
    const handleDeletePublisher = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa nhà xuất bản này không?")) return;

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/publishers/delete_publisher.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                setPublishers(publishers.filter((publisher) => publisher.id !== id));
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error deleting publisher:", error);
        }
    };

    // Edit publisher
    const handleEditPublisher = (publisher) => {
        setNewPublisher({ ...publisher });
    };

    // Reset form
    const handleReset = () => {
        setNewPublisher({ id: null, name: "" });
    };

    if (loading) return <p>Loading...</p>;

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
                    Quản Lý Thông Tin Nhà Xuất Bản
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
                        <span className="text-white text-2xl">🏢</span>
                    </div>
                    <h3 className="ml-4 text-3xl font-bold text-gray-800">
                        THÊM HOẶC CẬP NHẬT NHÀ XUẤT BẢN
                    </h3>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Chỉ hiển thị trường ID khi đang chỉnh sửa */}
                    {newPublisher.id && (
                        <div className="relative">
                            <label
                                htmlFor="id"
                                className="block text-sm font-medium text-gray-600 mb-2"
                            >
                                ID
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={newPublisher.id}
                                    readOnly
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none"
                                    placeholder="ID không thể chỉnh sửa"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">🏷️</div>
                            </div>
                        </div>
                    )}

                    {/* Trường Tên Nhà Xuất Bản */}
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Tên Nhà Xuất Bản
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newPublisher.name}
                                onChange={(e) =>
                                    setNewPublisher({ ...newPublisher, name: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Nhập tên nhà xuất bản"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">🏢</div>
                        </div>
                    </div>
                </div>


                {/* Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    {/* Nút Thêm */}
                    {!newPublisher.id && (
                        <button
                            onClick={handleAddOrUpdatePublisher}
                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Thêm
                        </button>
                    )}

                    {/* Nút Cập nhật */}
                    {newPublisher.id && (
                        <button
                            onClick={handleAddOrUpdatePublisher}
                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Cập nhật
                        </button>
                    )}

                    {/* Nút Reset */}
                    <button
                        onClick={handleReset}
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
                            {["ID", "Tên Nhà Xuất Bản", "Thao tác"].map((header, index) => (
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
                        {publishers.map((publisher, index) => (
                            <tr
                                key={publisher.id}
                                className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3 border-r border-gray-200">{publisher.id}</td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {publisher.name}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 flex space-x-2">
                                    {/* Nút Sửa */}
                                    <button
                                        onClick={() => handleEditPublisher(publisher)}
                                        className="flex items-center justify-center px-4 py-2 shadow border border-gray-300 rounded-full text-black hover:bg-gray-300 transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Sửa
                                    </button>
                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDeletePublisher(publisher.id)}
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

        </div>
    );
};

export default Publishers;
