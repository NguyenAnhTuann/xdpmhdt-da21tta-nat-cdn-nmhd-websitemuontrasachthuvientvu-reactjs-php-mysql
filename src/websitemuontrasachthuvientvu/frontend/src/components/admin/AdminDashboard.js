import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    const navigate = useNavigate();


    return (
        <div className="bg-gradient-to-r from-blue-50 to-white min-h-screen p-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold text-gray-800">
                    CHỨC NĂNG CỦA NGƯỜI QUẢN TRỊ
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Quản lý toàn bộ hệ thống một cách dễ dàng và hiệu quả.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Quản lý người dùng */}
                <div
                    onClick={() => navigate("/admin/users")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-users text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý người dùng
                    </h3>
                    <p className="mt-2 text-gray-600 text-center whitespace-nowrap">
                        Thêm, sửa, hoặc xóa thông tin người dùng.
                    </p>
                </div>

                {/* Quản lý sách */}
                <div
                    onClick={() => navigate("/admin/books")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-book-open text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý sách
                    </h3>
                    <p className="mt-2 text-gray-600 text-center">
                        Thêm, sửa, hoặc xóa sách trong hệ thống.
                    </p>
                </div>

                {/* Quản lý nhà xuất bản */}
                <div
                    onClick={() => navigate("/admin/publishers")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-purple-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-building text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý nhà xuất bản
                    </h3>
                    <p className="mt-2 text-gray-600 text-center">
                        Thêm hoặc chỉnh sửa nhà xuất bản.
                    </p>
                </div>

                {/* Quản lý thể loại sách */}
                <div
                    onClick={() => navigate("/admin/categories")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-orange-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-tags text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý thể loại sách
                    </h3>
                    <p className="mt-2 text-gray-600 text-center">
                        Tạo và quản lý các thể loại sách.
                    </p>
                </div>

                {/* Quản lý yêu cầu mượn */}
                <div
                    onClick={() => navigate("/admin/borrow-requests")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-paper-plane text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý yêu cầu mượn
                    </h3>
                    <p className="mt-2 text-gray-600 text-center">
                        Xem và phê duyệt các yêu cầu mượn sách.
                    </p>
                </div>

                {/* Quản lý đơn mượn */}
                <div
                    onClick={() => navigate("/admin/borrow-list")}
                    className="cursor-pointer p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-2"
                >
                    <div className="flex items-center justify-center bg-yellow-500 text-white rounded-full w-16 h-16 mx-auto">
                        <i className="fas fa-clipboard-check text-2xl"></i>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                        Quản lý đơn mượn
                    </h3>
                    <p className="mt-2 text-gray-600 text-center whitespace-nowrap">
                        Theo dõi và cập nhật trạng thái đơn mượn.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
