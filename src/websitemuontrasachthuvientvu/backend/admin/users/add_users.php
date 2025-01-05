<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once "../../db_config.php";

// Lấy dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra các trường bắt buộc
if (isset($data['name'], $data['password'], $data['date'], $data['class'], $data['major'], $data['faculty'], $data['school'], $data['phone'], $data['email'], $data['address'])) {
    $name = $conn->real_escape_string($data['name']);
    $password = password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT); // Mã hóa mật khẩu
    $date = $conn->real_escape_string($data['date']);
    $class = $conn->real_escape_string($data['class']);
    $major = $conn->real_escape_string($data['major']);
    $faculty = $conn->real_escape_string($data['faculty']);
    $school = $conn->real_escape_string($data['school']);
    $phone = $conn->real_escape_string($data['phone']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);

// Không cần kiểm tra định dạng ngày sinh hoặc chuyển đổi
$date = $conn->real_escape_string($data['date']);
    

    // Kiểm tra định dạng số điện thoại
    if (!preg_match('/^\d{10}$/', $phone)) {
        echo json_encode(["success" => false, "message" => "Số điện thoại phải là 10 chữ số"]);
        exit();
    }

    // Kiểm tra số điện thoại không được trùng
    $phoneCheckQuery = "SELECT * FROM users WHERE phone='$phone'";
    $phoneCheckResult = $conn->query($phoneCheckQuery);
    if ($phoneCheckResult && $phoneCheckResult->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Số điện thoại đã được sử dụng"]);
        exit();
    }

    // Kiểm tra định dạng email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Email không hợp lệ"]);
        exit();
    }

    // Câu lệnh SQL thêm mới
    $query = "INSERT INTO users (name, password, date, class, major, faculty, school, phone, email, address) VALUES ('$name', '$password', '$date', '$class', '$major', '$faculty', '$school', '$phone', '$email', '$address')";

    if ($conn->query($query)) {
        $newId = $conn->insert_id;
        echo json_encode(["success" => true, "message" => "Thêm người dùng mới thành công"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm người dùng mới: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Nhập đầy đủ các trường ..."]);
}

$conn->close();
?>
