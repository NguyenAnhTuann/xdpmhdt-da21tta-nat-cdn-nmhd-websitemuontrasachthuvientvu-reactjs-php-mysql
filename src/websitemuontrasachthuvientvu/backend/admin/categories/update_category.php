<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once "../../db_config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['id'], $data['name']) && !empty($data['id']) && !empty($data['name'])) {
        $id = (int)$data['id'];
        $name = $conn->real_escape_string($data['name']);
        $query = "UPDATE categories SET name = '$name' WHERE id = $id";

        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Cập nhật thông tin thể loại thành công !"]);
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
