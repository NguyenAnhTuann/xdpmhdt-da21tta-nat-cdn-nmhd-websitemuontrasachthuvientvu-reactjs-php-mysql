import { faEdit, faPlus, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", visible: false });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 20;
    const [categoryCount, setCategoryCount] = useState({});


    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const showNotification = (message) => {
        setNotification({ message, visible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false });
    };

    const [newCategory, setNewCategory] = useState({
        id: null,
        name: "",
    });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/categories/categories.php");
            const result = await response.json();
            setCategories(result);

            const booksResponse = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/books/books.php");
            const books = await booksResponse.json();

            const categoryCountObj = books.reduce((acc, book) => {
                const categoryId = book.category_id;
                acc[categoryId] = acc[categoryId] ? acc[categoryId] + 1 : 1;
                return acc;
            }, {});

            setCategoryCount(categoryCountObj);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    // Add or update category
    const handleAddOrUpdateCategory = async () => {
        const endpoint = newCategory.id
            ? "http://localhost/websitemuontrasachthuvientvu/backend/admin/categories/update_category.php"
            : "http://localhost/websitemuontrasachthuvientvu/backend/admin/categories/add_category.php";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });
            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                fetchCategories(); // Reload the categories list
                handleReset();
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error adding or updating category:", error);
        }
    };

    // Delete category
    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa thể loại này không?")) return;

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/categories/delete_category.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                setCategories(categories.filter((category) => category.id !== id));
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Edit category
    const handleEditCategory = (category) => {
        setNewCategory({ ...category });
    };

    // Reset form
    const handleReset = () => {
        setNewCategory({ id: null, name: "" });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-8 min-h-screen">
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
            <div className="mt-4">
                {/* Nút quay lại */}
                <div className="flex justify-start mb-4">
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
            <div className="relative p-10 rounded-xl mt-4 mb-8 border-2">
                {/* Tiêu đề */}
                <h2 className="text-center text-6xl font-extrabold text-gray-800 tracking-wider uppercase mb-4">
                    Quản Lý Thông Tin Thể loại sách
                </h2>
            </div>

            <div className="mb-8 p-8 bg-white shadow-2xl rounded-xl border border-gray-200">
                {/* Tiêu đề */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full shadow-lg">
                        <span className="text-white text-2xl">📚</span>
                    </div>
                    <h3 className="ml-4 text-3xl font-bold text-gray-800">
                        THÊM HOẶC CẬP NHẬT THỂ LOẠI SÁCH
                    </h3>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Chỉ hiển thị trường ID khi đang chỉnh sửa */}
                    {newCategory.id && (
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
                                    value={newCategory.id}
                                    readOnly
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none"
                                    placeholder="ID không thể chỉnh sửa"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">🏷️</div>
                            </div>
                        </div>
                    )}

                    {/* Trường Tên Thể Loại */}
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Tên Thể Loại
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newCategory.name}
                                onChange={(e) =>
                                    setNewCategory({ ...newCategory, name: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Nhập tên thể loại"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">📚</div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    {/* Nút Thêm */}
                    {!newCategory.id && (
                        <button
                            onClick={handleAddOrUpdateCategory}
                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Thêm
                        </button>
                    )}

                    {/* Nút Cập nhật */}
                    {newCategory.id && (
                        <button
                            onClick={handleAddOrUpdateCategory}
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

            <div className="mb-6 flex flex-wrap gap-6 items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="🔍 Tìm kiếm theo tên thể loại..."
                    className="w-[400px] px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                />
                <button
                    onClick={() => setSearchTerm("")}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    🔄 Đặt lại
                </button>
            </div>

            <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg p-4">
                <table className="w-full border-collapse border border-gray-200">
                    {/* Header */}
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                        <tr>
                            {["ID", "Tên Thể Loại", "Tổng số sách", "Thao tác"].map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 border-r border-blue-300 text-left text-sm font-semibold uppercase"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {currentCategories.map((category, index) => (
                            <tr
                                key={category.id}
                                className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3 border-r border-gray-200">{category.id}</td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {category.name}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200">
                                    {categoryCount[category.id] || 0} {/* Hiển thị tổng số sách */}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 flex space-x-2">
                                    {/* Nút Sửa */}
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="flex items-center justify-center px-4 py-2 shadow border border-gray-300 rounded-full text-black hover:bg-gray-300 transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Sửa
                                    </button>
                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
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
                <div className="mt-8 flex justify-center items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => {
                                handlePageChange(page);
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            className={`px-4 py-2 rounded ${page === currentPage ? "border-2 rounded-2xl bg-red-500 text-white" : "hover:bg-gray-200 border-2 rounded-2xl"}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>


            </div>

        </div>
    );
};

export default Categories;
