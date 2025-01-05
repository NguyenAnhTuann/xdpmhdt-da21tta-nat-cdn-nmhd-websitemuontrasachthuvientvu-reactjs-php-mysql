<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../db_config.php";

$query = "SELECT * FROM publishers";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $publishers = array();
    while ($row = $result->fetch_assoc()) {
        $publishers[] = $row;
    }
    echo json_encode($publishers);
} else {
    echo json_encode([]);
}

$conn->close();
?>
