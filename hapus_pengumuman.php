<?php
include "koneksi.php";

if (isset($_GET['id'])) {

    $id = $_GET['id'];

    $sql = "DELETE FROM pengumuman WHERE id = '$id'";

    if (mysqli_query($koneksi, $sql)) {
        header("Location: Admin.php");
        exit;
    } else {
        echo "Data gagal dihapus";
    }

} else {
    echo "ID tidak ditemukan";
}
?>