# HTML & CSS Course — What I Learned

Notes from the SuperSimpleDev *HTML and CSS Full Course*. The course starts from zero and ends with a working clone of the YouTube homepage. These are the concepts I picked up, in my own words, followed by a short section on how each one was used in the final project.

---

## 1. HTML basics

- **HTML** is a set of instructions the browser reads top to bottom to build the page. Every visible thing is an **element** (`<button>`, `<p>`, `<a>`, …).
- An element is an **opening tag**, some **content**, and a **closing tag** (`</p>`). Break the syntax and the browser silently drops the element.
- **Attributes** live inside the opening tag and change how an element behaves: `name="value"`, separated by spaces.
  - `<a href="https://youtube.com" target="_blank">` — `href` sets the destination, `target="_blank"` opens a new tab.
- **Whitespace collapses.** Multiple spaces and new lines become one space, so indentation is purely for readability (2 spaces per indent is the convention).
- **Void elements** (`<img>`, `<input>`, `<link>`) have no closing tag.
- **HTML entities** render special characters safely: `&middot;` `&check;` `&gt;`.

## 2. CSS basics

CSS changes how HTML looks. The syntax is:

```css
selector {
  property: value;
}
```

- `button { ... }` targets every button; `.subscribe-button { ... }` targets elements with `class="subscribe-button"`.
- Properties I learned early: `background-color`, `color` (text colour), `border`, `height`, `width`, `border-radius`, `cursor: pointer`, `margin-right`, `font-weight`, `font-size`.
- **Colours**: keywords (`red`), `rgb(200, 0, 0)`, `rgba(0, 0, 0, 0.15)` (the fourth value is opacity), and hex (`#1d9bf0`). `rgb(255,255,255)` is white, `rgb(0,0,0)` is black.
- **px** is the unit for almost everything. Sizes are found by trial and error.
- When I don't know a property, I search "css + what I want" (e.g. *css rounded corners → border-radius*).

## 3. Intermediate CSS: hover, transitions, shadows

- **Pseudo-classes** add styles in a given state: `.btn:hover { }` while the mouse is over it, `.btn:active { }` while clicked.
- `opacity` (0–1) fades an element; handy for hover/active feedback.
- `transition: opacity 0.15s, background-color 0.15s;` animates changes. It **must sit in the base style**, not inside `:hover`, or the hover-out snaps instantly.
- `box-shadow: x y blur color;` — e.g. `box-shadow: 5px 5px 10px rgba(0,0,0,0.15);`. Real shadows are subtle and low-opacity.
- Circles: `border-radius` of half the height/width.

## 4. Chrome DevTools

- Right-click → **Inspect** shows the live HTML and the CSS applied to any element.
- The element picker (top-left icon) jumps straight to what I hover.
- The **Computed** tab gives final values — exact colours, widths, heights, margin and padding — so I can copy real numbers instead of guessing.
- Works on any website, so it's how I find the actual styles a site uses.

## 5. The box model

Every element has, from outside in: **margin → border → padding → content**.

- `margin` = space outside the element; `padding` = space inside, around the content.
- Setting fixed `width`/`height` on buttons is fragile — the text overflows when it changes. Using `padding` lets the element size itself to its content.
- Browsers add default margins (paragraphs, body). Reset them (`margin: 0`) before applying your own.
- Inline-block elements align to the text baseline by default; `vertical-align: top` aligns them to the top instead.

## 6. Styling text

- `font-family: Roboto, Arial;` — a **font stack**: the browser uses the first font it can load.
- `font-size`, `font-weight` (400 normal, 500 medium, 700 bold), `font-style: italic`, `text-align: center`, `line-height`, `text-decoration: underline`.
- Give a paragraph a `width` to force wrapping onto more lines.
- **Text elements** style part of a line: `<strong>`, `<u>`, and the style-free `<span>`, which is the flexible one to add a class to.
- Adding `margin-left` to a span is the way to get "extra spaces" between words, since HTML collapses real spaces.
- **Grouping selectors**: `.video-author, .video-stats { }` applies one block to several classes.
- **Specificity**: when two rules set the same property, the more specific selector wins — a class (`.title`) beats an element (`p`) regardless of order.

