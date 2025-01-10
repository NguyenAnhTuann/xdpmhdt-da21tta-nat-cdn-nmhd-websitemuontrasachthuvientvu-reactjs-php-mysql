import { faEdit, faFileAlt, faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [locationn, setLocationn] = useState('');
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');
    const [loadingWeather, setLoadingWeather] = useState(true);
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.id) {
                const storedBorrowLists = localStorage.getItem("borrowLists");
                const allBorrowLists = storedBorrowLists ? JSON.parse(storedBorrowLists) : {};
                delete allBorrowLists[user.id];
                localStorage.setItem("borrowLists", JSON.stringify(allBorrowLists));
            }
            localStorage.removeItem("user");
            setUser(null);
            setIsLoggingOut(false);
            navigate("/");
        }, 2000);
    };
    
    const isAdminPath = location.pathname.startsWith("/admin");
    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    console.log('Latitude:', latitude, 'Longitude:', longitude);

                    const locationRes = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
                    );
                    const locationData = await locationRes.json();
                    console.log('Location Data:', locationData);

                    setLocationn(locationData.city || locationData.locality || 'Không rõ vị trí');

                    const weatherRes = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1eb2d794501b0bd361102afe1b55fd33&lang=vi`
                    );
                    const weatherData = await weatherRes.json();
                    console.log('Weather Data:', weatherData);

                    if (weatherData.weather && weatherData.weather.length > 0) {
                        setWeather(weatherData.weather[0].description || 'Không rõ thời tiết');
                    } else {
                        setWeather('Không rõ thời tiết');
                    }

                    setTemperature(weatherData.main?.temp || 'Không rõ nhiệt độ');
                    setLoadingWeather(false);
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin thời tiết:', error);
                setWeather('Không thể tải dữ liệu thời tiết');
                setTemperature('Không rõ nhiệt độ');
                setLoadingWeather(false);
            }
        };

        fetchLocationAndWeather();
    }, []);

    return (
        <div>
            <div
                className="p-2 shadow-md flex flex-col justify-center items-center text-white bg-cover bg-center max-h-[80vh]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1736490180/Logotimdothatlac_11_nty5qf.png')`,
                }}
            >
                {loadingWeather ? (
                    <p className="text-center text-sm">Đang tải thông tin thời tiết...</p>
                ) : (
                    <>
                        <div className="flex justify-center items-center space-x-8 mb-4">
                            {/* Vị trí */}
                            <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                                <span className="text-2xl">🌍</span>
                                <span className="font-bold text-sm">{locationn}</span>
                            </div>
                            {/* Thời tiết */}
                            <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                                <span className="text-2xl">🌤️</span>
                                <span className="font-bold text-sm">{weather}</span>
                            </div>
                            {/* Nhiệt độ */}
                            <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                                <span className="text-2xl">🌡️</span>
                                <span className="font-bold text-sm">{temperature}°C</span>
                            </div>
                        </div>
                        {/* Dòng chữ bổ sung */}
                        <div className="text-center">
                            <p className="text-4xl font-bold text-black mb-4">SÁCH LÀ NGỌN ĐÈN SOI SÁNG TÂM HỒN CỦA BẠN</p>
                            <p className="text-lg text-black mb-6">Thư viện - Nơi ươm mầm đam mê đọc sách!</p>
                        </div>
                    </>
                )}
            </div>
            <header className="bg-white text-black py-4 shadow-md border-b">
                <div className="container mx-auto flex items-center justify-between px-4">
                    {/* Logo */}
                    <div className="flex items-center hover:scale-105">
                        <img
                            src="/image/logolibrarytet.png"
                            alt="Logo Thư Viện"
                            className="w-[500px] h-auto object-contain cursor-pointer"
                            onError={(e) => {
                                e.target.src = "/image/default-logo.png";
                            }}
                            onClick={() => navigate(isAdminPath ? "/admin" : "/")}
                        />

                        {isAdminPath && (
                            <span className="text-2xl font-semibold ml-4 text-gray-800">
                                Trang Quản Trị - Website Mượn Trả Sách Thư Viện TVU
                            </span>
                        )}
                    </div>

                    {/* Các nút điều hướng */}
                    <div className="flex items-center gap-4">
                        {isLoggingOut && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-blue-500 mb-6"></div>
                                <p className="text-white text-xl font-semibold animate-pulse">Đang thoát khỏi hệ thống, vui lòng đợi...</p>
                            </div>
                        )}

                        {user ? (
                            <>
                                {!isAdminPath && (
                                    <span className="text-black font-mono text-lg tracking-wide">
                                        Xin chào, <span className="font-thin">{user.name}</span>!
                                    </span>
                                )}
                                {!isAdminPath && (
                                    <button
                                        onClick={() => navigate("/edit-profile")}
                                        className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-3xl shadow-sm"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                        <span>Chỉnh sửa thông tin</span>
                                    </button>
                                )}
                                {!isAdminPath && (
                                    <button
                                        onClick={() => navigate("/borrow-request")}
                                        className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-3xl shadow-sm"
                                    >
                                        <FontAwesomeIcon icon={faFileAlt} />
                                        <span>Đơn yêu cầu mượn</span>
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-600 text-white border border-gray-300 hover:bg-red-700 py-2 px-4 rounded-3xl shadow-sm"
                                    disabled={isLoggingOut}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>{isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}</span>
                                </button>

                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-3xl shadow-sm"
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                    <span>Đăng nhập</span>
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-3xl shadow-sm"
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <span>Đăng ký</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
