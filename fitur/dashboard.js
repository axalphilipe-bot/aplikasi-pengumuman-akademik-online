
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

const searchBtn = document.getElementById("searchBtn");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");

searchBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("show");

  if (filterPanel.classList.contains("show")) {
    filterBtn.classList.remove("hidden");
  } else {
    filterBtn.classList.add("hidden");
  }
});

const notifBoxes = document.querySelectorAll(".notif-box");

notifBoxes.forEach(box => {
  box.addEventListener("click", () => {
    const titleEl = box.querySelector("h3");
    const contentEl = box.querySelector("p");
    const dateEl = box.querySelector(".tanggal");

    const newTitle = prompt("Ubah judul pengumuman:", titleEl.textContent);
    const newContent = prompt("Ubah isi pengumuman:", contentEl.textContent);
    const newDate = prompt("Ubah tanggal diterbitkan:", dateEl.textContent.replace("Diterbitkan: ", ""));

    if (newTitle && newContent && newDate) {
      titleEl.textContent = newTitle;
      contentEl.textContent = newContent;
      dateEl.textContent = "Diterbitkan: " + newDate;
    }
  });
});
