const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupNews = document.getElementById("popup-news");
const closePopup = document.getElementById("close-popup");

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

let currentDate = new Date();


const newsData = {
  "2025-11-08": "UTS dimulai pada tanggal 28 Oktober 2025. Pastikan seluruh mahasiswa mempersiapkan diri.",
  "2025-11-05": "Kampus akan libur pada tanggal 1 November 2025 dalam rangka peringatan Hari Sumpah Pemuda.",
  "2025-11-04": "Segera daftarkan tim kamu untuk mengikuti lomba inovasi teknologi tingkat nasional.",
};

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
    div.classList.add("day-name");
    div.textContent = d;
    calendar.appendChild(div);
  });


  const startIndex = (firstDay + 6) % 7;
  for (let i = 0; i < startIndex; i++) {
    const emptyDiv = document.createElement("div");
    calendar.appendChild(emptyDiv);
  }


  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.classList.add("day");
    div.textContent = day;
  
const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
if (newsData[key]) {
  div.classList.add("has-news");
}


    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      div.classList.add("today");
    }

    div.addEventListener("click", () => {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (newsData[key]) {
        popupTitle.textContent = `Pengumuman ${day} ${months[month]} ${year}`;
        popupNews.textContent = newsData[key];
      } else {
        popupTitle.textContent = `Tidak ada pengumuman`;
        popupNews.textContent = "Belum ada pengumuman untuk tanggal ini.";
      }
      popup.classList.add("active");
    });

    calendar.appendChild(div);
  }
}

document.getElementById("prev").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("next").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});


closePopup.addEventListener("click", () => popup.classList.remove("active"));

renderCalendar(currentDate);
 