## 7. Proper HTML structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
    <link rel="stylesheet" href="styles/general.css">
  </head>
  <body>
    <!-- everything visible -->
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser to use modern HTML.
- `<head>` holds things that aren't visible (title, stylesheets, fonts); `<body>` holds everything that is.
- Putting elements inside other elements is **nesting**.
- **External CSS** via `<link rel="stylesheet" href="...">` keeps HTML and CSS in separate, focused files.
- **File paths**: `styles/header.css` means "look in the `styles` folder beside this HTML file".
- **Google Fonts** gives a `<link>` snippet to paste into `<head>`, then the font name can be used in `font-family`.
- The VS Code **Live Server** extension reloads the page on every save.

## 8. Images and inputs

- `<img src="thumbnails/thumbnail-1.webp" class="thumbnail">`.
- Setting only `width` keeps the image's aspect ratio; setting both `width` and `height` stretches it. `object-fit: cover | contain` and `object-position` control what happens when the shape doesn't match.
- `width: 100%` makes an image fill its container — essential inside grids.
- `<input type="text" placeholder="Search">` creates a text box; `type="checkbox"` a checkbox.
- `.search-bar::placeholder { }` styles the placeholder text.

## 9. Display: block, inline-block, inline

Three kinds of element:

| Type | Behaviour | Examples |
|---|---|---|
| **block** | takes the whole line (of its container) | `div`, `p` |
| **inline-block** | only as wide as its content, sits beside others | `img`, `input`, `button` |
| **inline** | lives inside a line of text | `span`, `strong` |

`display: block` / `display: inline-block` switches an element between the first two.

## 10. The `<div>`

A div is just a **box**. On its own it's an invisible block element; its value is that it can contain anything (text, images, paragraphs, other divs). Block elements inside a div fill the *div's* width, not the page's — which is what makes layouts possible.

## 11. Nested layouts technique

Almost any design breaks down into **vertical layouts** (things stacked) and **horizontal layouts** (things side by side), nested inside one another. I practised by screenshotting a design and drawing rectangles over it, then recreating the same structure with divs. This is the core skill for turning a design into HTML.

## 12. CSS Grid

For rigid rows and columns.

```css
.video-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* three equal columns */
  column-gap: 16px;
  row-gap: 40px;
}
```

- One value per column; extra items wrap onto new rows.
- `fr` = a share of the remaining free space (`50px 1fr` → fixed column plus "the rest").
- Grid fixes the inline-block problems: no stray whitespace gaps, and items stay vertically aligned.
- Grid is defined on the **container**; children are placed into it.

## 13. Flexbox

For flexible, content-driven layouts.

```css
.header {
  display: flex;
  flex-direction: row;          /* default; column stacks vertically */
  justify-content: space-between;
  align-items: center;
}
```

- `justify-content` positions along the main axis (`start`, `end`, `center`, `space-between`); `align-items` along the cross axis (`stretch`, `start`, `end`, `center`). In `flex-direction: column` they swap roles.
- `flex: 1` = take the remaining space (the Flexbox version of `1fr`); `flex: 2` takes twice as much as `flex: 1`.
- `flex-shrink: 0` stops an item shrinking; `width: 0` on an input lets it shrink fully.
- `max-width` caps how far a flexible item grows.
- Flexbox only affects direct children — to align grandchildren, make the child a flex container too.
- Rule of thumb: **grid** when I know the columns, **flexbox** when the content decides the layout. For a simple horizontal row either works.

## 14. CSS Position

- `position: static` — the default, normal flow.
- `position: fixed` — sticks to the **browser window**, ignores scrolling, no longer takes space on the page. Position it with `top / right / bottom / left` (opposite pairs stretch it) or `width`/`height`. Give the body `padding-top` / `padding-left` so content isn't hidden underneath.
- `position: absolute` — placed on the **page**, or relative to the nearest ancestor that is `fixed` or `relative`.
- `position: relative` — looks normal but becomes the reference for absolute children. **`absolute` inside `relative`** is the pattern for putting anything in a corner of another element.
- `z-index` decides what appears on top (higher wins; default 0; positioned elements later in the code appear above earlier ones).
- Negative values (`top: -2px`, `margin-left: -1px`) pull elements past their edge.
- `box-shadow: inset ...` draws the shadow inside the element.

