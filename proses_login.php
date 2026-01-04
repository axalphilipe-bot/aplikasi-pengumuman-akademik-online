<?php
session_start();
include "koneksi.php";

$email    = mysqli_real_escape_string($koneksi, $_POST['email']);
$password = mysqli_real_escape_string($koneksi, $_POST['password']);

$query = mysqli_query(
    $koneksi,
    "SELECT * FROM admin WHERE email='$email' AND password='$password'"
);

if (mysqli_num_rows($query) > 0) {
    $data = mysqli_fetch_assoc($query);


    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_id']        = $data['id'];
    $_SESSION['admin_email']     = $data['email'];
    $_SESSION['admin_nama']      = $data['nama']; 

    header("Location: admin.php");
    exit;
} else {
    echo "<script>
        alert('Email atau password salah!');
        window.location='login.php';
    </script>";
}
?>