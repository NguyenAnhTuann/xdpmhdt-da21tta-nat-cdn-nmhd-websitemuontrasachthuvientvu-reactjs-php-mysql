import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";



const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: "", visible: false, type: "" });

    const showNotification = (message, type) => {
        setNotification({ message, visible: true, type });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false, type: "" });
    };

    const [newBook, setNewBook] = useState({
        id: null,
        title: "",
        author: "",
        publisher_id: "",
        publication_date: "",
        category_id: "",
        language: "",
        pages: "",
        available_quantity: "",
        description: "",
        image: null,
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const publishersResponse = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/publishers/publishers.php");
                const categoriesResponse = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/categories/categories.php");

                const publishersData = await publishersResponse.json();
                const categoriesData = await categoriesResponse.json();

                setPublishers(publishersData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            showNotification("Vui lòng chọn một file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "book_uploads");
        formData.append("folder", "book_images");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/duk8odqun/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok && data.secure_url) {
                setNewBook({ ...newBook, image: data.secure_url }); // Cập nhật ảnh mới
                showNotification("Ảnh đã được tải lên thành công!");
            } else {
                console.error("Lỗi từ Cloudinary:", data);
                showNotification(`Upload ảnh thất bại: ${data.error?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
            showNotification("Đã xảy ra lỗi khi tải ảnh lên!");
        }
    };

    const handleAddBook = async () => {
        // Kiểm tra các trường bắt buộc
        if (
            !newBook.title ||
            !newBook.author ||
            !newBook.publisher_id ||
            !newBook.category_id ||
            !newBook.language ||
            !newBook.pages ||
            !newBook.available_quantity ||
            !newBook.description
        ) {
            showNotification("Vui lòng điền đầy đủ thông tin sách!");
            return;
        }

        // Chuyển đổi ngày từ dd/mm/yyyy sang yyyy-mm-dd
        const convertDateToYYYYMMDD = (date) => {
            const [day, month, year] = date.split("/");
            return `${year}-${month}-${day}`;
        };

        const bookData = { ...newBook };
        if (bookData.publication_date) {
            bookData.publication_date = convertDateToYYYYMMDD(bookData.publication_date);
        }

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/books/add_books.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                fetchBooks(); // Tải lại danh sách sách
                handleReset(); // Reset form
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error adding book:", error);
            showNotification("Đã xảy ra lỗi khi thêm sách!");
        }
    };

    const handleUpdateBook = async () => {
        // Kiểm tra các trường bắt buộc
        if (
            !newBook.id ||
            !newBook.title ||
            !newBook.author ||
            !newBook.publisher_id ||
            !newBook.category_id ||
            !newBook.language ||
            !newBook.pages ||
            !newBook.available_quantity ||
            !newBook.description
        ) {
            showNotification("Vui lòng điền đầy đủ thông tin sách!");
            return;
        }

        // Chuyển đổi ngày từ dd/mm/yyyy sang yyyy-mm-dd
        const convertDateToYYYYMMDD = (date) => {
            if (!date || !/\d{4}-\d{2}-\d{2}/.test(date)) {
                return date; // Giữ nguyên nếu đã đúng định dạng
            }
            return date; // Đã ở dạng `yyyy-mm-dd`
        };


        const bookData = { ...newBook };
        if (bookData.publication_date) {
            bookData.publication_date = convertDateToYYYYMMDD(bookData.publication_date);
        }

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/books/update_books.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                fetchBooks(); // Tải lại danh sách sách
                handleReset(); // Reset form
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error updating book:", error);
            showNotification("Đã xảy ra lỗi khi cập nhật sách!");
        }
    };



    const handleDeleteBook = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sách này không?")) return;

        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/books/delete_books.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }), // Đảm bảo id được gửi đúng
            });

            const result = await response.json();
            if (result.success) {
                showNotification(result.message);
                setBooks(books.filter((book) => book.id !== id)); // Loại bỏ sách đã xóa khỏi danh sách
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/books/books.php");
            const data = await response.json();

            // Kiểm tra nếu dữ liệu trả về là mảng, nếu không thì gán mảng rỗng
            if (Array.isArray(data)) {
                setBooks(data);
            } else {
                console.error("API trả về không phải là mảng:", data);
                setBooks([]); // Gán mảng rỗng nếu dữ liệu không hợp lệ
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]); // Gán mảng rỗng nếu xảy ra lỗi
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    // Xử lý khi click "Sửa"
    const handleEditBook = (book) => {
        setNewBook({
            id: book.id,
            title: book.title,
            author: book.author,
            publisher_id: book.publisher_id,
            publication_date: book.publication_date,
            category_id: book.category_id,
            language: book.language,
            pages: book.pages,
            available_quantity: book.available_quantity,
            description: book.description,
            image: book.image,
        });
    };


    const handleReset = () => {
        setNewBook({
            id: null,
            title: "",
            author: "",
            publisher_id: "",
            publication_date: "",
            category_id: "",
            language: "",
            pages: "",
            available_quantity: "",
            description: "",
            image: null,
        });
    };

    if (loading) return <p>Loading books...</p>;

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
                    Quản Lý Thông Tin Sách
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
                        <span className="text-white text-2xl">📚</span>
                    </div>
                    <h3 className="ml-4 text-3xl font-bold text-gray-800">
                        THÊM HOẶC CẬP NHẬT THÔNG TIN SÁCH
                    </h3>
                </div>


                <div className="grid grid-cols-2 gap-6">
                    {/* Hiển thị ô ID khi đang chỉnh sửa (có ID) */}
                    {newBook.id && (
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
                                    value={newBook.id}
                                    readOnly
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="absolute left-4 top-3 text-gray-500 text-xl">📘</div>
                            </div>
                        </div>
                    )}

                    {/* Render các trường khác */}
                    {Object.keys(newBook)
                        .filter((field) => field !== "id") // Bỏ qua trường ID
                        .map((field) => (
                            <div key={field} className="relative">
                                <label
                                    htmlFor={field}
                                    className="block text-sm font-medium text-gray-600 mb-2"
                                >
                                    {field === "title"
                                        ? "Tên sách"
                                        : field === "author"
                                            ? "Tác giả"
                                            : field === "publisher_id"
                                                ? "Nhà xuất bản"
                                                : field === "publication_date"
                                                    ? "Ngày xuất bản"
                                                    : field === "category_id"
                                                        ? "Thể loại"
                                                        : field === "language"
                                                            ? "Ngôn ngữ"
                                                            : field === "pages"
                                                                ? "Số trang"
                                                                : field === "available_quantity"
                                                                    ? "Số lượng còn"
                                                                    : field === "description"
                                                                        ? "Mô tả"
                                                                        : field === "image"
                                                                            ? "Hình ảnh"
                                                                            : ""}
                                </label>
                                <div className="relative">
                                    {field === "category_id" || field === "publisher_id" ? (
                                        <select
                                            id={field}
                                            name={field}
                                            value={newBook[field]}
                                            onChange={(e) =>
                                                setNewBook({ ...newBook, [field]: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">
                                                {field === "category_id"
                                                    ? "Chọn thể loại"
                                                    : "Chọn nhà xuất bản"}
                                            </option>
                                            {(field === "category_id" ? categories : publishers).map(
                                                (option) => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name} (ID: {option.id})
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    ) : field === "description" ? (
                                        <textarea
                                            id={field}
                                            name={field}
                                            value={newBook[field]}
                                            onChange={(e) =>
                                                setNewBook({ ...newBook, [field]: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập mô tả sách"
                                        />
                                    ) : field === "image" ? (
                                        <input
                                            type="file"
                                            id={field}
                                            name={field}
                                            onChange={handleFileChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        <input
                                            type={
                                                field === "publication_date"
                                                    ? "date"
                                                    : field === "pages" ||
                                                        field === "available_quantity"
                                                        ? "number"
                                                        : "text"
                                            }
                                            id={field}
                                            name={field}
                                            value={newBook[field]}
                                            onChange={(e) =>
                                                setNewBook({ ...newBook, [field]: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                                            placeholder={
                                                field === "publication_date"
                                                    ? "Nhập ngày xuất bản"
                                                    : field === "title"
                                                        ? "Nhập tên sách"
                                                        : field === "author"
                                                            ? "Nhập tên tác giả"
                                                            : field === "language"
                                                                ? "Nhập ngôn ngữ"
                                                                : field === "pages"
                                                                    ? "Nhập số trang"
                                                                    : field === "available_quantity"
                                                                        ? "Nhập số lượng còn"
                                                                        : ""
                                            }
                                        />
                                    )}
                                    <div className="absolute left-4 top-3 text-gray-500 text-xl">
                                        {field === "title"
                                            ? "📚"
                                            : field === "author"
                                                ? "✍️"
                                                : field === "publisher_id"
                                                    ? "🏢"
                                                    : field === "publication_date"
                                                        ? "📅"
                                                        : field === "category_id"
                                                            ? "📂"
                                                            : field === "language"
                                                                ? "🗣️"
                                                                : field === "pages"
                                                                    ? "📄"
                                                                    : field === "available_quantity"
                                                                        ? "🔢"
                                                                        : field === "description"
                                                                            ? "📝"
                                                                            : field === "image"
                                                                                ? "📷"
                                                                                : ""}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>


                <div className="mt-6 flex justify-center space-x-4">
                    {/* Nút Thêm */}
                    {!newBook.id && (
                        <button
                            onClick={handleAddBook}
                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Thêm
                        </button>
                    )}

                    {/* Nút Cập nhật */}
                    {newBook.id && (
                        <button
                            onClick={handleUpdateBook}
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
                            {[
                                "ID",
                                "Ảnh",
                                "Tên sách",
                                "Tác giả",
                                "Nhà xuất bản",
                                "Ngày xuất bản",
                                "Thể loại",
                                "Ngôn ngữ",
                                "Số trang",
                                "Số lượng còn",
                                "Mô tả",
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
                        {books.map((book, index) => (
                            <tr
                                key={book.id}
                                className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3 border-r border-gray-200">{book.id}</td>
                                <td className="px-6 py-3 border-r border-gray-200">
                                    <div className="w-20 h-28 overflow-hidden flex items-center justify-center bg-gray-100 rounded-lg">
                                        <img
                                            src={book.image}
                                            alt="Book"
                                            className="w-full h-full object-contain"
                                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {book.title}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {book.author}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {publishers.find((publisher) => publisher.id === book.publisher_id)
                                        ?.name || "Không xác định"}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {book.publication_date}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {categories.find((category) => category.id === book.category_id)
                                        ?.name || "Không xác định"}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                                    {book.language}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200">{book.pages}</td>
                                <td className="px-6 py-3 border-r border-gray-200">
                                    {book.available_quantity}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 break-words max-w-lg">
                                    {book.description}
                                </td>
                                <td className="px-6 py-3 border-gray-200 flex space-x-2">
                                    {/* Nút Sửa */}
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="flex items-center justify-center px-4 py-2 shadow border border-gray-300 rounded-full text-black hover:bg-gray-300 transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Sửa
                                    </button>
                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
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

export default Books;
