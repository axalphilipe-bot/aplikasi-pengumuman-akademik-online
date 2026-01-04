<?php
session_start();
include 'koneksi.php';

$tanggal = $_POST['tanggal'];
$judul = $_POST['nama'];
$isi = $_POST['isi'];

$query = mysqli_query(
    $koneksi,
    "INSERT INTO pengumuman (tanggal, judul, isi, status)
     VALUES ('$tanggal','$judul','$isi','aktif')"
);

if ($query) {
    $_SESSION['active_tab'] = 'Pengumuman-PoliBatam';
    header("Location: admin.php?success=1");
    exit;
} else {
    header("Location: admin.php?error=1");
}
exit;
