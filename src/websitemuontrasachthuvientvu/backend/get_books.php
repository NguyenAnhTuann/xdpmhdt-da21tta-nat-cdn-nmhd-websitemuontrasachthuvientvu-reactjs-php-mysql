<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "db_config.php";

// Kiểm tra tham số category_id
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;

// Truy vấn lấy sách với thông tin publisher và category
$query = "SELECT books.*, 
                 publishers.name AS publisher_name, 
                 categories.name AS category_name
          FROM books
          LEFT JOIN publishers ON books.publisher_id = publishers.id
          LEFT JOIN categories ON books.category_id = categories.id";

// Nếu có category_id, thêm điều kiện WHERE
if ($category_id !== null) {
    $query .= " WHERE books.category_id = ?";
}

$stmt = $conn->prepare($query);

if ($stmt) {
    if ($category_id !== null) {
        $stmt->bind_param("i", $category_id);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $books = [];

        while ($row = $result->fetch_assoc()) {
            // Kiểm tra nếu đường dẫn `image` là tương đối, bổ sung URL Cloudinary nếu cần
            if (!filter_var($row['image'], FILTER_VALIDATE_URL)) {
                $cloudinary_base_url = "https://res.cloudinary.com/duk8odqun/image/upload/";
                $row['image'] = $cloudinary_base_url . ltrim($row['image'], "/");
            }

            $books[] = $row;
        }

        echo json_encode($books, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["message" => "Không có sách nào trong cơ sở dữ liệu"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "Lỗi khi chuẩn bị truy vấn: " . $conn->error]);
}

$conn->close();
?>
