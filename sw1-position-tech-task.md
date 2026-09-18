# SW1 Position — Technical Task

## Overview

Build a small single-page application that reads country data from a provided JSON file (standing in for an API endpoint) and displays it as a grid of cards. This task is meant to be doable in a focused sitting — we care more about how you approach the problem than about a polished, feature-complete product.

**Suggested time budget:** 2–4 hours, inclusive of the AI-collaboration section below. This is a guideline, not a hard deadline — take the time you need to feel good about what you submit, but don't over-engineer it.

You'll present your finished app to us afterward — running it on your local dev server during the walkthrough is completely fine, no need to deploy it anywhere.

---

## The Data

You're given a file called **`countries.json`**. Treat it as if it were the response from a `GET /countries` API endpoint — fetch/read it the same way you would a real API response (e.g. via `fetch('/countries.json')`), rather than just importing it as a static JS object, so the app is structured the way it would be against a real backend.

Each country object has the following fields:

```json
{
  "name": "France",
  "shortInfo": "A Western European country celebrated for its art, cuisine, and architecture.",
  "image": "https://flagcdn.com/w320/fr.png",
  "continent": "Europe",
  "capital": "Paris",
  "language": "French",
  "population": 68000000,
  "totalArea": 551695
}
```

The file contains 30 countries across all six continents, each with a longer descriptive blurb in `shortInfo`.

---

## Choose Your Stack

**React is preferred** (Create React App, Vite, or Next.js — your choice) or another framework/library you're comfortable with is also acceptable.

**Styling is your choice too** — plain CSS, CSS Modules, CSS-in-JS, or **Tailwind CSS** if you prefer it. Whatever you pick, use theme-able values (CSS custom properties, or Tailwind's `dark:` variant/theme config) rather than one-off hardcoded colors, since you'll need a light/dark theme (see requirements below).

**Bonus:** Write it in **TypeScript** instead of plain JS (works for any stack).

---

## Main Requirements (must-have)

1. **Fetch/read the data** from `countries.json` and render each country as a card (image, name, short info, continent, capital, language, population, total area).
2. **Semantic, accessible HTML** — use proper elements (`<main>`, `<section>`, `<article>`/`<ul>`+`<li>` for the card list, headings in a sensible order, `alt` text on images, sufficient color contrast, keyboard-navigable interactive elements). We'll be checking this against basic accessibility standards (e.g. WCAG basics — think "would this pass a Lighthouse accessibility audit reasonably well").
3. **Color-code cards by continent** — cards from different continents should have a visually distinct background/accent color, so continents are easy to tell apart at a glance (e.g. Europe = one color, Asia = another, etc.), with a legend if it helps clarity.
4. **Light/dark theme toggle** — implement a way to switch between a light and dark theme (a simple button/switch is fine; persisting the choice across reloads is a nice-to-have, not required). Continent colors and text must stay legible and reasonably accessible (contrast) in **both** themes — don't just invert everything and hope for the best.
5. **Show only 12 cards** on the page at a time. No pagination and no infinite scroll needed — just cap the display at 12 (however you choose to select which 12, e.g. first 12 in the file, is fine, unless you're doing the sorting/filtering bonus, in which case it should be the first 12 of the current sorted/filtered result).
6. **Responsive layout** — the grid should look good and be usable on phone, tablet, and desktop widths.
7. **Error state / handling** — if the fetch fails (try it — e.g. temporarily point the fetch at a wrong path), show a friendly fallback message instead of a blank page or console error.
8. **Git repository** — commit your work with a reasonably sensible commit history (more than one giant "final commit"), with meaningful, descriptive commit messages that reflect what changed and why.
9. **README** — a short one explaining:
   - How to install and run the project locally
   - Which stack you chose (and why, briefly)
   - Anything you'd improve with more time

---

## Bonus Points (optional — pick as many or as few as you like)

- **TypeScript** instead of JavaScript, with reasonable typing (no `any` everywhere).
- **Sorting and filtering** — e.g. sort alphabetically, by population, or by area (ascending/descending), and/or filter by continent or search by name.
- **Loading state** — since reading a local JSON file is instant, artificially delay it (e.g. wrap the fetch in a `setTimeout`/`Promise` delay of ~1–2 seconds) to simulate a real API call, and show a visible loading indicator (spinner, skeleton, "Loading countries…" text, etc.) during that delay.

*(Feel free to swap in your own third bonus idea if something else better shows off your skills — we'd rather see one thing done well than everything done halfway.)*

---

## Working With AI Tools (required)

Pick **one requirement or bonus item** from above and build it primarily by prompting an AI coding assistant (Claude, Copilot, Cursor, ChatGPT, Windsurf, or whatever you normally use) rather than hand-writing it yourself first. Then add a short section to your README (or a separate `AI_NOTES.md`) covering:

1. The prompt(s) you used — verbatim, or close to it.
2. What the AI got right vs. wrong on the first pass.
3. At least one thing you changed, rejected, or fixed after reviewing its output, and why.
4. Whether you'd trust that output to ship as-is, and what you'd double-check before doing so.

We're not testing *whether* you use AI tools — we assume you do, and so do we. We're testing whether you can **direct them well and catch their mistakes**, since that's the actual day-to-day skill on this team.

---

## Submission

Please share a link to your Git repository (GitHub, GitLab, etc.) ahead of your presentation. You'll walk us through the app and your code choices using your local dev server.

---
