# Practical Project: Bookmark Manager

A small app for saving and browsing links, organized by category. It's deliberately shaped like
your Section 5 shop project (list page + add-item form + admin-style route) but in a different
domain, so you have to think through the structure yourself instead of copy-pasting.

**Rule for this project: no database, no view engine (EJS/Pug), no sessions/auth.** Everything
you need was already covered in Section 5. If you find yourself wanting one of those, it means
you're reaching for a future-section concept — stop and find the Section-5-only way instead.

---

## 1. What you're reinforcing

Map each requirement below back to something you already built in Section 5:

| Concept | Where you already used it |
|---|---|
| `express.Router()` + modular route files | `routes/admin.js`, `routes/shop.js` |
| `express.static()` for CSS | `public/css/*.css` served via `app.use(express.static(...))` |
| `path` module + a root-dir helper | `util/path.js` |
| `res.sendFile()` for static HTML pages | `add-product.html`, `shop.html` |
| `express.urlencoded()` + reading `req.body` | `router.post('/product', ...)` |
| `res.redirect()` after a POST (redirect-after-post) | admin → `/` after adding a product |
| A catch-all 404 middleware as the last `app.use` | your `404.html` handler |
| Building an HTML *string* with a template literal in a route handler (no view engine) | the commented-out `res.send(\`<h1>URL: ${req.url}</h1>\`)` examples in `app.js` |

The last row is the one new trick this project needs: when you want a page to show data that
changes (a list of bookmarks), and you don't have a view engine yet, you build the HTML as a
string inside the route handler and send it with `res.send(...)`, instead of `res.sendFile(...)`
on a fixed file. Loop over your data with `.map()` and join the pieces into one big string.

---

## 2. The app

**Pages:**

1. `GET /` — Home page. Shows every saved bookmark, grouped or labeled by category. Built
   dynamically (data can change), so this is a `res.send()` + template literal page, not a static
   `.html` file.
2. `GET /add-bookmark` — A static form page (`res.sendFile`) with fields: **title**, **url**,
   **category**, **notes** (optional).
3. `POST /bookmarks` — Reads the submitted form fields from `req.body`, stores a new bookmark
   object in memory, logs it to the console, then redirects back to `/`.
4. Catch-all 404 page for anything else, same pattern as your existing one.

**Data storage:** a plain JavaScript array living in its own module (e.g. a `data/` or `models/`
folder), exporting the array plus a couple of small functions to read/add to it. Routes should
`require` that module rather than holding the array themselves — this is the same reason you
split `admin.js` and `shop.js` into their own files: keep concerns separated.

Yes, the data resets every time the server restarts. That's expected — persistence is a later
section's problem, not this one's.

---

## 3. Suggested folder structure

Work this out yourself, but here's the shape to aim for (names are suggestions, not requirements):

```
Bookmark_Manager/
  app.js
  util/
    path.js
  data/
    bookmarks.js        <-- in-memory array + helper functions live here
  routes/
    bookmarks.js         <-- GET /, GET /add-bookmark, POST /bookmarks
  views/
    add-bookmark.html
    404.html
  public/
    css/
      general.css
      main.css
```

---

## 4. Core requirements checklist

- [ ] `npm init` a fresh project here, install `express` (and `nodemon` as a dev dependency)
- [ ] `util/path.js` that resolves the project root the same way your Section 5 one does
- [ ] One `express.Router()` for the bookmark routes, mounted in `app.js`
- [ ] `express.static` serving a `public/css` folder
- [ ] `express.urlencoded({ extended: true })` registered **before** your routes
- [ ] Home page (`/`) renders all current bookmarks from the in-memory array, with title,
      category, and a clickable link (`<a href="...">`) for each one
- [ ] If there are zero bookmarks, show a friendly "nothing saved yet" message instead of an
      empty list
- [ ] `/add-bookmark` form page, served as a static file
- [ ] `POST /bookmarks` validates nothing fancy, just pushes the new entry and redirects
- [ ] 404 page + catch-all middleware, mirroring your existing setup
- [ ] At least two CSS files, one shared/general and one page-specific — same pattern as your
      `general.css` / `404.css` split

---

## 5. Stretch goals (optional — only attempt after the core works)

These nudge slightly past Section 5 on purpose. Treat them as a preview of what's coming, not a
requirement:

- **Category filter:** `GET /?category=tech` — read `req.query.category` and only show matching
  bookmarks. (Introduces `req.query`, which you haven't used yet but is a natural next step from
  `req.body`/`req.params`.)
- **Delete a bookmark:** a small form or link per bookmark that POSTs to `/bookmarks/delete`
  with the bookmark's id/index, removes it from the array, and redirects home.
- **Basic validation:** if `title` or `url` is empty on submit, redirect back to `/add-bookmark`
  instead of saving a broken entry.

---

## 6. How to know you're done

Run the server, then manually walk through:

1. Visit `/` with no bookmarks saved — see the empty-state message.
2. Visit `/add-bookmark`, submit a valid bookmark — you land back on `/` and see it listed.
3. Submit two or three more with different categories.
4. Visit a nonsense URL like `/whatever` — see your styled 404 page, not Express's default error.
5. Restart the server — confirm bookmarks are gone (proves you understand *why*: no persistence
   yet, data lives only in memory).

If all five work without touching a database or a templating engine, you've genuinely internalized
Section 5 — routing, middleware ordering, static file serving, form handling, and building
response HTML by hand.
