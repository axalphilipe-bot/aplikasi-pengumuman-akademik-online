document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const sendBtn = document.getElementById('sendBtn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      msg.style.color = 'crimson';
      msg.textContent = 'Harap isi semua kolom.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Mengirim...';
  });

  
  const mapWrapper = document.getElementById('mapWrapper');
  if (mapWrapper) {
    mapWrapper.addEventListener('click', () => {
      window.open(
        'https://goo.gl/maps/Hy2qXqg3d3u7Yq1c8',
        '_blank'
      );
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".contact-box");
  box.style.opacity = 0;
  box.style.transform = "translateY(20px)";
  
  setTimeout(() => {
    box.style.transition = "all 0.6s ease";
    box.style.opacity = 1;
    box.style.transform = "translateY(0)";
  }, 150);
});
