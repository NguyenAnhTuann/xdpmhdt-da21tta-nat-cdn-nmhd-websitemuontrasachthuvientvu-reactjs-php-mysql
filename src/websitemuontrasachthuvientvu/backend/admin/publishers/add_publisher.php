<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once "../../db_config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['name']) && !empty($data['name'])) {
        $name = $conn->real_escape_string($data['name']);

        
        $query = "INSERT INTO publishers (name) VALUES ('$name')";
        // Kiểm tra nhà xuất bản trùng
        $checkQuery = "SELECT id FROM publishers WHERE name = '$name'";
        $checkResult = $conn->query($checkQuery);

        if ($checkResult->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Publisher name already exists"]);
            exit;
        }

        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Thêm mới Nhà Xuất Bản thành công !"]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi cở sở dữ liệu: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Dữ liệu không hợp lệ !"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Phương thức yêu cầu không hợp lệ !"]);
}
$conn->close();
?>
