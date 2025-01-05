<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "websitemuontrasachthuvientvu";

// Kết nối MySQL
$conn = new mysqli($host, $user, $password, $db);
$conn->set_charset("utf8mb4");

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}
?>
