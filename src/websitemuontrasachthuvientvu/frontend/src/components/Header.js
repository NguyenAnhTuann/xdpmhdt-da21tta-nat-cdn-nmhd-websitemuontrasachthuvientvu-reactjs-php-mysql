import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOutAlt, faFileAlt, faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const handleLogout = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            const storedBorrowLists = localStorage.getItem("borrowLists");
            const allBorrowLists = storedBorrowLists ? JSON.parse(storedBorrowLists) : {};
            delete allBorrowLists[user.id];
            localStorage.setItem("borrowLists", JSON.stringify(allBorrowLists));
        }

        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    // Kiểm tra nếu đang ở "/admin" hoặc đường dẫn con của "/admin"
    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <header className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md border-b">
            <div className="flex items-center">
                <img
                    src="/image/logolibrarytet.png"
                    alt="Logo Thư Viện"
                    className="w-[600px] h-auto object-contain cursor-pointer"
                    onError={(e) => {
                        e.target.src = "/image/default-logo.png";
                    }}
                    onClick={() => navigate("/")}
                />
                {isAdminPath && (
                    <span className="text-4xl font-semibold ml-4 text-gray-800">
                        Trang Quản Trị - Website Mượn Trả Sách Thư Viện TVU
                    </span>
                )}
            </div>

            {/* Luôn hiển thị các nút ở mọi trang */}
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        {!isAdminPath && (
                            <span className="text-black font-mono text-lg tracking-wide">
                                Xin chào, <span className="text-black font-thin text-lg tracking-wide">{user.name}</span>!
                            </span>
                        )}
                        {!isAdminPath && (
                            <button
                                onClick={() => navigate("/edit-profile")}
                                className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-xl shadow-sm"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                                <span>Chỉnh sửa thông tin</span>
                            </button>
                        )}
                        {!isAdminPath && (
                            <button
                                onClick={() => navigate("/borrow-request")}
                                className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-xl shadow-sm"
                            >
                                <FontAwesomeIcon icon={faFileAlt} />
                                <span>Đơn yêu cầu mượn</span>
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 text-white border border-gray-300 hover:bg-red-700 py-2 px-4 rounded-xl shadow-sm"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Đăng xuất</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-xl shadow-sm"
                        >
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Đăng nhập</span>
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-xl shadow-sm"
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Đăng ký</span>
                        </button>
                    </>
                )}
            </div>
        </header>
    );

};

export default Header;
