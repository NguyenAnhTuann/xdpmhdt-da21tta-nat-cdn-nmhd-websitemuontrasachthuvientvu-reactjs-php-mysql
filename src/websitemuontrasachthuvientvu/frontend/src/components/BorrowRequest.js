import React, { useContext, useState } from "react";
import { BorrowContext } from "./BorrowContext";
import { useNavigate } from "react-router-dom";

const BorrowRequest = () => {
    const { borrowList, clearBorrowList, setBorrowList } = useContext(BorrowContext);
    const [returnDate, setReturnDate] = useState("");
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

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
        setToast({ message, type }); // Thiết lập nội dung và loại thông báo
        setTimeout(() => setToast(null), 3000); // Tự động ẩn sau 4 giây
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


    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            {/* Toast Notification */}
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
            <div className="flex items-center justify-start w-full mb-4">
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
            {borrowList.length > 0 ? (
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                    {/* Bảng danh sách sách */}
                    <table className="w-full border-collapse overflow-hidden rounded-lg">
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {borrowList.map((book, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-16 h-24 object-cover rounded-md shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4">{book.title}</td>
                                    <td className="px-6 py-4">{book.author}</td>
                                    <td className="px-6 py-4">{book.publication_date}</td>
                                    <td className="px-6 py-4">{book.pages}</td>
                                    <td className="px-6 py-4">{book.language}</td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="number"
                                            min="1"
                                            value={book.quantity || 1}
                                            onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                                            className="w-16 border border-gray-300 rounded-md text-center shadow-sm focus:ring focus:ring-blue-500"
                                        />
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Nút gửi yêu cầu */}
                    <button
                        onClick={handleSendRequest}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
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
    );

};

export default BorrowRequest;
