<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once "../../db_config.php";

// Kiểm tra nếu phương thức là POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Nhận dữ liệu từ frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra nếu có ID sách để cập nhật
    if (empty($data['id'])) {
        echo json_encode(["success" => false, "message" => "ID sách là bắt buộc"]);
        exit;
    }

    $id = (int)$data['id'];

    // Lấy dữ liệu cần cập nhật, sử dụng giá trị hiện tại nếu không được cung cấp
    $fieldsToUpdate = [
        'title' => $data['title'] ?? null,
        'author' => $data['author'] ?? null,
        'publisher_id' => isset($data['publisher_id']) ? (int)$data['publisher_id'] : null,
        'publication_date' => $data['publication_date'] ?? null,
        'category_id' => isset($data['category_id']) ? (int)$data['category_id'] : null,
        'language' => $data['language'] ?? null,
        'pages' => isset($data['pages']) ? (int)$data['pages'] : null,
        'available_quantity' => isset($data['available_quantity']) ? (int)$data['available_quantity'] : null,
        'description' => $data['description'] ?? null,
        'image' => $data['image'] ?? null,
    ];

    // Kiểm tra định dạng ngày nếu có publication_date
    if (!empty($fieldsToUpdate['publication_date']) && !preg_match('/\\d{4}-\\d{2}-\\d{2}/', $fieldsToUpdate['publication_date'])) {
        echo json_encode(["success" => false, "message" => "Ngày xuất bản không hợp lệ, định dạng phải là YYYY-MM-DD"]);
        exit;
    }

    // Xây dựng truy vấn SQL động chỉ cập nhật các trường có giá trị
    $updateQuery = "UPDATE books SET ";
    $updateParts = [];

    foreach ($fieldsToUpdate as $field => $value) {
        if ($value !== null) {
            $escapedValue = $conn->real_escape_string($value);
            $updateParts[] = "$field = '$escapedValue'";
        }
    }

    if (empty($updateParts)) {
        echo json_encode(["success" => false, "message" => "Không có dữ liệu để cập nhật"]);
        exit;
    }

    $updateQuery .= implode(", ", $updateParts) . " WHERE id = $id";

    // Thực thi truy vấn cập nhật
    if ($conn->query($updateQuery)) {
        echo json_encode(["success" => true, "message" => "Cập nhật thông tin sách thành công"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi cơ sở dữ liệu: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Phương pháp yêu cầu không hợp lệ"]);
}

$conn->close();
