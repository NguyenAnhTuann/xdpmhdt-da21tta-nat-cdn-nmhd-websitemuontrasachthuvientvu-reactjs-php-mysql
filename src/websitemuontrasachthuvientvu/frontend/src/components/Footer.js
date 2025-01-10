import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 py-8 px-6">
            {/* Phần mới thêm */}
            <div className="bg-gray-400 text-white py-6 rounded-3xl">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    {/* Logo và ứng dụng */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-4">
                            Sử dụng ứng dụng TVU Library trên di động!
                        </h4>
                        <img
                            src="/image/logolibrarytet.png"
                            alt="TVU Logo"
                            className="w-[300px] h-auto object-contain mb-4"
                        />
                        <div className="flex space-x-4">
                            <img
                                src="https://smartlib.ueh.edu.vn/assets/img/ios-download-dark.png"
                                alt="App Store"
                                className="w-32 h-auto object-contain"
                            />
                            <img
                                src="https://smartlib.ueh.edu.vn/assets/img/google_play_dark.png"
                                alt="Google Play"
                                className="w-32 h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
                        <ul className="space-y-2 text-sm text-center">
                            <li className="flex items-center justify-center space-x-2">
                                <span>📍</span>
                                <span>
                                    Số 126 Nguyễn Thiện Thành – Khóm 4, Phường 5, Tp Trà
                                    Vinh, Tỉnh Trà Vinh
                                </span>
                            </li>
                            <li className="flex items-center justify-center space-x-2">
                                <span>📞</span>
                                <span>
                                    02943.855.246 - Ext 1050 (Mon - Fri | 7.30 - 11.30,
                                    13.30 - 16.30)
                                </span>
                            </li>
                            <li className="flex items-center justify-center space-x-2">
                                <span>📧</span>
                                <span>tvulibrary@tvu.edu.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>



            {/* Phần cũ */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                {/* Thông tin đồ án */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 leading-relaxed">
                        SẢN PHẨM DEMO PHỤC VỤ ĐỒ ÁN KẾT THÚC MÔN{" "}
                        <br />
                        <span className="text-gray-600">
                            PHÁT TRIỂN ỨNG DỤNG WEB MÃ NGUỒN MỞ
                        </span>
                    </h3>

                    <h4 className="text-lg font-semibold mb-2 whitespace-nowrap">Tên đề tài: Xây dựng Website quản lý mượn trả sách tại Trung tâm học liệu - Phát triển dạy và học</h4>
                    <h4 className="text-lg font-semibold mb-2">Mã đề tài: 07</h4>
                    <h4 className="text-lg font-semibold mb-2">Giáo viên hướng dẫn: Phạm Thị Trúc Mai</h4>
                    <h4 className="text-lg font-semibold mb-2">Thành viên thực hiện:</h4>
                    <ul className="space-y-3 text-sm leading-6">
                        <li className="flex items-center gap-3">
                            <span className="bg-gray-800 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                                1
                            </span>
                            <h4>Nguyễn Anh Tuấn - 110121123 - DA21TTA</h4>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-gray-800 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                                2
                            </span>
                            <h4>Cao Duy Nhân - 110121070 - DA21TTA</h4>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-gray-800 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                                3
                            </span>
                            <h4>Nguyễn Minh Hải Đăng - 110121181 - DA21TTA</h4>
                        </li>
                    </ul>
                </div>

                {/* Logo thư viện */}
                <div className="flex justify-end">
                    <img
                        src="/image/logolibrarytet.png"
                        alt="Logo Thư Viện"
                        className="w-[600px] h-auto object-contain"
                    />
                </div>
            </div>

            {/* Dòng chữ bản quyền */}
            <div className="text-center mt-8 text-xs text-black border-t border-gray-300 pt-4">
                Copyright &copy; 2024 Thư Viện Sách TVU. Được phát triển bởi thành viên của DA21TTA.
            </div>
        </footer>
    );
};

export default Footer;
