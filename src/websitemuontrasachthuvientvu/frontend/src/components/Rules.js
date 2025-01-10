import React from "react";

const Rules = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    return (
        <div className="container mx-auto mt-10 p-6 space-y-12">
            {/* Tiêu đề */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-2 uppercase">Nội quy thư viện</h1>
                <p className="text-lg text-gray-600">Cùng tuân thủ nội quy để xây dựng môi trường đọc sách văn minh.</p>
            </div>

            {/* Nội quy và Hướng dẫn mượn sách */}
            <div className="space-y-6">
                {/* Quy định chung */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Quy định chung</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Đọc sách tại chỗ hoặc mượn sách theo đúng quy định của thư viện.</li>
                        <li>Không làm rách, bôi bẩn, hay làm mất sách trong quá trình sử dụng.</li>
                        <li>Trả sách đúng hạn, nếu không sẽ bị phạt theo quy định.</li>
                        <li>Không mang thức ăn, nước uống vào khu vực đọc sách.</li>
                        <li>Giữ trật tự và không làm ồn trong thư viện.</li>
                    </ul>
                </div>

                {/* Hướng dẫn mượn sách */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Hướng dẫn mượn sách</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Đăng ký thẻ thư viện trước khi mượn sách.</li>
                        <li>Kiểm tra tình trạng sách trước khi mượn, thông báo nếu phát hiện vấn đề.</li>
                        <li>Thời hạn mượn sách tối đa: 14 ngày. Có thể gia hạn thêm nếu không có người đặt trước.</li>
                        <li>Trả sách tại quầy trước 16h ngày hết hạn.</li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                        Liên hệ với nhân viên thư viện nếu bạn cần hỗ trợ trong quá trình mượn sách.
                    </p>
                </div>
            </div>

            {/* Bảng phí phạt */}
            <div className="bg-gray-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-black text-center">Bảng phí phạt với các tình trạng sách</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-gray-800">STT</th>
                                <th className="border border-gray-300 px-4 py-2 text-gray-800">Tình trạng sách</th>
                                <th className="border border-gray-300 px-4 py-2 text-gray-800">Phí phạt (VNĐ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">1</td>
                                <td className="border border-gray-300 px-4 py-2">Rách trang</td>
                                <td className="border border-gray-300 px-4 py-2">50,000 VNĐ</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">2</td>
                                <td className="border border-gray-300 px-4 py-2">Mất trang</td>
                                <td className="border border-gray-300 px-4 py-2">100,000 VNĐ</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">3</td>
                                <td className="border border-gray-300 px-4 py-2">Bị ướt</td>
                                <td className="border border-gray-300 px-4 py-2">200,000 VNĐ</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">4</td>
                                <td className="border border-gray-300 px-4 py-2">Cũ nhưng đầy đủ nội dung</td>
                                <td className="border border-gray-300 px-4 py-2">500,000 VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Khung giờ hoạt động */}
            <div className="bg-gray-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">Khung giờ hoạt động</h2>
                <ul className="list-none text-gray-700">
                    <li>
                        <strong>Thứ 2 - Thứ 6:</strong> 8:00 - 18:00
                    </li>
                    <li>
                        <strong>Thứ 7:</strong> 8:00 - 12:00
                    </li>
                    <li>
                        <strong>Chủ Nhật:</strong> Nghỉ
                    </li>
                </ul>
                <p className="mt-4 text-gray-600">
                    Nếu cần thêm thông tin, vui lòng liên hệ qua email:{" "}
                    <a href="mailto:tvulibrary@tvu.edu.vn" className="text-blue-500 underline">
                        tvulibrary@tvu.edu.vn
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default Rules;
