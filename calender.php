<?php
session_start();
include 'koneksi.php';

$query = "SELECT id, judul, isi, tanggal 
          FROM pengumuman 
          WHERE status = 'aktif'
          ORDER BY tanggal DESC";

$result = mysqli_query($koneksi, $query);

$newsData = [];

while ($row = mysqli_fetch_assoc($result)) {
  $tanggal = date('Y-m-d', strtotime($row['tanggal']));

  if (!isset($newsData[$tanggal])) {
    $newsData[$tanggal] = [];
  }

  $newsData[$tanggal][] = [
    'id'    => $row['id'],
    'judul' => $row['judul'],
    'isi'   => $row['isi']
  ];
}

?>
<script>
  const newsData = <?= json_encode($newsData); ?>;
</script>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Calendar</title>
  <link rel="stylesheet" href="calender.css">
</head>
<body>

<div class="navbar">
  <button class="back-btn" onclick="location.href='dashboard.php'">
    <img src="back.png" alt="Back"> Kembali Ke Lobby
  </button>
</div>

<div class="calendar-container">
  <div class="calendar-header">
    <button id="prev">‹</button>
    <h2 id="month-year"></h2>
    <button id="next">›</button>
  </div>
  <div class="calendar" id="calendar"></div>
</div>

<div class="popup" id="popup">
  <div class="popup-content">
    <h3 id="popup-title"></h3>
    <p id="popup-news"></p>
    <button id="close-popup">Tutup</button>
  </div>
</div>

<script>
  let newsData = <?= json_encode($newsData); ?>;
</script>
<script src="calender.js"></script>

</body>
</html>