<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "db_config.php";

// Nhận dữ liệu từ client
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) && isset($data->name) && isset($data->date) &&
    isset($data->class) && isset($data->major) && isset($data->faculty) &&
    isset($data->school) && isset($data->phone) && isset($data->email) && isset($data->address)
) {
    $stmt = $conn->prepare("UPDATE Users SET name=?, date=?, class=?, major=?, faculty=?, school=?, phone=?, email=?, address=? WHERE id=?");
    $stmt->bind_param("sssssssssi", 
        $data->name, $data->date, $data->class, $data->major, 
        $data->faculty, $data->school, $data->phone, $data->email, $data->address, $data->id
    );

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cập nhật thành công"]);
    } else {
        echo json_encode(["message" => "Cập nhật thất bại", "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "Dữ liệu không hợp lệ"]);
}

$conn->close();
?>
