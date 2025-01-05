import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BorrowList = () => {
    const [borrowList, setBorrowList] = useState([]);
    const [bookConditions, setBookConditions] = useState([]);
    const [fineFees, setFineFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", visible: false });

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
                        return { ...item, timeRemaining: null, isDisabled: item.status_user !== "Chờ nhận sách" };
                    }

                    const approvedTime = new Date(item.approved_at);
                    const currentTime = new Date();
                    const timeElapsed = Math.floor((currentTime - approvedTime) / 1000);
                    const timeRemaining = Math.max(0, 86400 - timeElapsed);

                    return {
                        ...item,
                        timeRemaining,
                        isDisabled: timeRemaining === 0,
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
        <div className="p-8 bg-gray-100 min-h-screen">
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
            <div className="relative bg-gradient-to-r from-gray-100 to-white p-10 rounded-xl shadow-2xl">
                <h2 className="text-center text-6xl font-extrabold text-gray-800 tracking-wider uppercase mb-4">
                    Quản Lý trạng thái đơn mượn
                </h2>
                <div className="w-40 h-2 bg-black mx-auto rounded-full"></div>
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
                        {borrowList.map((item, index) => (
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
                                                    : "Hết thời gian"
                                                : ""}
                                        </div>
                                    </div>
                                </td>


                                <td className="px-6 py-3 border-r border-gray-200 text-center">
                                    <select
                                        value={item.book_condition_id || ""}
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
                                        className="flex items-center px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        onClick={() =>
                                            handleSave(item.id, item.status_user, item.book_condition_id, item.fine_fee_id)
                                        }
                                    >
                                        <FontAwesomeIcon icon="save" className="mr-2 text-white" />
                                        Lưu
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

export default BorrowList;
