import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchPublisher, setSearchPublisher] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
    const [showCategories, setShowCategories] = useState(false);

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "Không xác định"; // Trường hợp ngày không hợp lệ
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const fetchBooks = async () => {
            try {
                const response = await fetch(
                    `http://localhost/websitemuontrasachthuvientvu/backend/get_books.php${selectedCategory ? `?category_id=${selectedCategory}` : ""
                    }`
                );
                const data = await response.json();

                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    console.error("Dữ liệu trả về không phải là mảng:", data);
                    setBooks([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sách:", error);
                setBooks([]);
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


    const filteredBooks = books.filter((book) => {
        const titleMatch = book.title.toLowerCase().includes(searchTitle.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(searchAuthor.toLowerCase());
        const publisherMatch = book.publisher_name?.toLowerCase().includes(searchPublisher.toLowerCase());
        return titleMatch && authorMatch && publisherMatch;
    });

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

    const handleReset = () => {
        setSearchTitle("");
        setSearchAuthor("");
        setSearchPublisher("");
    };

    const slideUrls = [
        "https://dlcorp.com.vn/wp-content/uploads/2020/12/book-library-1509787712731_2.jpg",
        "https://trangtuyensinh.com.vn/wp-content/uploads/2022/02/thumbnail-nganh-thong-tin-thu-vien-1608128640.jpg",
        "http://svhttdl.phutho.gov.vn/images/Tin%20tuc/2019/4/2019-4-9-3.jpg",
        "https://media.istockphoto.com/id/507071472/vi/anh/ch%E1%BB%93ng-s%C3%A1ch-tr%C3%AAn-k%E1%BB%87-gai-s%C3%A1ch-nhi%E1%BB%81u-m%C3%A0u.webp?s=1024x1024&w=is&k=20&c=LEpbibawkeOKl0po8kw4gLQ0OBb7RfvHl25uA_yyJx8=",
        "https://cf.shopee.vn/file/02980e084d8799b3b49c3fded622442b",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slideUrls.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slideUrls.length]);

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slideUrls.length) % slideUrls.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slideUrls.length);
    };

    return (
        <div
            className="bg-contain bg-no-repeat bg-center min-h-screen flex justify-center bg-white shadow-sm transition duration-300"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1736540786/Logotimdothatlac_15_dynqps.png')`,
            }}
        >
            <div className="container mx-auto px-8">
                <div className="relative w-full max-w-4xl mx-auto mb-6 mt-4">
                    <div className="overflow-hidden rounded-lg shadow-lg w-full h-64 flex items-center justify-center bg-gray-100 relative">
                        {slideUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Slide ${index + 1}`}
                                className={`absolute w-full h-full object-contain transition-transform duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                                    }`}
                                style={{
                                    transform: index < currentSlide ? 'translateX(-100%)' : index > currentSlide ? 'translateX(100%)' : 'translateX(0)',
                                }}
                            />
                        ))}
                    </div>
                    {/* Nút điều chỉnh */}
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 text-white p-2 rounded-full shadow hover:bg-gray-500 transition"
                        onClick={goToPreviousSlide}
                    >
                        ❮
                    </button>
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 text-white p-2 rounded-full shadow hover:bg-gray-500 transition"
                        onClick={goToNextSlide}
                    >
                        ❯
                    </button>
                    {/* Chấm hiển thị */}
                    <div className="flex justify-center mt-2">
                        {slideUrls.map((_, index) => (
                            <span
                                key={index}
                                className={`mx-1 w-3 h-3 rounded-full ${index === currentSlide ? 'bg-gray-500' : 'bg-gray-300'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setCurrentSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
                {/* Danh sách thể loại bên trái */}
                <div
                    className="relative flex items-center mt-4"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    {/* Nút hiển thị tên thể loại */}
                    <button
                        className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold text-lg flex items-center gap-3 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-blue-800"
                    >
                        <span className="text-sm">
                            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Tất cả sách"}
                        </span>
                        <span className="text-2xl group-hover:animate-bounce">📖</span>
                    </button>

                    {/* Bảng danh sách thể loại */}
                    {showCategories && (
                        <div className="absolute top-12 left-0 right-0 w-full bg-white shadow-xl rounded-lg border border-gray-300 z-20">
                            {/* Header bảng */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800">Danh sách thể loại</h3>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setCurrentPage(1);
                                        setShowCategories(false);
                                    }}
                                    className="text-blue-500 font-semibold"
                                >
                                    Tất cả sách
                                </button>
                            </div>

                            {/* Danh sách thể loại */}
                            <div className="grid grid-cols-4 gap-4 p-6">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setCurrentPage(1);
                                            setShowCategories(false);
                                        }}
                                        className="text-left px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 text-gray-800 font-medium"
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* Nội dung chính */}
                <main className="mr-8 flex-1 bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10 border border-gray-200 backdrop-blur-lg mt-6">
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
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            {highlightText(book.title, searchTitle)}
                                        </h3>
                                        <div className="border-t border-gray-300 pt-3 space-y-1 text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <span>✍️</span> {/* Biểu tượng tác giả */}
                                                <strong>Tác giả:</strong> {highlightText(book.author, searchAuthor)}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span>🏢</span> {/* Biểu tượng nhà xuất bản */}
                                                <strong>Nhà xuất bản:</strong> {highlightText(book.publisher_name || "Không xác định", searchPublisher)}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span>📅</span> {/* Biểu tượng ngày */}
                                                <strong>Ngày xuất bản:</strong> {formatDate(book.publication_date)}
                                            </p>
                                        </div>

                                        {/* Nút hành động */}
                                        <button
                                            onClick={() => navigate(`/book/${book.id}`)}
                                            className="mt-4 flex gap-1 items-center text-black py-1 px-3 rounded-2xl bg-gradient-to-r hover:from-blue-300 hover:to-blue-500 border-2 hover:scale-105"
                                        >
                                            <HiEye className="w-5 h-5" />
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
                                    onClick={() => {
                                        handlePageChange(currentPage - 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-4 py-2 bg-red-500 rounded-2xl text-white hover:bg-red-700"
                                >
                                    Trước
                                </button>
                            ) : page === "next" ? (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handlePageChange(currentPage + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-4 py-2 bg-red-500 rounded-2xl text-white hover:bg-red-700"
                                >
                                    Sau
                                </button>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handlePageChange(page);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`px-4 py-2 rounded ${page === currentPage ? "border-2 rounded-2xl bg-red-500 text-white" : " hover:bg-gray-200 border-2 rounded-2xl"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default BookList;
