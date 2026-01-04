<?php
include 'koneksi.php';

$id = $_GET['id'];
$status = $_GET['status'];

$query = "UPDATE pengumuman SET status='$status' WHERE id='$id'";
mysqli_query($koneksi, $query);

header("Location: admin.php");
exit;