/* ============================================================
   Muoch Gatluak — Portfolio shared scripts
   Builds nav + footer, handles theme, menu, reveal, skill bars,
   project filtering and the scroll-to-top control.
   ============================================================ */

const SITE = {
  name: "Muoch Gatluak",
  role: "Frontend Developer • IT & Business Professional",
  tagline: "Building ideas. Creating solutions. Making an impact.",
  email: "muochkuothmamiit@gmail.com",
  phone: "+251 989407436",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/",
  github: "https://github.com/",
  whatsapp: "https://wa.me/211927100141",
};

/* Top-level navigation: five destinations.
   The other topics are no longer separate pages — their content is merged
   into the body of its parent page:
     About      -> Education
     Experience -> Skills
     Services   -> Projects, Writing                                        */
const NAV = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "leadership.html", label: "Experience" },
  { href: "services.html", label: "Services" },
  { href: "contact.html", label: "Contact" },
];

/* All nine links sit in the horizontal desktop pill. Below the drawer
   breakpoint they stack vertically in the full-screen menu. */
const NAV_CTA = { href: "cv.html", label: "Download CV" };

/* Viewport width above which the nav renders inline (otherwise the drawer). */
const NAV_DESKTOP = 1040;

/* Real brand marks, inlined so there is no icon-font dependency. */
const ICON = {
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 18.179 24 12.044c0-6.627-5.373-12-12-12"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103.428.047 1.135.113 1.823.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12S0 5.373 0 12.044c0 5.628 4.874 10.35 11.101 11.647"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.058-.52-.115-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>',
  email:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2h20l-10 7L2 6zm0 2.9l9.5 6.65a1 1 0 0 0 1 0L22 8.9V18H2z"/></svg>',
};

/* ---- Theme: apply early to avoid flash (also inline in <head>) ---- */
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
  const links = NAV.map((n) => {
    const active = n.href === here;
    return `<li><a href="${n.href}"${
      active ? ' class="active" aria-current="page"' : ""
    }>${n.label}</a></li>`;
  }).join("");

  return `
  <nav class="navbar" aria-label="Primary">
    <div class="container nav-inner">
      <a href="index.html" class="brand" aria-label="${SITE.name} — home">
        <img class="brand-mark" src="assets/img/me.jpg" alt="" width="30" height="30" />
        <span class="brand-text">Muoch<span>.</span></span>
      </a>
      <ul class="nav-links" id="navLinks">${links}</ul>
      <div class="nav-actions">
        <a href="${NAV_CTA.href}" class="nav-cta">${NAV_CTA.label}</a>
        <button class="theme-toggle" id="themeToggle" aria-label="Switch to light theme">
          <span id="themeIcon" aria-hidden="true">&#9681;</span>
        </button>
        <button class="hamburger" id="hamburger" aria-label="Open menu"
                aria-controls="navLinks" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <button class="scroll-top" id="scrollTop" aria-label="Scroll back to top" hidden>
    <span aria-hidden="true">&#8679;</span>
  </button>`;
}

function buildFooter() {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}">${n.label}</a></li>`
  ).join("");

  return `
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <h4>${SITE.name}</h4>
        <p class="footer-role">${SITE.role}</p>
        <p>${SITE.tagline}</p>
        <div class="socials">
          <a href="${SITE.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICON.github}</a>
          <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.linkedin}</a>
          <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
          <a href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
          <a href="mailto:${SITE.email}" aria-label="Email">${ICON.email}</a>
        </div>
      </div>
      <div class="footer-explore">
        <h4>Explore</h4>
        <ul class="footer-nav">${links}</ul>
      </div>
      <div class="footer-contact">
        <h4>Get in touch</h4>
        <ul>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></li>
          <li><a href="cv.html">Download CV</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year"></span> ${SITE.name}. All rights reserved.</p>
      <p class="footer-tagline">${SITE.tagline}</p>
    </div>
  </footer>`;
}

function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const paint = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (icon) icon.innerHTML = isLight ? "&#9789;" : "&#9681;";
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  };
  paint();
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    paint();
  });
}

function setupMenu() {
  const ham = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  if (!ham || !links) return;
  const close = () => {
    links.classList.remove("open");
    ham.setAttribute("aria-expanded", "false");
  };
  ham.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    ham.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > NAV_DESKTOP) close();
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
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

function setupSkillLines() {
  const lists = document.querySelectorAll(".skill-card ul");
  if (!lists.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lists.forEach((ul) => ul.classList.add("skills-armed"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("skills-live");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  lists.forEach((ul) => io.observe(ul));
}

/* Project filtering: [data-filter] buttons + [data-cat] cards */
function setupFilters() {
  const bar = document.querySelector("[data-filter-group]");
  if (!bar) return;
  const cards = Array.from(document.querySelectorAll("[data-cat]"));
  const empty = document.querySelector("[data-filter-empty]");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn || !bar.contains(btn)) return;

    const wanted = btn.dataset.filter;
    bar.querySelectorAll("[data-filter]").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    let shown = 0;
    cards.forEach((card) => {
      const cats = (card.dataset.cat || "").split(/\s+/);
      const match = wanted === "all" || cats.includes(wanted);
      card.hidden = !match;
      if (match) shown += 1;
    });

    if (empty) empty.hidden = shown !== 0;
  });
}

function setupScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  const sync = () => {
    btn.hidden = window.scrollY < 400;
  };
  window.addEventListener("scroll", sync, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  sync();
}

document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("nav-root");
  const footMount = document.getElementById("footer-root");
  if (navMount) navMount.innerHTML = buildNav();
  if (footMount) footMount.innerHTML = buildFooter();

  setupTheme();
  setupMenu();
  setupReveal();
  setupSkillLines();
  setupFilters();
  setupScrollTop();

  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const given = (data.get("subject") || "").trim();
      const subject = encodeURIComponent(
        given || `Portfolio message from ${data.get("name")}`
      );
      const body = encodeURIComponent(
        `${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    });
  }
});
