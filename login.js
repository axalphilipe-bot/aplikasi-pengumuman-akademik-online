document.getElementById("loginBtn").addEventListener("click", function() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Email dan password wajib diisi!");
    return;
  }

  if (!email.includes("@")) {
    alert("Email harus mengandung karakter '@'!");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }


  alert("Login Berhasil!");
window.location.href = "dashboard.html";
});
