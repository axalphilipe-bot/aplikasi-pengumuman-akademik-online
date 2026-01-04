/* =============================
   HAMBURGER MENU
============================= */
const gridBtn = document.getElementById("gridBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

gridBtn.addEventListener("click", e => {
  e.stopPropagation();
  gridBtn.classList.toggle("active");
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", e => {
  if (!gridBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    gridBtn.classList.remove("active");
    dropdownMenu.classList.remove("show");
  }
});

/* =============================
   SEARCH + FILTER (KETIK & KLIK)
============================= */
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const filterPanel = document.getElementById("filterPanel");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const resultContainer = document.getElementById("searchResults");
const notifList = document.querySelectorAll(".notif-box");

let debounceTimer = null;

/* ==== OPEN / CLOSE PANEL ==== */
function openPanel() {
  filterPanel.classList.add("show");
}

function closePanel() {
  filterPanel.classList.remove("show");
}

/* ==== KETIK LANGSUNG SEARCH ==== */
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    openPanel();
    tampilkanHasil();
  }, 250);
});

/* ==== KLIK TOMBOL SEARCH ==== */
searchBtn.addEventListener("click", e => {
  e.stopPropagation();
  openPanel();
  tampilkanHasil();
});

/* ==== FILTER TANGGAL ==== */
[startDateInput, endDateInput].forEach(input => {
  input.addEventListener("change", () => {
    openPanel();
    tampilkanHasil();
  });
});

/* ==== CORE FILTER FUNCTION ==== */
function tampilkanHasil() {
  const keyword = searchInput.value.toLowerCase().trim();
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  let html = "";
  let total = 0;

  notifList.forEach(box => {
    const judul = box.dataset.judul.toLowerCase();
    const isi = box.dataset.isi.toLowerCase();
    const tanggal = box.dataset.tanggal;

    const cocokKeyword =
      !keyword || judul.includes(keyword) || isi.includes(keyword);

    const cocokTanggal =
      (!startDate || tanggal >= startDate) &&
      (!endDate || tanggal <= endDate);

    if (cocokKeyword && cocokTanggal) {
      total++;
      html += `
        <div class="result-item"
          data-id="${box.dataset.id}"
          data-judul="${box.dataset.judul}"
          data-isi="${box.dataset.isi}"
          data-tanggal="${tanggal}">
          <h4>${box.dataset.judul}</h4>
          <p>${box.dataset.isi.substring(0, 80)}...</p>
          <span>📅 ${tanggal}</span>
        </div>
      `;
    }
  });

  resultContainer.innerHTML = total
    ? html
    : `
      <div class="empty-state">
        ❌ Tidak ada pengumuman<br>
        <small>Ubah keyword atau tanggal</small>
      </div>
    `;
}

/* ==== KLIK HASIL ==== */
resultContainer.addEventListener("click", e => {
  const item = e.target.closest(".result-item");
  if (!item) return;

  bukaPopup(
    item.dataset.id,
    item.dataset.judul,
    item.dataset.isi,
    item.dataset.tanggal
  );
});

/* ==== AUTO RESET ==== */
function autoReset() {
  if (
    !searchInput.value &&
    !startDateInput.value &&
    !endDateInput.value
  ) {
    closePanel();
    resultContainer.innerHTML = "";
  }
}

searchInput.addEventListener("blur", autoReset);
startDateInput.addEventListener("blur", autoReset);
endDateInput.addEventListener("blur", autoReset);

/* ==== CLICK OUTSIDE ==== */
document.addEventListener("click", e => {
  if (
    !filterPanel.contains(e.target) &&
    !searchInput.contains(e.target) &&
    !searchBtn.contains(e.target)
  ) {
    autoReset();
  }
});

/* =============================
   DETAIL POPUP
============================= */
const detailPopup = document.getElementById("detailPopup");
const detailJudul = document.getElementById("detailJudul");
const detailIsi = document.getElementById("detailIsi");
const detailTanggal = document.getElementById("detailTanggal");
const closeDetail = document.getElementById("closeDetail");
const downloadBtn = document.getElementById("downloadBtn");

let currentId = null;

notifList.forEach(box => {
  box.addEventListener("click", () => {
    bukaPopup(
      box.dataset.id,
      box.dataset.judul,
      box.dataset.isi,
      box.dataset.tanggal
    );
  });
});

function bukaPopup(id, judul, isi, tanggal) {
  currentId = id;
  detailJudul.textContent = judul;
  detailIsi.textContent = isi;
  detailTanggal.textContent = "📅 Diterbitkan: " + tanggal;
  detailPopup.style.display = "flex";
}

closeDetail.addEventListener("click", () => {
  detailPopup.style.display = "none";
});

downloadBtn.addEventListener("click", () => {
  if (!currentId) return;
  window.location.href = "download_pdf.php?id=" + currentId;
});

/* =============================
   SCROLL REVEAL
============================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

notifList.forEach(box => observer.observe(box));
