<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
date_default_timezone_set('Asia/Ho_Chi_Minh');

require 'vendor/autoload.php';
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    // Kiểm tra email tồn tại trong DB
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Tạo mã OTP
        $otp = rand(100000, 999999);
        $expiry = date('Y-m-d H:i:s', time() + 300); // Thời gian hết hạn dạng ngày/giờ thực

        // Lưu OTP vào database
        $stmt = $conn->prepare("UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?");
        $stmt->bind_param("sss", $otp, $expiry, $email);
        $stmt->execute();

        // Gửi OTP qua email
        $mail = new PHPMailer(true);
        try {
            // Cấu hình Gmail SMTP
            $mail->isSMTP();
            $mail->CharSet = 'UTF-8'; // Đặt mã hóa UTF-8
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'websitemuontrasachthuvientvu@gmail.com';
            $mail->Password = 'schq oikt jfdg hglf';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Thiết lập người gửi và người nhận
            $mail->setFrom('websitemuontrasachthuvientvu@gmail.com', 'Website Mượn Trả Sách Thư Viện TVU');
            $mail->addAddress($email);

            // Nội dung email
            $mail->isHTML(true);
            $mail->Subject = 'Mã OTP khôi phục mật khẩu của bạn';

            // Thiết kế nội dung email
            $mail->Body = "
            <div style='font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5; padding: 20px;'>
                <div style='max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;'>
                    <div style='background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;'>
                        <h1 style='margin: 0; font-size: 24px;'>🔑 Mã OTP của bạn</h1>
                    </div>
                    <div style='padding: 20px;'>
                        <p style='font-size: 16px; color: #333;'>Xin chào, <strong>$email</strong>,</p>
                        <p style='font-size: 16px; color: #333;'>Đây là mã OTP của bạn để đặt lại mật khẩu. Mã này sẽ hết hạn sau <strong>5 phút</strong>.</p>
                        <div style='text-align: center; margin: 20px 0;'>
                            <span style='font-size: 36px; font-weight: bold; color: #007bff; padding: 10px 20px; border: 1px dashed #007bff; border-radius: 5px; background-color: #f0f8ff;'>
                                $otp
                            </span>
                        </div>
                        <p style='font-size: 16px; color: #333;'>Mã này có hiệu lực đến: <strong style='color: #ff0000;'>$expiry</strong>.</p>
                        <p style='font-size: 16px; color: #333;'>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Để bảo mật, không chia sẻ mã OTP này với bất kỳ ai.</p>
                    </div>
                    <div style='background-color: #f5f5f5; text-align: center; padding: 15px; border-radius: 0 0 8px 8px;'>
                        <p style='font-size: 14px; color: #777; margin: 0;'>Copyright © 2024 Website Mượn Trả Sách Thư Viện TVU - Nguyễn Anh Tuấn - 110121123 - DA21TTA</p>
                    </div>
                </div>
            </div>
        ";
        

            $mail->send();
            echo json_encode(["status" => "success", "message" => "Mã OTP đã được gửi đến email."]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Không thể gửi email: " . $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Email không tồn tại trong hệ thống."]);
    }
}
?>
