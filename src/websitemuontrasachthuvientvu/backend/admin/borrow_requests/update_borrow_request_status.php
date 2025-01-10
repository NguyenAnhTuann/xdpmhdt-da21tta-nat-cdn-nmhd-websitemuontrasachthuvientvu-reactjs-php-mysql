<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../../db_config.php';
require_once '../../vendor/autoload.php'; // Dùng cho thư viện PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $request_id = $data['request_id'];
    $status = $data['status'];

    if (!$request_id || !$status) {
        echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ."]);
        exit;
    }

    // Lấy thông tin `created_at` của đơn mượn
    $queryCreatedAt = "SELECT created_at FROM borrow_requests WHERE id = ?";
    $createdAtStmt = $conn->prepare($queryCreatedAt);
    $createdAtStmt->bind_param("i", $request_id);
    $createdAtStmt->execute();
    $createdAtResult = $createdAtStmt->get_result();

    if ($createdAtResult->num_rows > 0) {
        $createdAtRow = $createdAtResult->fetch_assoc();
        $created_at = $createdAtRow['created_at'];

        // Cập nhật trạng thái tất cả đơn mượn có cùng `created_at`
        $updateQuery = "UPDATE borrow_requests SET status = ? WHERE created_at = ?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("ss", $status, $created_at);

        if ($updateStmt->execute()) {
            // Nếu trạng thái là "Duyệt", thực hiện các thao tác tiếp theo
            if ($status === "Duyệt") {
                // Lấy thông tin người dùng
                $queryUser = "SELECT users.email, users.name 
                              FROM users 
                              JOIN borrow_requests ON users.id = borrow_requests.user_id 
                              WHERE borrow_requests.id = ?";
                $userStmt = $conn->prepare($queryUser);
                $userStmt->bind_param("i", $request_id);
                $userStmt->execute();
                $userResult = $userStmt->get_result();

                // Lấy tất cả sách có cùng thời gian `created_at`
                $queryBooks = "SELECT borrow_requests.id AS borrow_request_id, 
                                      books.id AS book_id, 
                                      books.image, 
                                      books.title, 
                                      books.author, 
                                      borrow_requests.quantity 
                               FROM borrow_requests 
                               JOIN books ON borrow_requests.book_id = books.id 
                               WHERE borrow_requests.created_at = ?";
                $bookStmt = $conn->prepare($queryBooks);
                $bookStmt->bind_param("s", $created_at);
                $bookStmt->execute();
                $bookResult = $bookStmt->get_result();

                if ($userResult->num_rows > 0) {
                    $user = $userResult->fetch_assoc();
                    $email = $user['email'];
                    $name = $user['name'];

                    // Chuẩn bị danh sách sách
                    $booksInfo = "";
                    while ($book = $bookResult->fetch_assoc()) {
                        $booksInfo .= "<tr>
                            <td>{$book['borrow_request_id']}</td>
                            <td>{$book['book_id']}</td>
                            <td><img src='{$book['image']}' alt='{$book['title']}' style='width:50px; height:auto;'></td>
                            <td>{$book['title']}</td>
                            <td>{$book['author']}</td>
                            <td>{$book['quantity']}</td>
                        </tr>";
                    }

                    // Gửi email thông báo
                    $mail = new PHPMailer(true);
                    try {
                        // Cấu hình SMTP
                        $mail->isSMTP();
                        $mail->Host = 'smtp.gmail.com'; // Hoặc server SMTP khác
                        $mail->CharSet = 'UTF-8'; // Đặt mã hóa UTF-8
                        $mail->SMTPAuth = true;
                        $mail->Username = 'websitemuontrasachthuvientvu@gmail.com'; // Thay bằng email của bạn
                        $mail->Password = 'schq oikt jfdg hglf'; // Thay bằng mật khẩu ứng dụng
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                        $mail->Port = 587;

                        // Cấu hình người gửi và người nhận
                        $mail->setFrom('websitemuontrasachthuvientvu@gmail.com', 'Website Mượn Trả Sách Thư Viện TVU');
                        $mail->addAddress($email, $name);

                        // Nội dung email
                        $mail->isHTML(true);
                        $mail->Subject = '🔊🔊🔊 THÔNG BÁO DUYỆT ĐƠN MƯỢN SÁCH 🔊🔊🔊';
                        $mail->Body = "
                        <div style='font-family: Arial, sans-serif; background-color: #f8f9fc; padding: 20px;'>
                            <div style='max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;'>
                                
                                <!-- Header -->
                                <div style='background-color: #1d4ed8; padding: 20px; text-align: center; color: #ffffff;'>
                                    <h1 style='font-size: 24px; font-weight: bold; margin: 0;'>
                                        📚 Xác Nhận Yêu Cầu Mượn Sách 📚
                                    </h1>
                                    <p style='font-size: 14px; margin-top: 5px;'>Thư viện TVU</p>
                                </div>
                                
                                <!-- Nội dung chính -->
                                <div style='padding: 20px;'>
                                    <p style='font-size: 18px; font-weight: bold; color: #111827; margin: 0 0 10px;'>Xin chào <span style='color: #2563eb;'>$name</span>,</p>
                                    <p style='font-size: 16px; color: #374151; margin: 0 0 20px;'>Đơn mượn sách của bạn đã được duyệt. Vui lòng đến thư viện để nhận sách. Sau 24 giờ kể từ khi nhận được thông báo này thì đơn mượn sẽ bị hủy vì quá hạn.</p>
                                    <p style='font-size: 16px; color: #374151; margin: 0 0 20px;'>Thông tin chi tiết như sau:</p>
                                    
                                    <!-- Thông tin sách -->
                                    <div style='border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-top: 20px;'>
                                        <div style='background-color: #1d4ed8; color: white; padding: 12px; font-size: 16px; font-weight: bold; text-align: center;'>
                                            Thông Tin Sách Mượn
                                        </div>
                                        <table style='width: 100%; border-collapse: collapse; margin: 0;'>
                                            <thead>
                                                <tr style='background-color: #f3f4f6; text-align: center;'>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>ID Đơn mượn</th>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>ID Sách</th>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>Hình ảnh</th>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>Tên sách</th>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>Tác giả</th>
                                                    <th style='padding: 12px; border: 1px solid #e5e7eb;'>Số lượng</th>
                                                </tr>
                                            </thead>
                                            <tbody style='text-align: center;'>
                                                $booksInfo
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <!-- Lưu ý -->
                                    <div style='margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;'>
                                        <p style='font-size: 14px; color: #4b5563; margin: 0;'>
                                            📌 Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ đội ngũ hỗ trợ của chúng tôi qua email hoặc hotline. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
                                        </p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div style='background-color: #f9fafb; text-align: center; padding: 15px; border-top: 1px solid #e5e7eb;'>
                                    <p style='font-size: 12px; color: #6b7280; margin: 0;'>Copyright © 2024 Website Mượn Trả Sách tại Trung tâm học liệu - Phát triển dạy và học</p>
                                    <p style='font-size: 12px; color: #6b7280; margin: 0;'>Được phát triển bởi Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU</p>
                                </div>
                            </div>
                        </div>
                        ";
                        
                        $mail->send();
                    } catch (Exception $e) {
                        error_log("Không thể gửi email: " . $mail->ErrorInfo);
                    }
                }
            }

            echo json_encode(["status" => "success", "message" => "Trạng thái đã được cập nhật."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Không thể cập nhật trạng thái cho các đơn mượn liên quan."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Không tìm thấy thông tin `created_at`."]);
    }
}
?>
