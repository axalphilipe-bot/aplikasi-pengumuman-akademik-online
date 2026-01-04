const monthYear = document.getElementById("month-year");
const calendar = document.getElementById("calendar");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupNews = document.getElementById("popup-news");
const closePopup = document.getElementById("close-popup");

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

let currentDate = new Date();

// Fungsi untuk render kalender
function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayNames = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  dayNames.forEach(d => {
    const div = document.createElement("div");
    div.className = "day-name";
    div.textContent = d;
    calendar.appendChild(div);
  });

  const startIndex = (firstDay + 6) % 7; // Sesuaikan untuk mulai dari Senin
  for (let i = 0; i < startIndex; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const key = `${year}-${mm}-${dd}`;

    // Tambahkan titik jika ada pengumuman
    if (newsData[key] && newsData[key].length > 0) {
      div.classList.add("has-news");
    }

    // Klik tanggal untuk popup
    div.onclick = () => {
      if (newsData[key]) {
        popupTitle.textContent = `Pengumuman ${day} ${months[month]} ${year}`;
        popupNews.innerHTML = newsData[key]
          .map(p => `<b>${p.judul}</b><br>${p.isi}<br><br>`)
          .join("");
      } else {
        popupTitle.textContent = "Tidak ada pengumuman";
        popupNews.textContent = "Belum ada pengumuman pada tanggal ini.";
      }
      popup.classList.add("active");
    };

    calendar.appendChild(div);
  }
}

// Fungsi AJAX untuk refresh data (opsional, panggil ini setelah add/hide/delete)
function refreshNewsData() {
  fetch('get_news.php') // Buat file PHP terpisah untuk return JSON data pengumuman
    .then(response => response.json())
    .then(data => {
      newsData = data; // Update data
      renderCalendar(currentDate); // Re-render kalender
    })
    .catch(error => console.error('Error refreshing data:', error));
}

// Navigasi bulan
document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

closePopup.onclick = () => popup.classList.remove("active");

// Load pertama
renderCalendar(currentDate);

function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayNames = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  dayNames.forEach(d => {
    const div = document.createElement("div");
    div.className = "day-name";
    div.textContent = d;
    calendar.appendChild(div);
  });

  let startIndex = (firstDay + 6) % 7; // start Monday

  for (let i = 0; i < startIndex; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const key = `${year}-${mm}-${dd}`; // format Y-m-d

    if (newsData[key] && newsData[key].length > 0) {
      div.classList.add("has-news");
    }
    
    div.onclick = () => {
      if(newsData[key]) {
        popupTitle.textContent = `Pengumuman ${day} ${months[month]} ${year}`;
        popupNews.innerHTML = newsData[key].map(p => `<b>${p.judul}</b><br>${p.isi}<br><br>`).join('');
      } else {
        popupTitle.textContent = 'Tidak ada pengumuman';
        popupNews.textContent = 'Belum ada pengumuman pada tanggal ini.';
      }
      popup.classList.add('active');
    };
    calendar.appendChild(div);
  }
}