<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once "db_config.php";

// Truy vấn danh sách thể loại
$query = "SELECT id, name FROM categories";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row; // Thêm từng thể loại vào mảng
    }
    echo json_encode($categories); // Trả về danh sách thể loại dưới dạng JSON
} else {
    echo json_encode(["message" => "Không có thể loại nào."]);
}

$conn->close();
?>
