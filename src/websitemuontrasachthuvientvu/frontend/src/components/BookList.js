import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTitle, setSearchTitle] = useState(""); // Tìm kiếm tên sách
    const [searchAuthor, setSearchAuthor] = useState(""); // Tìm kiếm tác giả
    const [searchPublisher, setSearchPublisher] = useState(""); // Tìm kiếm nhà xuất bản
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const booksPerPage = 10; // Số lượng sách mỗi trang

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(
                    `http://localhost/websitemuontrasachthuvientvu/backend/get_books.php${selectedCategory ? `?category_id=${selectedCategory}` : ""
                    }`
                );
                const data = await response.json();

                // Kiểm tra nếu data không phải là mảng
                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    console.error("Dữ liệu trả về không phải là mảng:", data);
                    setBooks([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sách:", error);
                setBooks([]); // Gán books thành mảng rỗng nếu có lỗi
            }
        };

        fetchBooks();
    }, [selectedCategory]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost/websitemuontrasachthuvientvu/backend/get_categories.php"
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thể loại:", error);
            }
        };

        fetchCategories();
    }, []);


    // Lọc sách dựa trên tìm kiếm trước khi áp dụng phân trang
    const filteredBooks = books.filter((book) => {
        const titleMatch = book.title.toLowerCase().includes(searchTitle.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(searchAuthor.toLowerCase());
        const publisherMatch = book.publisher_name?.toLowerCase().includes(searchPublisher.toLowerCase());
        return titleMatch && authorMatch && publisherMatch;
    });

    // Tính toán sách hiển thị theo trang
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Tính tổng số trang dựa trên danh sách đã lọc
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);


    // Xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tạo danh sách nút phân trang
    const pagination = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage > 1) pages.push("prev");
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (currentPage < totalPages) pages.push("next");

        return pages;
    };


    // Tô vàng từ khóa tìm kiếm trong nội dung
    const highlightText = (text, highlight) => {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, "gi");
        return text.split(regex).map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-300">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    // Nút Reset: Xóa tất cả giá trị trong ô tìm kiếm
    const handleReset = () => {
        setSearchTitle("");
        setSearchAuthor("");
        setSearchPublisher("");
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex">
            {/* Danh sách thể loại bên trái */}
            <aside className="w-1/4 bg-white bg-opacity-90 shadow-3xl rounded-3xl p-10 mr-12 border border-gray-300 backdrop-blur-lg">
                <ul className="space-y-8">
                    {/* Nút "Tất cả sách" */}
                    <li>
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setCurrentPage(1);
                            }}
                            className={`group w-full text-left px-8 py-5 rounded-full transition-all duration-500 font-semibold text-xl flex items-center gap-5 shadow-lg transform hover:scale-105 ${selectedCategory === null
                                ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-2xl"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-3xl group-hover:animate-bounce">📖</span>
                            <span className="group-hover:text-gray-800">Tất cả sách</span>
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setCurrentPage(1);
                                }}
                                className={`group w-full text-left px-8 py-5 rounded-full transition-all duration-500 font-semibold text-xl flex items-center gap-5 shadow-lg transform hover:scale-105 ${selectedCategory === category.id
                                    ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-2xl"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category.icon && (
                                    <span className="text-3xl group-hover:animate-bounce">{category.icon}</span>
                                )}
                                <span className="group-hover:text-gray-800">{category.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>


            {/* Nội dung chính */}
            <main className="flex-1 bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10 border border-gray-200 backdrop-blur-lg">
                <h2 className="text-5xl font-extrabold mb-8 text-center text-gray-900 uppercase tracking-tighter">
                    📚 MỜI CÁC BẠN THAM KHẢO SÁCH CÓ TẠI THƯ VIỆN
                </h2>

                {/* Ô tìm kiếm */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                    <input
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="🔍 Tìm kiếm tên sách..."
                        className="w-full px-6 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                    <input
                        type="text"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                        placeholder="✍️ Tìm kiếm tác giả..."
                        className="w-full px-6 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                    <input
                        type="text"
                        value={searchPublisher}
                        onChange={(e) => setSearchPublisher(e.target.value)}
                        placeholder="🏢 Tìm kiếm nhà xuất bản..."
                        className="w-full px-6 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                    <button
                        onClick={handleReset}
                        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        🔄 Đặt lại
                    </button>
                </div>

                {/* Danh sách sách */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentBooks
                        .filter((book) => {
                            const titleMatch = book.title
                                .toLowerCase()
                                .includes(searchTitle.toLowerCase());
                            const authorMatch = book.author
                                .toLowerCase()
                                .includes(searchAuthor.toLowerCase());
                            const publisherMatch = book.publisher_name
                                ?.toLowerCase()
                                .includes(searchPublisher.toLowerCase());
                            return titleMatch && authorMatch && publisherMatch;
                        })
                        .map((book) => (
                            <div
                                key={book.id}
                                className="relative bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2"
                            >
                                {/* Hình ảnh sách */}
                                <div className="flex justify-center items-center p-4 bg-gray-100">
                                    <div className="w-40 aspect-[3/4] overflow-hidden rounded-xl shadow-md">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute top-3 left-3 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-lg shadow">
                                        {book.category_name || "Không có thể loại"}
                                    </div>
                                </div>

                                {/* Nội dung sách */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        {highlightText(book.title, searchTitle)}
                                    </h3>
                                    <div className="border-t border-gray-300 pt-3 space-y-1 text-gray-600">
                                        <p>
                                            <strong>Tác giả:</strong>{" "}
                                            {highlightText(book.author, searchAuthor)}
                                        </p>
                                        <p>
                                            <strong>Nhà xuất bản:</strong>{" "}
                                            {highlightText(
                                                book.publisher_name || "Không xác định",
                                                searchPublisher
                                            )}
                                        </p>
                                        <p>
                                            <strong>Ngày xuất bản:</strong> {book.publication_date}
                                        </p>
                                    </div>

                                    {/* Nút hành động */}
                                    <button
                                        onClick={() => navigate(`/book/${book.id}`)}
                                        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-xl"
                                    >
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                
                {/* Phân trang */}
                <div className="mt-8 flex justify-center items-center space-x-2">
                    {pagination().map((page, index) =>
                        page === "prev" ? (
                            <button
                                key={index}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Trước
                            </button>
                        ) : page === "next" ? (
                            <button
                                key={index}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Sau
                            </button>
                        ) : (
                            <button
                                key={index}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookList;
