<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once "../../db_config.php";

// Lấy dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra các trường bắt buộc
if (isset($data['id'], $data['name'], $data['date'], $data['class'], $data['major'], $data['faculty'], $data['school'], $data['phone'], $data['email'], $data['address'])) {
    // Dữ liệu nhập vào
    $id = (int)$data['id'];
    $name = $conn->real_escape_string($data['name']);
    $password = isset($data['password']) ? password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT) : null;
    $date = $conn->real_escape_string($data['date']);
    $class = $conn->real_escape_string($data['class']);
    $major = $conn->real_escape_string($data['major']);
    $faculty = $conn->real_escape_string($data['faculty']);
    $school = $conn->real_escape_string($data['school']);
    $phone = $conn->real_escape_string($data['phone']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);

// Sử dụng trực tiếp ngày sinh từ request
$date = $conn->real_escape_string($data['date']);

    // Kiểm tra định dạng số điện thoại
    if (!preg_match('/^\d{10}$/', $phone)) {
        echo json_encode(["success" => false, "message" => "Số điện thoại phải là 10 chữ số"]);
        exit();
    }

    // Kiểm tra số điện thoại không được trùng (ngoại trừ người dùng hiện tại)
    $phoneCheckQuery = "SELECT * FROM users WHERE phone='$phone' AND id != $id";
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

    // Câu lệnh SQL cập nhật
    $query = "UPDATE users SET name='$name', date='$date', class='$class', major='$major', faculty='$faculty', school='$school', phone='$phone', email='$email', address='$address'";
    if ($password) {
        $query .= ", password='$password'";
    }
    $query .= " WHERE id=$id";

    // Thực thi câu lệnh
    if ($conn->query($query)) {
        echo json_encode(["success" => true, "message" => "Cập nhật thông tin người dùng thành công"]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi cập nhật thông tin người dùng: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Nhập đầy đủ các trường ..."]);
}

// Đóng kết nối
$conn->close();
?>
