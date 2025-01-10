import React, { useEffect, useState } from "react";
import { LuSaveAll } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const BorrowList = () => {
    const [borrowList, setBorrowList] = useState([]);
    const [bookConditions, setBookConditions] = useState([]);
    const [fineFees, setFineFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", visible: false });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalAllBorrowRequests = borrowList.length;


    const filteredBorrowList = borrowList.filter((item) =>
        String(item.borrow_request_id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatFineFee = (fee) => {
        if (fee === null || fee === undefined) return "N/A";
        return new Intl.NumberFormat("vi-VN").format(fee);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBorrowList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBorrowList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const showNotification = (message) => {
        setNotification({ message, visible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false });
    };

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [borrowRes, bookConditionRes, fineFeeRes] = await Promise.all([
                    fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_list/get_approved_requests.php"),
                    fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_list/get_book_condition.php"),
                    fetch("http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_list/get_fine_fee.php"),
                ]);

                const borrowData = await borrowRes.json();
                const bookConditionData = await bookConditionRes.json();
                const fineFeeData = await fineFeeRes.json();

                if (borrowData.status === "success") setBorrowList(borrowData.data);
                if (bookConditionData.status === "success") setBookConditions(bookConditionData.conditions);
                if (fineFeeData.status === "success") setFineFees(fineFeeData.fees);

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setBorrowList((prevList) =>
                prevList.map((item) => {
                    if (item.status_user !== "Chờ nhận sách" || !item.approved_at) {
                        return { ...item, timeRemaining: null, isDisabled: false };
                    }

                    const approvedTime = new Date(item.approved_at);
                    const currentTime = new Date();
                    const timeElapsed = Math.floor((currentTime - approvedTime) / 1000);
                    const timeRemaining = Math.max(0, 86400 - timeElapsed);

                    return {
                        ...item,
                        timeRemaining,
                        isDisabled: timeRemaining === 0 && item.status_user === "Chờ nhận sách",
                    };
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);




    const handleSave = async (id, statusUser, bookConditionId, fineFeeId) => {
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_list/update_request.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id,
                        status_user: statusUser,
                        book_condition_id: bookConditionId,
                        fine_fee_id: fineFeeId,
                    }),
                }
            );

            const data = await response.json();
            if (data.status === "success") {
                showNotification("Cập nhật thành công!");
            } else {
                showNotification("Cập nhật thất bại: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="container mx-auto px-8 min-h-screen">
            {notification.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-[28rem] max-w-full">
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
                        <div className="px-6 py-2 text-center text-gray-700 text-base font-medium">
                            {notification.message}
                        </div>
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
                <h2 className="text-center text-6xl font-extrabold text-gray-800 tracking-wider uppercase mb-4">
                    Quản Lý trạng thái đơn mượn
                </h2>
            </div>
            <div className="mb-6 flex flex-wrap gap-6 items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="🔍 Tìm kiếm theo ID đơn mượn..."
                    className="w-[400px] px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                />
                <button
                    onClick={() => setSearchTerm("")}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    🔄 Đặt lại
                </button>
            </div>
            <div className="mb-6 flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                    <span>Tổng số đơn mượn: {totalAllBorrowRequests}</span>
                </div>
            </div>

            <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg p-4">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                        <tr>
                            {["ID", "ID Đơn Mượn", "Trạng Thái", "Tình Trạng Sách", "Phí Phạt", "Ngày Trả", "Hành Động"].map((header, index) => (
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
                        {currentItems.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3 border-r border-gray-200 text-center">{item.id}</td>
                                <td className="px-6 py-3 border-r border-gray-200 text-center">{item.borrow_request_id}</td>
                                <td className="px-6 py-3 border-r border-gray-200 text-center">
                                    <div>
                                        <select
                                            value={item.status_user}
                                            onChange={(e) => {
                                                item.status_user = e.target.value;
                                                setBorrowList([...borrowList]);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                                            disabled={item.isDisabled}
                                        >
                                            <option value="Chờ nhận sách">Chờ nhận sách</option>
                                            <option value="Đang mượn sách">Đang mượn sách</option>
                                            <option value="Đã trả sách">Đã trả sách</option>
                                        </select>
                                        <div
                                            className={`mt-2 px-3 py-1 text-sm font-bold text-center rounded-lg ${item.timeRemaining > 0 ? "bg-red-600 text-white" : " text-black"
                                                }`}
                                        >
                                            {item.timeRemaining !== null
                                                ? item.timeRemaining > 0
                                                    ? formatTime(item.timeRemaining)
                                                    : "Quá hạn mượn sách"
                                                : ""}
                                        </div>
                                    </div>
                                </td>


                                <td className="px-6 py-3 border-r border-gray-200 text-center">
                                    <select
                                        value={item.fine_fee_id ? formatFineFee(item.fine_fee_id) + " VND" : "N/A"}
                                        onChange={(e) => {
                                            item.book_condition_id = e.target.value;
                                            setBorrowList([...borrowList]);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">Chọn tình trạng</option>
                                        {bookConditions.map((condition) => (
                                            <option key={condition.id} value={condition.id}>
                                                {condition.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="px-6 py-3 border-r border-gray-200 text-center">
                                    <select
                                        value={item.fine_fee_id || ""}
                                        onChange={(e) => {
                                            item.fine_fee_id = e.target.value;
                                            setBorrowList([...borrowList]);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">Chọn phí phạt</option>
                                        {fineFees.map((fee) => (
                                            <option key={fee.id} value={fee.id}>
                                                {fee.fee} VND
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 text-center">
                                    {item.return_day || "N/A"}
                                </td>
                                <td className="px-6 py-3 border-r border-gray-200 flex justify-center items-center space-x-2">
                                    <button
                                        className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-200 py-2 px-4 rounded-3xl shadow-sm"
                                        onClick={() =>
                                            handleSave(item.id, item.status_user, item.book_condition_id, item.fine_fee_id)
                                        }
                                    >
                                        <LuSaveAll icon="save" className="text-black" />
                                        Lưu
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
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded ${page === currentPage ? "border-2 rounded-2xl bg-red-500 text-white" : " hover:bg-gray-200 border-2 rounded-2xl"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BorrowList;
