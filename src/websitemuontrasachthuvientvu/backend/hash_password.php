<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    echo "Mật khẩu gốc: " . $password . "<br>";
    echo "Mật khẩu đã băm: " . $hashedPassword;
} else {
?>
    <form method="POST">
        <label>Nhập mật khẩu:</label>
        <input type="text" name="password" required>
        <button type="submit">Băm mật khẩu</button>
    </form>
<?php
}
?>
