<?php
session_start();
include 'koneksi.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Pengumuman Akademik Online</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="logo kampus.png" type="jpg/png">
</head>

<body>

    <div class="containers">


        <header class="header">
            <div class="header-left">
                <img src="poli2.png" width="100" alt="Logo PoliBatam" class="logo">
            </div>
            <div class="header-right">
                <i class="fas fa-user-circle"></i>
                <span><?= $_SESSION['admin_nama']; ?></span>
            </div>
        </header>


        <div class="main-wrapper">


            <nav class="sidebar">
                <span class="nav-title">Navigasi</span>
                <ul>

                    <li data-page="Pengumuman-PoliBatam" class="active">
                        <i class="fas fa-book"></i> Pengumuman
                    </li>

                    <li data-page="Arsip">
                        <i class="fas fa-archive"></i> Arsip Pengumuman
                    </li>
                    <li id="openDashboard">
                        <i class="fas fa-chart-line"></i> Dashboard
                    </li>

                    <button type="button"
                        style="background-color: rgba(0, 0, 0, 0); border: none; color: #f4f4f4; cursor: pointer;"
                        data-bs-toggle="modal" data-bs-target="#logout">
                        <li style="padding-right: 150px;">
                            <i class="fas fa-sign-out-alt"></i> Log Out
                        </li>
                    </button>
                </ul>
            </nav>

            <main class="content-area">
                <?php if (isset($_GET['success'])): ?>
                    <div class="alert alert-success">
                        Pengumuman berhasil ditambahkan.
                    </div>
                <?php endif; ?>


                <div id="Pengumuman-PoliBatam" class="page-content active-page">
                    <h1>Pengumuman PoliBatam</h1>

                    <div class="data-actions">
                        <button class="add-button" data-bs-toggle="modal" data-bs-target="#tambahDataModal">
                            <i class="fas fa-plus"></i> Tambah Data
                        </button>

                        <div class="search-box">
                            <input type="text" id="searchPengumuman" placeholder="Search pengumuman...">
                            <i class="fas fa-search"></i>
                        </div>

                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Judul</th>
                                    <th>Pengumuman</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $query = mysqli_query(
                                    $koneksi,
                                    "SELECT * FROM pengumuman WHERE status='aktif' ORDER BY tanggal DESC"
                                );

                                while ($row = mysqli_fetch_assoc($query)) {
                                    ?>
                                    <tr class="row-pengumuman">
                                        <td><?= date('d/m/Y', strtotime($row['tanggal'])); ?></td>
                                        <td><?= htmlspecialchars($row['judul']); ?></td>
                                        <td><?= htmlspecialchars($row['isi']); ?></td>
                                        <td>


                                            <button class="action-btn edit-btn" data-id="<?= $row['id']; ?>"
                                                data-judul="<?= htmlspecialchars($row['judul']); ?>"
                                                data-isi="<?= htmlspecialchars($row['isi']); ?>"
                                                data-tanggal="<?= $row['tanggal']; ?>" data-bs-toggle="modal"
                                                data-bs-target="#editModal">
                                                <i class="fas fa-edit"></i>
                                            </button>


                                            <a href="toggle_status.php?id=<?= $row['id']; ?>&status=arsip"
                                                onclick="return confirm('Sembunyikan pengumuman ini?')">
                                                <button class="action-btn" style="background:#ffc107;">
                                                    <i class="fas fa-eye-slash"></i>
                                                </button>

                                                <a href="hapus_pengumuman.php?id=<?= $row['id']; ?>"
                                                    onclick="return confirm('Yakin ingin menghapus?')">
                                                    <button class="action-btn delete-btn">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </a>
                                        </td>
                                    </tr>
                                <?php } ?>
                            </tbody>

                        </table>
                    </div>

                    <div class="pagination">
                        <p class="data-info">
                            Data diatas adalah data Pengumuman diakhir, diurutkan Pengumuman yang terakhir mengisi
                        </p>
                        <div>
                            <button>Previous</button>
                            <span class="current-page">1</span>
                            <button>Next</button>
                        </div>
                    </div>
                </div>


                <div id="dashboard" class="page-content">
                    <h1>Data Kunjungan</h1>

                    <div class="dashboard">
                        <div class="card">
                            <h3>Pengumuman <br>hari ini</h3>
                            <p class="number">5</p>
                            <i class="fas fa-list icon"></i>
                        </div>

                        <div class="card">
                            <h3>Pengumuman minggu ini</h3>
                            <p class="number">20</p>
                            <i class="fas fa-list icon"></i>
                        </div>

                        <div class="card">
                            <h3>Pengumuman bulan ini</h3>
                            <p class="number">50</p>
                            <i class="fas fa-list icon"></i>
                        </div>
                    </div>
                </div>

                <div id="Arsip" class="page-content">
                    <h1>Arsip Pengumuman</h1>

                    <div class="data-actions" style="margin-bottom:15px;">
                        <div class="search-box">
                            <input type="text" id="searchArsip" placeholder="Cari arsip...">
                            <i class="fas fa-search"></i>
                        </div>

                        <div style="display:flex; gap:10px;">
                            <input type="date" id="filterTanggalArsip" class="form-control">
                            <button class="btn btn-secondary" id="resetFilterArsip">Reset</button>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Judul</th>
                                <th>Pengumuman</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php
                            $arsip = mysqli_query(
                                $koneksi,
                                "SELECT * FROM pengumuman WHERE status='arsip' ORDER BY tanggal DESC"
                            );

                            while ($row = mysqli_fetch_assoc($arsip)) {
                                ?>
                                <tr class="row-arsip" data-tanggal="<?= $row['tanggal']; ?>">

                                    <td><?= date('d/m/Y', strtotime($row['tanggal'])); ?></td>
                                    <td><?= $row['judul']; ?></td>
                                    <td><?= $row['isi']; ?></td>
                                    <td>
                                        <a href="toggle_status.php?id=<?= $row['id']; ?>&status=aktif"
                                            onclick="return confirm('Tampilkan kembali pengumuman ini?')">
                                            <button class="action-btn" style="background:#0dcaf0;">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </a>



                                        </a>
                                    </td>
                                </tr>
                            <?php } ?>

                        </tbody>
                    </table>

                </div>

            </main>
        </div>

    </div>

    <div class="modal" id="logout" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Keluar</h1>
                </div>
                <div class="modal-body">
                    Anda yakin ingin keluar?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                    <a href="logout.php">

                        <button type="button" class="btn btn-success"
                            style="background-color: #ff004cff; color: white;">
                            Keluar
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="tambahDataModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5">Pengisian Data</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <form action="tambah_pengumuman.php" method="post">
                        <div class="mb-3">
                            <label class="form-label">Tanggal</label>
                            <input type="date" class="form-control" name="tanggal" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Judul</label>
                            <input type="text" class="form-control" name="nama" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Pengumuman</label>
                            <input type="text" class="form-control" name="isi" required>
                        </div>

                        <button type="submit" class="btn btn-primary">Simpan</button>

                    </form>
                </div>

            </div>
        </div>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <form method="POST" action="edit_pengumuman.php" class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Edit Pengumuman</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <input type="hidden" name="id" id="editId">

                    <div class="mb-3">
                        <label>Tanggal</label>
                        <input type="date" class="form-control" name="tanggal" id="editTanggal">
                    </div>

                    <div class="mb-3">
                        <label>Judul</label>
                        <input type="text" class="form-control" name="judul" id="editJudul">
                    </div>

                    <div class="mb-3">
                        <label>Pengumuman</label>
                        <textarea class="form-control" name="isi" id="editIsi"></textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary">Simpan</button>
                </div>

            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>

</body>

</html>