// === Dropdown (sudah ada di kode kamu) ===
const gridBtn = document.getElementById('gridBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
gridBtn.addEventListener('click', e => {
  e.stopPropagation();
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', e => {
  if (!gridBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = 'none';
  }
});

// === Berita Section ===
const addNewsBtn = document.getElementById("addNewsBtn");
const newsBoxes = document.querySelectorAll(".news-box");

addNewsBtn.addEventListener("click", () => {
  let index = prompt("Pilih kotak berita (1 - 3):");
  let isi = prompt("Masukkan isi berita:");

  if (index >= 1 && index <= 3 && isi.trim() !== "") {
    const box = document.getElementById(`news${index}`);
    box.querySelector("p").textContent = isi;
  } else {
    alert("Input tidak valid.");
  }
});
