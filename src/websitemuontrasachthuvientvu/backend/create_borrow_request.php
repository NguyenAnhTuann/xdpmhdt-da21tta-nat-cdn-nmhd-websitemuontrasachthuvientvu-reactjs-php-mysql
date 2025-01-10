<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $user_id = $data['user_id'];
    $borrow_list = $data['borrow_list'];
    $return_date = $data['return_date'];

    if (!$user_id || !$borrow_list || !$return_date) {
        echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ."]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO borrow_requests (book_id, user_id, quantity, return_date, status) VALUES (?, ?, ?, ?, 'Chờ xử lý')");

    foreach ($borrow_list as $book) {
        $book_id = $book['id'];
        $quantity = $book['quantity'] ?? 1;
        $stmt->bind_param("iiis", $book_id, $user_id, $quantity, $return_date);
        $stmt->execute();
    }

    echo json_encode(["status" => "success", "message" => "Đơn yêu cầu mượn đã được tạo."]);
}
?>
