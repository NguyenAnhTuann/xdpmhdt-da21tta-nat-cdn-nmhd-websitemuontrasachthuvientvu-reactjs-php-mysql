<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "db_config.php";

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nhận dữ liệu từ client
$data = json_decode(file_get_contents("php://input"));

// Kiểm tra dữ liệu nhận được
if (!$data) {
    echo json_encode(["message" => "Dữ liệu không hợp lệ"]);
    exit;
}

if (
    isset($data->name) &&
    isset($data->password) &&
    isset($data->date) &&
    isset($data->class) &&
    isset($data->major) &&
    isset($data->faculty) &&
    isset($data->school) &&
    isset($data->phone) &&
    isset($data->email) &&
    isset($data->address)
) {
    $name = $data->name;
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $date = $data->date;
    $class = $data->class;
    $major = $data->major;
    $faculty = $data->faculty;
    $school = $data->school;
    $phone = $data->phone;
    $email = $data->email;
    $address = $data->address;

    // Kiểm tra trùng số điện thoại
    $checkPhoneStmt = $conn->prepare("SELECT id FROM Users WHERE phone = ?");
    $checkPhoneStmt->bind_param("s", $phone);
    $checkPhoneStmt->execute();
    $resultPhone = $checkPhoneStmt->get_result();

    if ($resultPhone->num_rows > 0) {
        echo json_encode(["message" => "Số điện thoại đã tồn tại"]);
        exit;
    }
    $checkPhoneStmt->close();

    // Kiểm tra trùng email
    $checkEmailStmt = $conn->prepare("SELECT id FROM Users WHERE email = ?");
    $checkEmailStmt->bind_param("s", $email);
    $checkEmailStmt->execute();
    $resultEmail = $checkEmailStmt->get_result();

    if ($resultEmail->num_rows > 0) {
        echo json_encode(["message" => "Email đã tồn tại"]);
        exit;
    }
    $checkEmailStmt->close();

    // Chèn dữ liệu nếu không có trùng lặp
    $stmt = $conn->prepare("INSERT INTO Users (name, password, date, class, major, faculty, school, phone, email, address) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $name, $password, $date, $class, $major, $faculty, $school, $phone, $email, $address);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        echo json_encode(["message" => "Đăng ký thất bại", "error" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["message" => "Thiếu dữ liệu cần thiết"]);
}

$conn->close();
