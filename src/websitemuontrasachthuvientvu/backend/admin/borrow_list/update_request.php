<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../../db_config.php';

$response = ["status" => "error", "message" => ""];

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['status_user'], $data['book_condition_id'], $data['fine_fee_id'])) {
    $id = $data['id'];
    $status_user = $data['status_user'];
    $book_condition_id = !empty($data['book_condition_id']) ? $data['book_condition_id'] : null;
    $fine_fee_id = !empty($data['fine_fee_id']) ? $data['fine_fee_id'] : null;

    $stmt = $conn->prepare("
        UPDATE borrow_list 
        SET status_user = ?, book_condition_id = ?, fine_fee_id = ? 
        WHERE id = ?
    ");
    $stmt->bind_param("siii", $status_user, $book_condition_id, $fine_fee_id, $id);

    if ($stmt->execute()) {
        $response["status"] = "success";
        $response["message"] = "Cập nhật thành công.";
    } else {
        $response["message"] = "Cập nhật thất bại.";
    }
    $stmt->close();
} else {
    $response["message"] = "Thiếu dữ liệu.";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