## 15. Extra features

- **Responsive design** with media queries:
  ```css
  @media (max-width: 750px) { .video-grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1000px) { .video-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
  ```
- **Shorthands**: `padding: 4px 8px` (vertical, horizontal), `padding: 1px 2px 3px 4px` (top → clockwise), same for `margin`; `border: 1px solid #ccc`.
- **Inheritance**: text properties (`font-family`, `color`, `text-decoration`…) set on a parent pass down to children; box properties (`border`, `padding`, `margin`) don't. Setting `font-family` once on `body` removes a lot of repetition.
- **Semantic elements**: `<header>`, `<nav>`, `<main>`, `<section>` behave like divs but give meaning to screen readers and search engines.
- **Comments**: `<!-- html -->` and `/* css */`.
- **Advanced selectors**: `.sidebar-link img` (descendant), `.search-button:hover .tooltip` (state + descendant).

---

## How the YouTube clone applied each concept

| Part of the clone | Concepts used |
|---|---|
| **Project setup** | Proper HTML structure; separate `general.css`, `header.css`, `sidebar.css`, `video.css`; `thumbnails/`, `icons/`, `channel-pictures/` folders; Roboto from Google Fonts; body margin reset; `font-family` on `body` via inheritance |
| **Header bar** | `<header>` with `display: flex; justify-content: space-between; align-items: center`; `position: fixed; top/left/right: 0; height: 55px`; white background + `border-bottom`; `z-index: 100`; `padding-top` on body to clear it |
| **Left section** (menu, logo) | Nested flexbox with `align-items: center`; icons sized by `height`; margins for spacing |
| **Search bar + buttons** | `<input>` with `flex: 1` and `width: 0` so it grows and shrinks; `max-width: 500px` on the middle section; `::placeholder` styling; `border` shorthand; `box-shadow: inset …`; `margin-left: -1px` to merge the button edge; round voice button via `border-radius` |
| **Right section** (icons, avatar) | Flexbox `space-between`; `flex-shrink: 0` so it never squashes; circular avatar with `border-radius` |
| **Notification count** | Wrapper div `position: relative`, count `position: absolute` with negative `top`/`right` |
| **Tooltips** | `.tooltip` absolute inside a relative button, `bottom: -30px`; `opacity: 0` → `1` on `.button:hover .tooltip`; `transition: opacity 0.15s`; `white-space: nowrap`; `pointer-events: none`; centred by making the button a flex container |
| **Sidebar** | `<nav>` with `position: fixed; left: 0; bottom: 0; top: 55px; width: 72px`; `z-index: 200` to sit above the header; each link is `display: flex; flex-direction: column; justify-content: center; align-items: center`; `:hover` background; `cursor: pointer`; `padding-left` on body to clear it |
| **Video grid** | `display: grid; grid-template-columns: 1fr 1fr 1fr; column-gap: 16px; row-gap: 40px`; `<main>` and `<section>` semantic wrappers; media queries switch to 2 or 4 columns by screen width |
| **Video preview card** | Nested layouts: vertical (thumbnail row → info row), horizontal (`grid-template-columns: 50px 1fr` for avatar + text), vertical (title, author, stats); `img { width: 100% }` so thumbnails fill the column; circular profile picture; paragraph margins reset then set precisely; grouped selectors for shared author/stats styles |
| **Video duration badge** | Thumbnail row `position: relative`, badge `position: absolute; bottom: 8px; right: 8px`; `padding` shorthand; small `border-radius` |
| **Page polish** | Light grey `background-color` on body; DevTools Computed tab to copy exact colours and sizes; `line-height` on titles |

---

## Key takeaways

1. The working method for any UI: **create the element in HTML, then style it in CSS one property at a time** until it matches the design.
2. Break every design into **nested vertical and horizontal layouts**, then choose grid or flexbox for each.
3. **`position: absolute` inside `position: relative`** solves badges, counters and tooltips.
4. DevTools turns guesswork into exact values.
5. Anything I forget is one search away — knowing *what* to search for is the real skill.

**Next step:** JavaScript, to make the page interactive.
