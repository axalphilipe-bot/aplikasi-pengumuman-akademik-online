<?php
include 'koneksi.php';

$id = $_POST['id'];
$tanggal = $_POST['tanggal'];
$judul = $_POST['judul'];
$isi = $_POST['isi'];

mysqli_query($koneksi, "
    UPDATE pengumuman 
    SET tanggal='$tanggal', judul='$judul', isi='$isi'
    WHERE id='$id'
");

header("Location: admin.php");