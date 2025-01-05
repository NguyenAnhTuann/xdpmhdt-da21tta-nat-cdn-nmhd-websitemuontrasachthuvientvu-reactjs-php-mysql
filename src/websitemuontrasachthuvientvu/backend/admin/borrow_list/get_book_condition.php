<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../../db_config.php';

$response = ["status" => "error", "data" => []];

try {
    $stmt = $conn->prepare("SELECT * FROM book_condition_on_return");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response["status"] = "success";
        $response["conditions"] = $result->fetch_all(MYSQLI_ASSOC);
    } else {
        $response["message"] = "Không tìm thấy dữ liệu.";
    }
} catch (Exception $e) {
    $response["message"] = "Lỗi: " . $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
