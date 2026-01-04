<?php
require 'dompdf/vendor/autoload.php';
use Dompdf\Dompdf;

include 'koneksi.php';

$id = $_GET['id'] ?? 0;

$query = mysqli_query($koneksi, "SELECT * FROM pengumuman WHERE id='$id'");
$data = mysqli_fetch_assoc($query);

if (!$data) {
  die("Data tidak ditemukan");
}

$html = "
<h2 style='text-align:center'>PENGUMUMAN POLIBATAM</h2>
<hr>
<p><b>Judul:</b> {$data['judul']}</p>
<p><b>Tanggal:</b> {$data['tanggal']}</p>
<br>
<p>{$data['isi']}</p>
";

$pdf = new Dompdf();
$pdf->loadHtml($html);
$pdf->setPaper('A4', 'portrait');
$pdf->render();
$pdf->stream("pengumuman PoliBatam.pdf", ["Attachment" => true]);