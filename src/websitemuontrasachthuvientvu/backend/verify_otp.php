<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $otp = $data['otp'];
    $new_password = password_hash($data['new_password'], PASSWORD_BCRYPT);

    // Kiểm tra OTP
    $stmt = $conn->prepare("SELECT otp, UNIX_TIMESTAMP(otp_expiry) AS otp_expiry_unix FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($row['otp'] == $otp && time() < $row['otp_expiry_unix']) {
            // Cập nhật mật khẩu mới
            $stmt = $conn->prepare("UPDATE users SET password = ?, otp = NULL, otp_expiry = NULL WHERE email = ?");
            $stmt->bind_param("ss", $new_password, $email);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Mật khẩu đã được cập nhật thành công."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Mã OTP không hợp lệ hoặc đã hết hạn."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Email không tồn tại trong hệ thống."]);
    }
}
?>
