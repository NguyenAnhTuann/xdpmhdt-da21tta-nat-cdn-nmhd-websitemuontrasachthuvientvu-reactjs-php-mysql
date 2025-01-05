<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../db_config.php"; // Đảm bảo đúng đường dẫn tới file cấu hình

// Truy vấn danh sách tất cả các sách cùng với thông tin nhà xuất bản và thể loại
$query = "SELECT books.*, 
                 publishers.name AS publisher_name, 
                 categories.name AS category_name
          FROM books
          LEFT JOIN publishers ON books.publisher_id = publishers.id
          LEFT JOIN categories ON books.category_id = categories.id";

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $books = [];
    while ($row = $result->fetch_assoc()) {
        // Nếu cần thêm tiền tố Cloudinary vào đường dẫn ảnh
        if (!empty($row['image']) && !filter_var($row['image'], FILTER_VALIDATE_URL)) {
            $cloudinary_base_url = "https://res.cloudinary.com/duk8odqun/image/upload/";
            $row['image'] = $cloudinary_base_url . ltrim($row['image'], "/");
        }

        $books[] = $row;
    }

    echo json_encode($books, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["message" => "Không có sách nào trong cơ sở dữ liệu"], JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>
