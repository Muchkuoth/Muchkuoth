# Muoch Gatluak — Personal Portfolio

A modern, responsive, multi-page portfolio website for **Muoch Gatluak** — Frontend
Developer, IT & Business Professional, Data Analyst, Author and Entrepreneur.

## Features

- **Multi-page site**: Home, About (with Education), Experience (with Skills), Services
  (with Projects and Writing), Contact, and a printable CV.
- **Luna palette** (Sky Aqua, Ocean Teal, Deep Marine, Midnight Blue, Abyss Navy)
  on an abyss-navy base, plus a light theme.
- **Dark / light mode** toggle (preference saved in the browser).
- **Filterable project grid** — All, Web Development, Business, Data, Database,
  Networking, Design.
- **Downloadable CV** via a print-optimised stylesheet.
- Fully **responsive & mobile-first** with a full mobile drawer menu.
- **SEO optimised**: unique titles/descriptions, canonical URLs, Open Graph, Twitter card,
  JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`.
- **Accessibility**: skip-friendly landmarks, ARIA labels, keyboard-navigable filters,
  visible focus states, Escape closes the mobile menu.
- Lazy-loaded images, smooth scrolling, scroll-reveal animations, and a scroll-to-top button.

## Tech

Plain **HTML5, CSS3 and vanilla JavaScript** — no build step, no framework, no dependencies
beyond the Inter webfont and a Font Awesome icon set on the contact page.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Customising

Places to edit first, all marked with an `EDIT:` comment in the source:

- **Personal details** — the `SITE` object at the top of `js/main.js` (name, role, email,
  phone, social links). Social links in the footer and the hero are generated from it.
- **Navigation** — the `NAV` array in `js/main.js` drives the top menu and the footer.
- **Statistics** — the `.stat` blocks in `index.html` and `about.html` currently show an
  em dash. Replace with your real figures.
- **Dates, institutions and employers** — the Education section in `about.html`, the
  experience timelines in `leadership.html`, and `cv.html`.
- **Project links** — the "View Project" / "GitHub" buttons in the Projects section of
  `services.html` currently point at placeholder URLs.
- **Filter categories** — the `data-filter` buttons and the `data-cat` attributes in
  `services.html` must be kept in sync.
- **Profile photo** — `assets/img/me.jpg`.
- **Copy** — each topic is a `<section>` with an `id`, so a page can grow without
  splitting into more files.

## Structure

Six live pages. The top menu has **five** entries; the other topics live inside the
body of their parent page.

```
index.html        Hero, services, about, skills, writing teaser, CTA
about.html        About Me  +  #education      (education timeline)
leadership.html   Experience +  #skills         (skills + toolbox)
services.html     Services  +  #projects       (filterable project grid)
                           +  #writing        (featured book)
                           +  #publications   (articles, essays, poetry)
contact.html      Contact details + message form
cv.html           Printable / downloadable CV
assets/img/       All site images (profile photo, service and project artwork)
css/style.css     Design system: tokens, layout, components, responsive rules
js/main.js        Nav, footer, theme, menu, reveal, filters, scroll-to-top
KONDIAAL/         Separate standalone business-site demo, with its own images
```

Service anchors: `#web #data #planning #digital #branding #documents #writing #support`.

`education.html`, `skills.html`, `projects.html` and `book.html` are kept only as
**redirect stubs** to their new locations, so old links and bookmarks still work.
They are safe to delete.

Navigation order groups related pages together: **About → Education**,
**Experience → Skills**, **Services → Projects → Writing**.

## Design system reference

Layout was validated against a 736px reference. Key measurements at that width:

| Element            | Value                                  |
| ------------------ | -------------------------------------- |
| Container          | 636px wide, 50px gutters               |
| Nav pill           | 218px, centred, 4 primary links        |
| Service/skill grid | 4 columns, 142px cards, 22px gap       |
| Approach row       | 3 columns                               |
| Stats row          | narrow, centred                         |

The full desktop structure holds down to 720px; the layout collapses below that, and the nav
becomes a drawer below 680px.
