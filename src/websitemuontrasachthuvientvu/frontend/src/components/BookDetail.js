import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BorrowContext } from "./BorrowContext";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
    const navigate = useNavigate();
    const { addToBorrowList } = useContext(BorrowContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const fetchBookDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost/websitemuontrasachthuvientvu/backend/get_book_detail.php?id=${id}`
                );
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sách:", error);
            }
        };

        fetchBookDetail();
    }, [id]);

    const handleBorrowBook = () => {
        if (book) {
            addToBorrowList(book); // Thêm sách vào danh sách mượn
            setIsModalOpen(true); // Mở modal thông báo
        }
    };

    const formatDateToDDMMYYYY = (date) => {
        if (!date) return "Không xác định";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };


    return (
        <div
            className="p-10 min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1736540786/Logotimdothatlac_15_dynqps.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {book ? (
                <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full overflow-hidden border border-gray-300">
                    {/* Header: Ảnh và thông tin chính */}
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {/* Ảnh bìa */}
                        <div className="md:w-1/3 bg-gradient-to-b from-gray-100 to-gray-200 p-10 flex justify-center items-center">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full aspect-[2/3] rounded-2xl shadow-lg object-cover transform transition-transform duration-300 hover:scale-110"
                            />
                        </div>

                        {/* Thông tin sách */}
                        <div className="md:w-2/3 p-12">
                            <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-snug tracking-wide">
                                {book.title}
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-gray-700 text-lg">
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-blue-500">👤</span>
                                    <span>
                                        <strong className="font-semibold">Tác giả:</strong> {book.author}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-indigo-500">🏢</span>
                                    <span>
                                        <strong className="font-semibold">Nhà xuất bản:</strong>{" "}
                                        {book.publisher_name || "Không xác định"}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-green-500">📚</span>
                                    <span>
                                        <strong className="font-semibold">Thể loại:</strong>{" "}
                                        {book.category_name || "Không xác định"}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-yellow-500">📅</span>
                                    <span>
                                        <strong className="font-semibold">Ngày xuất bản:</strong>{" "}
                                        {formatDateToDDMMYYYY(book.publication_date)}
                                    </span>
                                </p>

                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-red-500">📄</span>
                                    <span>
                                        <strong className="font-semibold">Số trang:</strong> {book.pages}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-purple-500">🌍</span>
                                    <span>
                                        <strong className="font-semibold">Ngôn ngữ:</strong>{" "}
                                        {book.language}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-xl text-teal-500">✔️</span>
                                    <span>
                                        <strong className="font-semibold">Số lượng hiện có:</strong>{" "}
                                        {book.available_quantity}
                                    </span>
                                </p>
                            </div>
                            <div className="flex gap-6 mt-8">
                                <button
                                    onClick={handleBorrowBook}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <span>📥</span>
                                    <span>Mượn sách</span>
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex-1 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <span>🔙</span>
                                    <span>Quay về trang chủ</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mô tả sách */}
                    <div className="p-12 bg-gray-50 border-t border-gray-300">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>📝</span>
                            <span>Mô tả sách</span>
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {book.description}
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg font-medium">
                    Đang tải thông tin sách...
                </p>
            )}

            {/* Modal thông báo */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-1/3">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎉 Thành công!</h3>
                        <p className="text-gray-700 mb-6">
                            Sách <strong>{book.title}</strong> đã được thêm vào đơn yêu cầu mượn!
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
