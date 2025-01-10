import React, { useContext, useState } from "react";
import { BorrowContext } from "./BorrowContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const BorrowRequest = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    const { borrowList, clearBorrowList, setBorrowList } = useContext(BorrowContext);
    const [returnDate, setReturnDate] = useState("");
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const isReturnDateValid = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        return selectedDate >= today;
    };

    const handleQuantityChange = (bookId, quantity) => {
        setBorrowList((prevList) =>
            prevList.map((book) =>
                book.id === bookId ? { ...book, quantity: parseInt(quantity) || 1 } : book
            )
        );
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSendRequest = async () => {

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            showToast("Bạn cần đăng nhập để gửi yêu cầu mượn.", "error");
            return;
        }

        if (!returnDate) {
            showToast("Vui lòng chọn ngày trả sách!", "warning");
            return;
        }

        if (!isReturnDateValid(returnDate)) {
            showToast(
                "Ngày trả không hợp lệ! Vui lòng chọn ngày trả lớn hơn hoặc bằng ngày hôm nay.",
                "error"
            );
            return;
        }

        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/create_borrow_request.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: user.id,
                        borrow_list: borrowList,
                        return_date: returnDate,
                    }),
                }
            );

            const data = await response.json();
            if (data.status === "success") {
                clearBorrowList();
                showToast("Yêu cầu mượn thành công!", "success");
            } else {
                showToast(data.message || "Đã xảy ra lỗi, vui lòng thử lại.", "error");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu mượn:", error);
            showToast("Đã xảy ra lỗi, vui lòng thử lại.", "error");
        }
    };

    const handleRemoveBook = (bookId) => {
        setBorrowList((prevList) => prevList.filter((book) => book.id !== bookId));
        showToast("Sách đã được xóa khỏi đơn yêu cầu mượn.", "success");
    };


    return (
        <div
            className="bg-gray-50 min-h-screen"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1736540786/Logotimdothatlac_15_dynqps.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="mt-6 p-10 bg-white max-w-7xl mx-auto border-2 rounded-2xl shadow-xl">
                {/* Nội dung form */}
                {toast && (
                    <div
                        className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg text-white ${toast.type === "success"
                                ? "bg-green-500"
                                : toast.type === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                    >
                        {toast.message}
                    </div>
                )}
                <div className="flex items-center justify-start w-full mb-4 mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-gray-300 text-black font-semibold border-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        ← Quay về Trang Chủ
                    </button>
                </div>
                <h2 className="text-4xl font-extrabold mb-6 text-gray-800 flex items-center gap-3">
                    📋 Đơn Yêu Cầu Mượn
                </h2>
                {/* Form hiển thị */}
                {borrowList.length > 0 ? (
                    <div>
                        {/* Bảng */}
                        <table className=" mb-4 w-full border-collapse overflow-hidden rounded-lg px-4">
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 text-lg">
                                    <th className="px-6 py-4 text-left">#</th>
                                    <th className="px-6 py-4 text-left">Hình Ảnh</th>
                                    <th className="px-6 py-4 text-left">Tên Sách</th>
                                    <th className="px-6 py-4 text-left">Tác Giả</th>
                                    <th className="px-6 py-4 text-left">Ngày Xuất Bản</th>
                                    <th className="px-6 py-4 text-left">Số Trang</th>
                                    <th className="px-6 py-4 text-left">Ngôn Ngữ</th>
                                    <th className="px-6 py-4 text-center">Số Lượng</th>
                                    <th className="px-6 py-4 text-center">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {borrowList.map((book, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-16 h-24 object-cover rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(book.publication_date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.pages}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.language}</td>
                                        <td className="text-center align-middle">
                                            <div className="inline-flex items-center justify-center space-x-1 bg-gray-100 p-2 rounded-lg shadow-md">
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(book.id, Math.max(1, (book.quantity || 1) - 1))}
                                                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={book.quantity || 1}
                                                    onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                                                    className="w-16 h-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(book.id, (book.quantity || 1) + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center align-middle">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => handleRemoveBook(book.id)}
                                                    className="w-auto h-10 flex items-center justify-center px-4 border border-gray-400 hover:bg-gray-200 hover:scale-110 rounded-2xl hover:border-gray-400 text-black hover:text-black focus:outline-none focus:ring focus:ring-red-300"
                                                >
                                                    <FiTrash2 className="w-5 h-5 mr-2" />
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Ngày trả sách */}
                        <div className="mt-8">
                            <label
                                htmlFor="returnDate"
                                className="block text-lg font-semibold text-gray-700 mb-2"
                            >
                                🗓️ Ngày trả sách
                            </label>
                            <input
                                type="date"
                                id="returnDate"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-40 items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            onClick={handleSendRequest}
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg"
                        >
                            🚀 Gửi Yêu Cầu Mượn
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg font-medium">
                        Không có sách nào trong đơn yêu cầu mượn.
                    </p>
                )}
            </div>
        </div>

    );

};

export default BorrowRequest;
