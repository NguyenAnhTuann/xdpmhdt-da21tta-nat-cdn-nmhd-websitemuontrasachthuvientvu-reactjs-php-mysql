<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include_once "db_config.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Kiểm tra tài khoản admin
    $query_admin = "SELECT * FROM admins WHERE email = ?";
    $stmt_admin = $conn->prepare($query_admin);
    $stmt_admin->bind_param("s", $email);
    $stmt_admin->execute();
    $result_admin = $stmt_admin->get_result();

    if ($result_admin->num_rows > 0) {
        $admin = $result_admin->fetch_assoc();
        if (password_verify($password, $admin['password'])) {
            echo json_encode(["status" => "success", "role" => "admin", "user" => $admin]);
            exit();
        } else {
            echo json_encode(["status" => "error", "message" => "Mật khẩu không đúng"]);
            exit();
        }
    }

    // Kiểm tra tài khoản người dùng
    $query_user = "SELECT * FROM users WHERE email = ?";
    $stmt_user = $conn->prepare($query_user);
    $stmt_user->bind_param("s", $email);
    $stmt_user->execute();
    $result_user = $stmt_user->get_result();

    if ($result_user->num_rows > 0) {
        $user = $result_user->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo json_encode(["status" => "success", "role" => "user", "user" => $user]);
            exit();
        } else {
            echo json_encode(["status" => "error", "message" => "Mật khẩu không đúng"]);
            exit();
        }
    }

    echo json_encode(["status" => "error", "message" => "Email không tồn tại"]);
} else {
    echo json_encode(["status" => "error", "message" => "Vui lòng nhập đầy đủ thông tin!"]);
}

$conn->close();
?>
