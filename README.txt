RICH PRINTING & ADVERTISING — WEBSITE
======================================

FOLDER STRUCTURE
  index.html        Home
  services.html     Services
  about.html        About
  contact.html      Contact
  css/style.css     All styles (shared across every page)
  js/script.js      All behaviour (shared across every page)
  images/           Site images — logo.svg lives here

LOGO
  images/logo.png is a placeholder CMYK dot mark standing in for your real
  logo. Replace it with your actual logo file (swap the file, or add your
  own e.g. images/logo.png and update the image and favicon references
  across the HTML files — nav, hero, and footer images plus the favicon).

ADDING A NEW PAGE
  1. Copy an existing page (e.g. contact.html) as a starting point.
  2. Update <title>, the meta description, and the <body data-page="...">
     value to a new unique name.
  3. Add a matching <a href="newpage.html" data-page-link="...."> entry to
     the nav-links block and the footer "Explore" list on every page,
     including the new one.
  4. Add any page-only CSS to the bottom of css/style.css rather than
     inline, so every page stays visually consistent.

HOW THE PARTS WORK
  - Header and footer markup is duplicated at the top/bottom of every HTML
    file (plain HTML has no native include mechanism), but all styling and
    behaviour lives in the two shared files, so editing css/style.css or
    js/script.js updates every page at once.
  - The active nav link is highlighted automatically by js/script.js,
    based on the data-page attribute on <body> matching the data-page-link
    attribute on each nav/footer link — no manual "active" class needed.
  - The English / Amharic toggle is saved to the browser's local storage,
    so a visitor's language choice carries over as they move between pages.
  - The contact form on contact.html is front-end only. To make it send
    real messages, wire the id="contactForm" submit handler in
    js/script.js to an email service, form backend (e.g. Formspree), or
    your own API endpoint.
