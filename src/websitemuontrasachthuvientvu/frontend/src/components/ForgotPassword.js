import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1); // Bước 1: Gửi OTP, Bước 2: Xác minh OTP
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/send_otp.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );
            const data = await response.json();
            if (data.status === "success") {
                setMessage(data.message);
                setStep(2);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "http://localhost/websitemuontrasachthuvientvu/backend/verify_otp.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp, new_password: newPassword }),
                }
            );
            const data = await response.json();
            if (data.status === "success") {
                setMessage(data.message);
                setTimeout(() => navigate("/login"), 2000); // Chuyển về trang login sau 2 giây
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
            <div className="relative bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg z-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        🔒
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">
                    {step === 1 ? "Quên Mật Khẩu" : "Đổi Mật Khẩu"}
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    {step === 1
                        ? "Nhập email của bạn để nhận mã OTP"
                        : "Nhập mã OTP và mật khẩu mới để đặt lại mật khẩu"}
                </p>

                {/* Message */}
                {message && (
                    <div className="mb-4 text-center text-green-500 font-medium animate-pulse">
                        {message}
                    </div>
                )}

                {/* Form */}
                {step === 1 && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendOtp();
                        }}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-400">
                                📧
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "⏳ Đang xử lý..." : "Gửi mã OTP"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleVerifyOtp();
                        }}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-400">
                                🔑
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                            <span className="absolute left-4 top-3 text-gray-400">
                                🔒
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "⏳ Đang xử lý..." : "Xác nhận"}
                        </button>
                    </form>
                )}
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-16 left-16 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-16 right-16 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-30"></div>
            </div>
        </div>
    );
};

export default ForgotPassword;
