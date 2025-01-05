<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../../db_config.php';

$response = ["status" => "error", "data" => []];

try {
    $stmt = $conn->prepare("
        SELECT 
            borrow_list.id,
            borrow_list.borrow_request_id,
            borrow_list.status_user,
            borrow_list.book_condition_id,
            book_condition_on_return.name AS book_condition_name,
            borrow_list.fine_fee_id,
            fine_fee.fee AS fine_fee_amount,
            borrow_list.return_day,
            borrow_requests.created_at AS approved_at -- Thời gian phê duyệt
        FROM borrow_list
        LEFT JOIN book_condition_on_return ON borrow_list.book_condition_id = book_condition_on_return.id
        LEFT JOIN fine_fee ON borrow_list.fine_fee_id = fine_fee.id
        LEFT JOIN borrow_requests ON borrow_list.borrow_request_id = borrow_requests.id -- Liên kết với bảng borrow_requests
    ");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response["status"] = "success";
        $response["data"] = $result->fetch_all(MYSQLI_ASSOC);
    } else {
        $response["message"] = "Không có dữ liệu.";
    }
} catch (Exception $e) {
    $response["message"] = "Lỗi: " . $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
