<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once "../../db_config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Thay đổi cách lấy dữ liệu ID từ JSON body
    $data = json_decode(file_get_contents("php://input"), true); // Lấy dữ liệu JSON từ body
    if (isset($data['id'])) {
        $id = (int)$data['id'];
        $query = "DELETE FROM books WHERE id = $id";

        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Xóa sách thành công !"]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi cơ sở dữ liệu: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "ID sách không hợp lệ !"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Phương pháp yêu cầu không hợp lệ !"]);
}
$conn->close();

?>
