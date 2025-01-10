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

    // Kiểm tra các trường dữ liệu bắt buộc
    $requiredFields = ['title', 'author', 'publisher_id', 'publication_date', 'category_id', 'language', 'pages', 'available_quantity', 'description', 'image'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            echo json_encode(["success" => false, "message" => "Nhập thiếu trường '$field' , vui lòng kiểm tra lại!"]);
            exit;
        }
    }

    // Lấy dữ liệu từ request
    $title = $conn->real_escape_string($data['title']);
    $author = $conn->real_escape_string($data['author']);
    $publisher_id = (int)$data['publisher_id'];
    $publication_date = $conn->real_escape_string($data['publication_date']);
    $category_id = (int)$data['category_id'];
    $language = $conn->real_escape_string($data['language']);
    $pages = (int)$data['pages'];
    $available_quantity = (int)$data['available_quantity'];
    $description = $conn->real_escape_string($data['description']);
    $image_url = $conn->real_escape_string($data['image']); // Nhận URL ảnh từ frontend

    // Kiểm tra định dạng ngày
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $publication_date)) {
        echo json_encode(["success" => false, "message" => "Ngày xuất bản không hợp lệ. Định dạng cần là YYYY-MM-DD"]);
        exit;
    }

    // Thêm sách vào cơ sở dữ liệu
    $query = "INSERT INTO books (image, title, author, publisher_id, publication_date, category_id, language, pages, available_quantity, description) 
              VALUES ('$image_url', '$title', '$author', $publisher_id, '$publication_date', $category_id, '$language', $pages, $available_quantity, '$description')";

    if ($conn->query($query)) {
        echo json_encode(["success" => true, "message" => "Thêm sách mới thành công !"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi cơ sở dữ liệu: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Phương pháp yêu cầu không hợp lệ"]);
}

$conn->close();
