import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const BorrowRequests = () => {
    const [borrowRequests, setBorrowRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("Chờ xử lý");
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", visible: false });

    const showNotification = (message) => {
        setNotification({ message, visible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", visible: false });
    };

    // Fetch danh sách đơn mượn
    const fetchBorrowRequests = useCallback(async () => {
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_requests/get_borrow_requests.php"
            );
            const data = await response.json();

            if (data.status === "success") {
                const groupedRequests = data.requests.reduce((acc, request) => {
                    // Nhóm các đơn mượn theo created_at
                    const createdAt = request.created_at;
                    if (!acc[createdAt]) {
                        acc[createdAt] = {
                            id: request.request_id, // Giữ ID đơn mượn
                            created_at: createdAt,
                            return_date: request.return_date,
                            user_id: request.user_id,
                            status: request.status,
                            books: [],
                            user: {
                                name: request.user_name || "Không có tên",
                                date: request.user_date || "Không có ngày sinh",
                                class: request.user_class || "Không có lớp",
                                major: request.user_major || "Không có ngành",
                                faculty: request.user_faculty || "Không có khoa",
                                school: request.user_school || "Không có trường",
                                phone: request.user_phone || "Không có SĐT",
                                email: request.user_email || "Không có email",
                                address: request.user_address || "Không có địa chỉ",
                            },
                        };
                    }
                    acc[createdAt].books.push({
                        id: request.book_id,
                        image: request.book_image,
                        title: request.book_title,
                        author: request.book_author,
                        publisher_id: request.book_publisher_id,
                        publication_date: request.book_publication_date,
                        category_id: request.book_category_id,
                        quantity: request.quantity,
                        request_id: request.request_id, // Gắn ID đơn mượn vào sách
                    });
                    return acc;
                }, {});

                const sortedRequests = Object.values(groupedRequests).sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at) // Sắp xếp theo thời gian
                );

                setBorrowRequests(sortedRequests);
                setFilteredRequests(sortedRequests.filter(req => req.status === selectedStatus));
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách đơn mượn:", error);
        } finally {
            setLoading(false);
        }
    }, [selectedStatus]); // Thêm dependency là `selectedStatus`

    // Thay đổi trạng thái đơn mượn
    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/admin/borrow_requests/update_borrow_request_status.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        request_id: requestId,
                        status: newStatus,
                    }),
                }
            );

            const data = await response.json();
            if (data.status === "success") {
                showNotification("Cập nhật trạng thái thành công!");
                fetchBorrowRequests();
            } else {
                showNotification(data.message || "Đã xảy ra lỗi, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            showNotification("Đã xảy ra lỗi, vui lòng thử lại.");
        }
    };

    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        setFilteredRequests(borrowRequests.filter(req => req.status === status));
    };

    useEffect(() => {
        fetchBorrowRequests();
    }, [fetchBorrowRequests]);

    useEffect(() => {
        setFilteredRequests(borrowRequests.filter(req => req.status === selectedStatus));
    }, [borrowRequests, selectedStatus]);

    if (loading) {
        return <div>Đang tải danh sách đơn mượn...</div>;
    }




    return (
        <div className="p-8 bg-gray-100 min-h-screen">
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
                    Quản Lý danh sách đơn yêu cầu mượn
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

            <div className="mt-8 flex justify-center space-x-6">
                <div className="mt-8 flex justify-center space-x-6 mb-10"> {/* Thêm `mb-10` hoặc một giá trị tương ứng */}
                    {/* Nút Chờ xử lý */}
                    <button
                        onClick={() => handleStatusFilter("Chờ xử lý")}
                        className={`flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all ${selectedStatus === "Chờ xử lý" ? "bg-blue-600 text-white shadow-lg" : ""}`}
                    >
                        <FontAwesomeIcon icon={faHourglassStart} className="mr-2" />
                        Đơn mượn chờ xử lý
                    </button>

                    {/* Nút Duyệt */}
                    <button
                        onClick={() => handleStatusFilter("Duyệt")}
                        className={`flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all ${selectedStatus === "Duyệt" ? "bg-green-600 text-white shadow-lg" : ""}`}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        Đơn mượn đã duyệt
                    </button>

                    {/* Nút Hủy */}
                    <button
                        onClick={() => handleStatusFilter("Hủy")}
                        className={`flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all ${selectedStatus === "Hủy" ? "bg-red-600 text-white shadow-lg" : ""}`}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                        Đơn mượn đã bị hủy vì quá hạn nhận sách
                    </button>
                </div>
            </div>



            {filteredRequests.length > 0 ? (
                filteredRequests.map((request, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 mb-6 rounded-lg shadow-md transition"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            {/* Thông tin đơn mượn */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Đơn mượn #{index + 1}</h3>
                                <div className="mt-2 text-gray-500">
                                    <p className="flex items-center text-sm">
                                        <span className="font-medium text-gray-700 mr-1">Ngày tạo:</span>
                                        <span className="text-gray-700">{request.created_at}</span>
                                    </p>
                                    <p className="flex items-center text-sm mt-1">
                                        <span className="font-medium text-gray-700 mr-1">Ngày trả:</span>
                                        <span className="text-gray-700">{request.return_date}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Trạng thái đơn mượn */}
                            <div className="flex items-center">
                                <span
                                    className={`px-6 py-2 text-sm font-semibold rounded-full shadow-md ${request.status === "Chờ xử lý"
                                        ? "bg-blue-100 text-blue-600"
                                        : request.status === "Duyệt"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {request.status}
                                </span>
                            </div>
                        </div>


                        {/* Actions */}
                        <div className="flex justify-start space-x-4 mt-4">
                            <button
                                onClick={() => handleStatusChange(request.id, "Chờ xử lý")}
                                className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                            >
                                <FontAwesomeIcon icon={faHourglassStart} className="mr-2 text-blue-500" />
                                Chờ xử lý
                            </button>
                            <button
                                onClick={() => handleStatusChange(request.id, "Duyệt")}
                                className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                            >
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                                Duyệt
                            </button>
                            <button
                                onClick={() => handleStatusChange(request.id, "Hủy")}
                                className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-300 transition-all"
                            >
                                <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-red-500" />
                                Hủy
                            </button>
                        </div>


                        <div className="mb-6">
                            {/* Thông tin người dùng */}
                            <div className="p-8 mb-6 bg-white shadow-lg rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    Thông tin người dùng mượn sách
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: "Họ tên", value: request.user.name },
                                        { label: "Ngày sinh", value: request.user.date },
                                        { label: "Lớp", value: request.user.class },
                                        { label: "Ngành", value: request.user.major },
                                        { label: "Khoa", value: request.user.faculty },
                                        { label: "Trường", value: request.user.school },
                                        { label: "Số điện thoại", value: request.user.phone },
                                        { label: "Email", value: request.user.email },
                                        { label: "Địa chỉ", value: request.user.address },
                                    ].map((info, index) => (
                                        <div key={index} className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-600">
                                                {info.label}
                                            </span>
                                            <span className="text-base text-gray-800 border-b border-gray-300 py-1">
                                                {info.value || "Không có dữ liệu"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Thông tin sách */}
                            <div className="p-8 mb-6 bg-white shadow-lg rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    Thông tin sách
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 bg-gray-50 shadow-md rounded-lg">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-blue-400 to-blue-400 text-white">
                                                {[
                                                    "ID đơn mượn",
                                                    "ID sách",
                                                    "Hình ảnh",
                                                    "Tên sách",
                                                    "Số lượng",
                                                    "Tác giả",
                                                ].map((header, index) => (
                                                    <th
                                                        key={index}
                                                        className="border border-gray-300 px-4 py-2 text-center font-semibold"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {request.books.map((book, bookIndex) => (
                                                <tr
                                                    key={bookIndex}
                                                    className={`${bookIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                        } hover:bg-gray-200`}
                                                >
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{book.request_id}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{book.id}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                                        <img
                                                            src={book.image}
                                                            alt={book.title}
                                                            className="w-34 h-40 mx-auto rounded-md object-cover shadow-sm"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                                                        {book.title}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{book.quantity}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{book.author}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 italic">Không có đơn yêu cầu mượn nào.</p>
            )}
        </div>
    );


};

export default BorrowRequests;
