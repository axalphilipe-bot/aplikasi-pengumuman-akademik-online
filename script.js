document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.sidebar li[data-page]');
    const pageContents = document.querySelectorAll('.page-content');
    const passwordToggles = document.querySelectorAll('.show-password');

    /* ===============================
       RESTORE TAB AKTIF SETELAH RELOAD
    =============================== */
    const savedTab = sessionStorage.getItem('activeTab');

    if (savedTab) {
        navItems.forEach(nav => nav.classList.remove('active'));
        pageContents.forEach(page => page.classList.remove('active-page'));

        const activeNav = document.querySelector(`.sidebar li[data-page="${savedTab}"]`);
        const activePage = document.getElementById(savedTab);

        if (activeNav) activeNav.classList.add('active');
        if (activePage) activePage.classList.add('active-page');
    }

    /* ===============================
       NAVIGATION CLICK
    =============================== */
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPageId = this.getAttribute('data-page');

            // SIMPAN TAB AKTIF
            sessionStorage.setItem('activeTab', targetPageId);

            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            pageContents.forEach(content => content.classList.remove('active-page'));

            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.add('active-page');
            }
        });
    });

    /* ===============================
       TOGGLE PASSWORD
    =============================== */
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
});

/* ===============================
   SEARCH PENGUMUMAN
=============================== */
const searchInput = document.getElementById('searchPengumuman');

if (searchInput) {
    searchInput.addEventListener('keyup', function () {
        const keyword = this.value.toLowerCase();
        const rows = document.querySelectorAll('.row-pengumuman');

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(keyword) ? '' : 'none';
        });
    });
}

/* ===============================
   EDIT MODAL PENGUMUMAN
=============================== */
document.addEventListener('DOMContentLoaded', function () {
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('editId').value = this.dataset.id;
            document.getElementById('editTanggal').value = this.dataset.tanggal;
            document.getElementById('editJudul').value = this.dataset.judul;
            document.getElementById('editIsi').value = this.dataset.isi;
        });
    });
});

/* ===============================
   OPEN dashboard.php IN NEW TAB
=============================== */
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);

    if (params.get('open_dashboard') === '1') {
        // buka dashboard.php di tab baru
        window.open('dashboard.php', '_blank');

        // hapus param supaya tidak buka tab lagi saat refresh
        params.delete('open_dashboard');
        const newUrl = window.location.pathname + '?' + params.toString();
        window.history.replaceState({}, document.title, newUrl);
    }
});


const urlTab = new URLSearchParams(window.location.search).get('tab');

if (urlTab) {
    sessionStorage.setItem('activeTab', urlTab);
}

/* ===============================
   SEARCH & FILTER ARSIP
=============================== */
const searchArsip = document.getElementById('searchArsip');
const filterTanggalArsip = document.getElementById('filterTanggalArsip');
const resetFilterArsip = document.getElementById('resetFilterArsip');

function filterArsip() {
    const keyword = searchArsip.value.toLowerCase();
    const tanggalFilter = filterTanggalArsip.value;

    const rows = document.querySelectorAll('.row-arsip');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const tanggalRow = row.dataset.tanggal;

        let show = true;

        if (keyword && !text.includes(keyword)) {
            show = false;
        }

        if (tanggalFilter && tanggalRow !== tanggalFilter) {
            show = false;
        }

        row.style.display = show ? '' : 'none';
    });
}

if (searchArsip) {
    searchArsip.addEventListener('keyup', filterArsip);
}

if (filterTanggalArsip) {
    filterTanggalArsip.addEventListener('change', filterArsip);
}

if (resetFilterArsip) {
    resetFilterArsip.addEventListener('click', () => {
        searchArsip.value = '';
        filterTanggalArsip.value = '';
        filterArsip();
    });
}

/* ===============================
   OPEN DASHBOARD IN NEW TAB
=============================== */
document.addEventListener('DOMContentLoaded', function () {
    const dashboardBtn = document.getElementById('openDashboard');

    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', function () {
            window.open('dashboard.php', '_blank');
        });
    }
});
