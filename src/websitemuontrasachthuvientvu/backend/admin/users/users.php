<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../db_config.php"; // Chú ý đường dẫn tới `db_config.php`

$query = "SELECT * FROM users";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode([]);
}

$conn->close();
?>
