<?php
session_start();
include 'koneksi.php';

$query = "SELECT * FROM pengumuman WHERE status = 'aktif' ORDER BY tanggal DESC";
$result = mysqli_query($koneksi, $query);

?>

<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pemberitahuan Polibatam</title>
  <link rel="stylesheet" href="dashboard.css">
</head>

<body>
<div class="top-white"></div>

<div class="wave-divider">
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
    <path d="M0,40 C150,80 350,0 600,40 850,80 1050,20 1200,40 L1200,120 L0,120 Z"></path>
  </svg>
</div>

  <nav class="navbar">
    <div class="left-section">
      <div class="hamburger-icon" id="gridBtn">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src="poli2.png" alt="Polibatam Logo" class="logo">
    </div>

    <div class="search-area">
      <input type="text" id="searchInput" placeholder="Search..." />
      <button id="searchBtn"><img src="search.png"></button>
      <button id="filterBtn" class="hidden">Filter</button>
    
  <div class="filter-panel" id="filterPanel">

  <div class="filter-row">
    <label>Dari Tanggal</label>
    <input type="date" id="startDate">
  </div>

  <div class="filter-row">
    <label>Sampai Tanggal</label>
    <input type="date" id="endDate">
  </div>

  <button id="applyFilter">Terapkan Filter</button>

  <div id="searchResults"></div>
</div>

</div>
    <div class="dropdown" id="dropdownMenu">
      <button class="menu-btn" onclick="location.href='calender.php'"><img src="calendar.png">Kalender</button>
      <button class="menu-btn" onclick="location.href='kontak.php'"><img src="telephone.png">Kontak</button>
      <button class="menu-btn" onclick="location.href='login.php'"><img src="key.png">Login Admin</button>
    </div>
</nav>
  <section class="banner">
    <img src="poli1.png" alt="Banner" />
  </section>

  <section class="content">
    <h2 class="judul-section">
      <img src="pengumuman.png" alt="Pengumuman" class="icon-pengumuman">
      Pengumuman Terbaru
    </h2>

    <?php if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true): ?>
      </button>
    <?php endif; ?>
    </div>

    <div id="newsContainer">
      <?php
      if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
         echo '<div class="notif-box"
  data-id="'.$row['id'].'"
  data-judul="'.htmlspecialchars($row['judul']).'"
  data-isi="'.htmlspecialchars($row['isi']).'"
  data-tanggal="'.$row['tanggal'].'"
>';

          echo '<div class="notif-header">';
          echo '<h3 class="notif-title">' . $row['judul'] . '</h3>';
          echo '</div>';

          echo '<p class="notif-content">' . $row['isi'] . '</p>';

          echo '<div class="notif-footer">';
          echo '<span class="tanggal">📅 Diterbitkan: ' . $row['tanggal'] . '</span>';
          echo '</div>';

          echo '</div>';

        }

      }
      ?>
    </div>
  </section>

<div class="popup-overlay" id="detailPopup">
  <div class="popup-box">
    <h2 id="detailJudul"></h2>
    <p id="detailIsi"></p>
    <span id="detailTanggal"></span>

    <div class="popup-actions">
  <button id="downloadBtn">⬇ Download PDF</button>
  <button id="closeDetail">Tutup</button>
</div>

<div class="popup-overlay" id="searchPopup">
  <div class="popup-box">
    <h2>Hasil Pencarian</h2>

    <div id="popupSearchResults"></div>

    <div class="popup-actions">
      <button id="closeSearchPopup">Tutup</button>
    </div>
  </div>
</div>

  <script src="dashboard.js"></script>

</body>

</html>