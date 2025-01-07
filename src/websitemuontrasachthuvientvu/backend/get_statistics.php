<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once "db_config.php";

// Kiểm tra kết nối cơ sở dữ liệu
if (!$conn) {
    die(json_encode(["error" => "Không thể kết nối cơ sở dữ liệu."]));
}

// Thống kê người dùng mượn sách nhiều nhất tháng
$sqlTopUsers = "SELECT users.name, COUNT(borrow_requests.id) AS borrow_count
                FROM borrow_requests
                INNER JOIN users ON borrow_requests.user_id = users.id
                WHERE MONTH(borrow_requests.created_at) = MONTH(CURDATE())
                GROUP BY users.name
                ORDER BY borrow_count DESC
                LIMIT 5";

$resultTopUsers = $conn->query($sqlTopUsers);
if (!$resultTopUsers) {
    die(json_encode(["error" => "Truy vấn topUsers thất bại: " . $conn->error]));
}

$topUsers = $resultTopUsers->num_rows > 0 ? $resultTopUsers->fetch_all(MYSQLI_ASSOC) : [];

// Thống kê sách được mượn nhiều nhất tháng
$sqlTopBooks = "SELECT books.title, COUNT(borrow_requests.id) AS borrow_count
                FROM borrow_requests
                INNER JOIN books ON borrow_requests.book_id = books.id
                WHERE MONTH(borrow_requests.created_at) = MONTH(CURDATE())
                GROUP BY books.title
                ORDER BY borrow_count DESC
                LIMIT 5";

$resultTopBooks = $conn->query($sqlTopBooks);
if (!$resultTopBooks) {
    die(json_encode(["error" => "Truy vấn topBooks thất bại: " . $conn->error]));
}

$topBooks = $resultTopBooks->num_rows > 0 ? $resultTopBooks->fetch_all(MYSQLI_ASSOC) : [];

// Thống kê loại sách có nhiều sách nhất theo available_quantity trong tháng hiện tại
$sqlTopCategories = "SELECT categories.name, SUM(books.available_quantity) AS total_quantity
                     FROM categories
                     INNER JOIN books ON books.category_id = categories.id
                     GROUP BY categories.name
                     ORDER BY total_quantity DESC";


$resultTopCategories = $conn->query($sqlTopCategories);
if (!$resultTopCategories) {
    die(json_encode(["error" => "Truy vấn topCategories thất bại: " . $conn->error]));
}

$topCategories = $resultTopCategories->num_rows > 0 ? $resultTopCategories->fetch_all(MYSQLI_ASSOC) : [];

// Trả về dữ liệu JSON
echo json_encode([
    "topUsers" => $topUsers,
    "topBooks" => $topBooks,
    "topCategories" => $topCategories
]);

// Đóng kết nối
$conn->close();
?>
