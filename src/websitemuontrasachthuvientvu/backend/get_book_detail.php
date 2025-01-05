<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "db_config.php";

// Kiểm tra xem ID sách có được gửi không
if (isset($_GET['id'])) {
    $book_id = $_GET['id'];

    // Truy vấn sách theo ID và join với publishers và categories
    $query = "SELECT books.*, 
                     publishers.name AS publisher_name, 
                     categories.name AS category_name
              FROM books
              LEFT JOIN publishers ON books.publisher_id = publishers.id
              LEFT JOIN categories ON books.category_id = categories.id
              WHERE books.id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $book_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $book = $result->fetch_assoc();

            // Kiểm tra nếu đường dẫn hình ảnh không phải là URL hợp lệ và thêm tiền tố Cloudinary
            if (!filter_var($book['image'], FILTER_VALIDATE_URL)) {
                $cloudinary_base_url = "https://res.cloudinary.com/duk8odqun/image/upload/";
                $book['image'] = $cloudinary_base_url . ltrim($book['image'], "/");
            }

            echo json_encode($book, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(["message" => "Không tìm thấy sách"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Lỗi khi chuẩn bị truy vấn: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "ID sách không hợp lệ"]);
}

$conn->close();
?>
