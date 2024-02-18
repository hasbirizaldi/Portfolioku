var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function openTab(tabName) {
  for (var tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }

  for (var tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// Scroll Nav
window.addEventListener("scroll", function () {
  const header = document.querySelector("nav");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// navigation menu items active on page scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let id = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".navbar a[href*=" + id + "]").classList.add("active");
    } else {
      document.querySelector(".navbar a[href*=" + id + "]").classList.remove("active");
    }
  });
});

// theme btn
const themeBtn = document.querySelector(".btn-theme");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.classList.toggle("dark");

  localStorage.setItem("saved-theme", getCurrentTheme());
  localStorage.setItem("saved-icon", getCurrentIcon());
});

const getCurrentTheme = () => (document.body.classList.contains("dark") ? "dark" : "light");
const getCurrentIcon = () => (document.body.classList.contains("sun") ? "sun" : "moon");

const savedTheme = localStorage.getItem("saved-theme");
const savedIcon = localStorage.getItem("saved-icon");

if (savedTheme) {
  document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark");
  themeBtn.classList[savedIcon === "fa-sun" ? "add" : "remove"]("fa-sun");
}

// Scroll
const scrollTopBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function () {
  scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});
scrollTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
// Scroll End

// Navbar Side Menu
var sideMenu = document.getElementById("sideMenu");
var links = document.querySelectorAll("nav ul li a");
var bars = document.getElementById("bars");
console.log(bars);

function openMenu() {
  sideMenu.style.right = "0";
  // bars.style.display = "none";
}

function closeMenu() {
  sideMenu.style.right = "-100%";
  // bars.style.display = "block";
}

links.forEach((links) => {
  links.addEventListener("click", () => {
    sideMenu.style.right = "-100%";
    // bars.style.display = "block";
  });
});

// Navbar Side Menu End

// google Sheet
const scriptURL = "https://script.google.com/macros/s/AKfycbx5M9r5Dyki5et02OCHlLPpvE3HLT152zXia6VZ8aZK8RdCNcuAZmJAU8BLB3RSvNfs4Q/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.classList.add("active");
      setTimeout(function () {
        msg.classList.remove("active");
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
