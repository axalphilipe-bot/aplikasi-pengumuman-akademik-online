<?php
session_start();
include 'koneksi.php';

$query = "SELECT * FROM pengumuman ORDER BY tanggal DESC";
$result = mysqli_query($koneksi, $query);
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Admin - Aplikasi Pengumuman Akademik Online</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="background"></div>
  <div class="login-container">
    <img src="logo.png" alt="Polibatam Logo" class="logo" />
    <h2>Aplikasi Pengumuman Akademik Online</h2>
    <h3>ADMIN</h3>
<form action="proses_login.php" method="POST">

  <input type="email" name="email" placeholder="Enter email" required />

  <div class="password-wrapper">
    <input type="password" id="password" name="password" placeholder="Password" required />

  </div>

  <button type="submit">Log In</button>
</form>

    <p class="footer">© 2025 Akademik Online - Politeknik Negeri Batam</p>
  </div>
<script>
</script>
</body>
</html>
