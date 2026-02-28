// ============================================
//  CreativeSpace Studio — script.js
//  Grace Rajagukguk | CodingCamp Mini Project
// ============================================

// ---- 1. TAMPILKAN NAMA DI HOMEPAGE ----
// Nama Grace langsung ditampilkan saat halaman dibuka
const userName = "Grace";
document.getElementById("username-display").textContent = userName;


// ---- 2. NAVIGASI ANTAR HALAMAN ----
function showSection(sectionId, clickedLink) {
  // Sembunyikan semua section
  const allSections = document.querySelectorAll(".section");
  allSections.forEach(function(sec) {
    sec.classList.remove("active");
  });

  // Tampilkan section yang dipilih
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update style navbar link (yang aktif jadi hijau)
  const allLinks = document.querySelectorAll(".nav-link");
  allLinks.forEach(function(link) {
    link.classList.remove("active");
  });

  if (clickedLink) {
    clickedLink.classList.add("active");
  } else {
    // Kalau dipanggil dari tombol (bukan navbar), update navbar otomatis
    allLinks.forEach(function(link) {
      const href = link.getAttribute("href");
      if (href === "#" + sectionId) {
        link.classList.add("active");
      }
    });
  }

  // Tutup menu mobile kalau terbuka
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.remove("open");

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ---- 3. HAMBURGER MENU (MOBILE) ----
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("open");
}


// ---- 4. VALIDASI & SUBMIT FORM ----
function submitForm() {
  // Ambil nilai dari semua field
  const name    = document.getElementById("f-name").value.trim();
  const date    = document.getElementById("f-date").value;
  const message = document.getElementById("f-message").value.trim();

  // Ambil nilai gender (radio button)
  const genderOptions = document.querySelectorAll('input[name="gender"]');
  let gender = "";
  genderOptions.forEach(function(radio) {
    if (radio.checked) {
      gender = radio.value;
    }
  });

  // Reset semua pesan error dulu
  document.getElementById("err-name").textContent    = "";
  document.getElementById("err-date").textContent    = "";
  document.getElementById("err-gender").textContent  = "";
  document.getElementById("err-message").textContent = "";

  // Cek validasi — semua field wajib diisi
  let isValid = true;

  if (name === "") {
    document.getElementById("err-name").textContent = "⚠ Name is required.";
    isValid = false;
  }

  if (date === "") {
    document.getElementById("err-date").textContent = "⚠ Please select a date.";
    isValid = false;
  }

  if (gender === "") {
    document.getElementById("err-gender").textContent = "⚠ Please select your gender.";
    isValid = false;
  }

  if (message === "") {
    document.getElementById("err-message").textContent = "⚠ Message cannot be empty.";
    isValid = false;
  }

  // Kalau semua valid, tampilkan hasilnya
  if (isValid) {
    // Format tanggal agar lebih mudah dibaca
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Tampilkan data form di halaman
    const resultBox     = document.getElementById("form-result");
    const resultContent = document.getElementById("result-content");

    resultContent.innerHTML =
      "<p><strong>Name:</strong> " + name + "</p>" +
      "<p><strong>Date:</strong> " + formattedDate + "</p>" +
      "<p><strong>Gender:</strong> " + gender + "</p>" +
      "<p><strong>Message:</strong> " + message + "</p>";

    resultBox.style.display = "block";

    // Scroll ke kotak hasil
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });

    // Reset form setelah submit
    document.getElementById("f-name").value    = "";
    document.getElementById("f-date").value    = "";
    document.getElementById("f-message").value = "";
    genderOptions.forEach(function(radio) {
      radio.checked = false;
    });
  }
}
