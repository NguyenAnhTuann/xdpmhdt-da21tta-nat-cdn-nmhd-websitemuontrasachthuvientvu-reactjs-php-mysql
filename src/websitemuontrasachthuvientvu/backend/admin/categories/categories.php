<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../db_config.php";

$query = "SELECT * FROM categories";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $categories = array();
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    echo json_encode($categories);
} else {
    echo json_encode([]);
}

$conn->close();
?>
