<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Kontak</title>
  <link rel="stylesheet" href="kontak.css">
</head>
<body>
<div class="wave-container">
  <svg class="wave wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path d="M0,160 C240,220 480,80 720,100 960,120 1200,220 1440,180 L1440,0 L0,0 Z"></path>
  </svg>

  <svg class="wave wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path d="M0,200 C240,120 480,240 720,200 960,160 1200,120 1440,150 L1440,0 L0,0 Z"></path>
  </svg>
</div>

  <header class="site-header">
    <div class="header-inner">
        <button class="back-btn" onclick="window.location.href='dashboard.php'"><b><img src="back.png"> Kembali Ke Lobby</b></button>
      </a>    
    </div>
  </header>

  
  <main class="container">
    <section class="contact-section">
      <div class="contact-box">
        <div class="map-side">
          <iframe
            id="gmap-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0578635578677!2d104.04625331515994!3d1.1186783625851826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98921856ddfab%3A0xf9d9fc65ca00c9d!2sPoliteknik%20Negeri%20Batam!5e0!3m2!1sid!2sid!4v1635766362889!5m2!1sid!2sid"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

     
        <div class="info-side">
          <h2>Hubungi Kami</h2>
          <div class="info-item">
            <h3>Alamat</h3>
            <p>Jl. Ahmad Yani, Batam Kota,<br>Kota Batam, Kepulauan Riau, Indonesia</p>
          </div>
          <div class="info-item">
            <h3>Telepon</h3>
            <p>+62-778-469858 Ext.1017</p>
          </div>
          <div class="info-item">
            <h3>WhatsApp</h3>
            <p>0821-7255-7099</p>
          </div>
          <div class="info-item">
            <h3>Fax</h3>
            <p>+62-778-463620</p>
          </div>
          <div class="info-item">
            <h3>Email</h3>
            <p>
              <a href="mailto:humashumas@polibatam.ac.id">humashumas@polibatam.ac.id</a><br>
              <a href="mailto:info@polibatam.ac.id">info@polibatam.ac.id</a>
            </p>
          </div>
        </div>
      </div>
    </section>

  <script src="kontak.js"></script>
</body>
</html>
