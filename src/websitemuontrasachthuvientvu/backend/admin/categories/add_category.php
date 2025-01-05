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

        $query = "INSERT INTO categories (name) VALUES ('$name')";

                // Kiểm tra thể loại sách trùng
                $checkQuery = "SELECT id FROM categories WHERE name = '$name'";
                $checkResult = $conn->query($checkQuery);
        
                if ($checkResult->num_rows > 0) {
                    echo json_encode(["success" => false, "message" => "Thể loại đã tồn tại! Vui lòng chọn thể loại khác ..."]);
                    exit;
                }

        if ($conn->query($query)) {
            echo json_encode(["success" => true, "message" => "Thêm thể loại mới thành công !"]);
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
