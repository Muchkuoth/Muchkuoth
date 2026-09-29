

const SITE = {
  name: "Muoch Gatluak",
  email: "muochkuothmamiit@gmail.com",
  phone: "+251 989407436",
  facebook: "https://facebook.com/muoch.gatluak",
  linkedin: "https://linkedin.com/in/muoch-gatluak",
  whatsapp: "https://wa.me/211927100141",
};

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "education.html", label: "Education" },
  { href: "skills.html", label: "Skills" },
  { href: "services.html", label: "Services" },
  { href: "projects.html", label: "Projects" },
  { href: "book.html", label: "Book" },
  { href: "leadership.html", label: "Leadership" },
  { href: "contact.html", label: "Contact" },
];


(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function buildNav() {
  const here = currentPage();
  const links = NAV.map(
    (n) =>
      `<li><a href="${n.href}" class="${n.href === here ? "active" : ""}">${n.label}</a></li>`
  ).join("");

  return `
  <nav class="navbar">
    <div class="container nav-inner">
      <a href="index.html" class="brand">
        <span class="brand-mark">MG</span> Muoch Gatluak<span>.</span>
      </a>
      <ul class="nav-links" id="navLinks">${links}</ul>
      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">Dark</button>
        <button class="hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>`;
}

function buildFooter() {
  const links = NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("");
  return `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h4>Muoch Gatluak</h4>
        <p>Web Developer, Writer &amp; Upcoming Author. IT &amp; Business Management student
        passionate about words, design, technology and leadership.</p>
        <div class="socials" style="margin-top:18px;">
          <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
          <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
          <a href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>
          <a href="mailto:${SITE.email}" aria-label="Email">@</a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>${links}</ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></li>
          <li><a href="cv.html">Download CV</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © <span id="year"></span> muochgatluak. Crafted with passion, words &amp; code.
    </div>
  </footer>`;
}

function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  const setIcon = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    toggle.textContent = isLight ? "light" : "Dark";
  };
  setIcon();
  toggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIcon();
  });
}

function setupMenu() {
  const ham = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  ham.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          // animate skill bars within revealed block
          e.target.querySelectorAll(".skill-bar span").forEach((bar) => {
            bar.style.width = bar.dataset.level || "0%";
          });
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((i) => io.observe(i));
}

document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("nav-root");
  const footMount = document.getElementById("footer-root");
  if (navMount) navMount.innerHTML = buildNav();
  if (footMount) footMount.innerHTML = buildFooter();

  setupTheme();
  setupMenu();
  setupReveal();

  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(
        `${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    });
  }
});
