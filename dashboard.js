
const gridBtn = document.getElementById('gridBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

gridBtn.addEventListener('click', e => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', e => {
  if (!gridBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
     dropdownMenu.classList.remove('show');
  }
});

const searchBtn = document.getElementById("searchBtn");
const filterPanel = document.getElementById("filterPanel");
const searchInput = document.getElementById("searchInput");
const notifList = document.querySelectorAll(".notif-box");

const resultContainer = document.createElement("div");
resultContainer.id = "searchResults";
resultContainer.style.marginTop = "10px";
filterPanel.appendChild(resultContainer);


let panelTerbuka = false;


function tampilkanHasil() {
  
  if (panelTerbuka) {
    filterPanel.classList.remove("show");
    panelTerbuka = false;
    return;
  }

  const keyword = searchInput.value.toLowerCase().trim();
  let hasil = "";

  notifList.forEach(box => {
    const title = box.querySelector("h3").textContent.toLowerCase();
    const content = box.querySelector("p").textContent.toLowerCase();
    const date = box.querySelector(".tanggal").textContent.toLowerCase();

    if (title.includes(keyword) || content.includes(keyword) || date.includes(keyword)) {
      hasil += `
        <div class="result-item" style="
          background:#eee;
          border-radius:10px;
          padding:10px;
          margin-bottom:10px;
        ">
          <h4 style="color:#3f51b5">${box.querySelector("h3").textContent}</h4>
          <p>${box.querySelector("p").textContent}</p>
          <span style="font-size:13px;color:#555;">${box.querySelector(".tanggal").textContent}</span>
        </div>
      `;
    }
  });

  if (hasil === "") {
    hasil = "<p style='text-align:center;color:#777;'>Tidak ada pengumuman yang cocok.</p>";
  }

  resultContainer.innerHTML = hasil;
  filterPanel.classList.add("show");
  panelTerbuka = true;
}


searchBtn.addEventListener("click", tampilkanHasil);


searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") tampilkanHasil();
});



searchBtn.addEventListener("click", tampilkanHasil);
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter" || e.key.length === 1) tampilkanHasil();
});


const notifBoxes = document.querySelectorAll(".notif-box");
const popup = document.getElementById("editPopup");
const titleInput = document.getElementById("editTitle");
const contentInput = document.getElementById("editContent");
const dateInput = document.getElementById("editDate");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

let currentBox = null;

notifBoxes.forEach(box => {
  box.addEventListener("click", () => {
    currentBox = box;
    const titleEl = box.querySelector("h3");
    const contentEl = box.querySelector("p");
    const dateEl = box.querySelector(".tanggal");

    titleInput.value = titleEl.textContent;
    contentInput.value = contentEl.textContent;
    dateInput.value = dateEl.textContent.replace("Diterbitkan: ", "");
    popup.style.display = "flex";
  });
});

saveEdit.addEventListener("click", () => {
  if (currentBox) {
    const titleEl = currentBox.querySelector("h3");
    const contentEl = currentBox.querySelector("p");
    const dateEl = currentBox.querySelector(".tanggal");

    titleEl.textContent = titleInput.value;
    contentEl.textContent = contentInput.value;
    dateEl.textContent = "Diterbitkan: " + dateInput.value;

    popup.style.display = "none";
  }
});

cancelEdit.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", e => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});


const addBtn = document.getElementById("addNewsBtn");
const addPopup = document.getElementById("addPopup");
const saveNew = document.getElementById("saveNew");
const cancelNew = document.getElementById("cancelNew");
const contentSection = document.querySelector(".content");

addBtn.addEventListener("click", () => {
  addPopup.style.display = "flex";
});

cancelNew.addEventListener("click", () => {
  addPopup.style.display = "none";
  clearAddForm();
});

saveNew.addEventListener("click", () => {
  const title = document.getElementById("newTitle").value.trim();
  const content = document.getElementById("newContent").value.trim();
  const date = document.getElementById("newDate").value.trim();

  if (!title || !content || !date) {
    alert("Harap isi semua kolom!");
    return;
  }

  const newBox = document.createElement("div");
  newBox.classList.add("notif-box");
  newBox.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <span class="tanggal">Diterbitkan: ${date}</span>
  `;

  const judulSection = document.querySelector(".judul-section");
  contentSection.insertBefore(newBox, judulSection.nextElementSibling.nextElementSibling);

  newBox.addEventListener("click", () => {
    currentBox = newBox;
    titleInput.value = title;
    contentInput.value = content;
    dateInput.value = date;
    popup.style.display = "flex";
  });

  addPopup.style.display = "none";
  clearAddForm();
});

function clearAddForm() {
  document.getElementById("newTitle").value = "";
  document.getElementById("newContent").value = "";
  document.getElementById("newDate").value = "";
}

addPopup.addEventListener("click", e => {
  if (e.target === addPopup) addPopup.style.display = "none";
});
