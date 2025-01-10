<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../../db_config.php';

$response = ["status" => "error", "requests" => []];

$sql = "
    SELECT 
        br.id AS request_id, 
        br.book_id, 
        br.quantity, 
        br.user_id, 
        br.return_date, 
        br.status, 
        br.created_at, 
        b.id AS book_id,
        b.image AS book_image,
        b.title AS book_title,
        b.author AS book_author,
        b.publisher_id AS book_publisher_id,
        b.publication_date AS book_publication_date,
        c.name AS category_name, -- Lấy tên thể loại
        u.name AS user_name, 
        u.date AS user_date, 
        u.class AS user_class, 
        u.major AS user_major, 
        u.faculty AS user_faculty, 
        u.school AS user_school, 
        u.phone AS user_phone, 
        u.email AS user_email, 
        u.address AS user_address
    FROM 
        borrow_requests br
    JOIN 
        books b ON br.book_id = b.id
    JOIN 
        categories c ON b.category_id = c.id -- Kết hợp bảng categories
    JOIN 
        users u ON br.user_id = u.id
    ORDER BY 
        br.created_at DESC
";


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
    $response["status"] = "success";
    $response["requests"] = $requests;
} else {
    $response["message"] = "Không có dữ liệu";
}

echo json_encode($response);
?>
