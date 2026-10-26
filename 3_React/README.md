# React Learning Journey

Over three weeks (3–21 Oct 2026) I went from my first React component to a multi-page app that pulls live data from a REST API and charts it. This folder holds every project from that stretch, in the order I built them. Each one adds a concept the previous one didn't need.

This README explains what I learned, where in the code you can see it, and which bugs taught me the most.

> **Personal note**
>
> <!-- TODO(Edward): 3–5 sentences in your own voice. Why you're learning React,
>      which project was hardest and why, and what clicked for you along the way.
>      Reviewers read this part closest, because nobody else can write it. -->

---

## At a glance

| | |
|---|---|
| **Duration** | 3 weeks, 16 commits, 7 projects |
| **Core** | React 19, JSX, function components, hooks |
| **Tooling** | Vite, ESLint (`react-hooks` plugin), npm |
| **Libraries** | React Router, React Hook Form, Recharts, react-draggable, Tailwind CSS |
| **Data** | `fetch` + async/await against the CoinGecko REST API, `localStorage` |
| **Styling** | Plain CSS with custom properties, BEM-style class names, Tailwind (one project) |

---

## Timeline

| Date | Project | New concept introduced |
|---|---|---|
| 3 Oct | [my-first-react](./my-first-react) | Vite setup, components, props, `useState` |
| 3–4 Oct | [movie-web](./movie-web) | Tailwind CSS, controlled inputs, lifting state up |
| 4 Oct | [my-first-react](./my-first-react) | `useEffect` and dependency arrays |
| 5–6 Oct | [todo-web](./todo-web) | Full CRUD, derived state, `localStorage` persistence, refactoring |
| 6 Oct | [my-first-react](./my-first-react) | Form validation with React Hook Form |
| 7 Oct | [memory-game](./memory-game) | Custom hooks, game state machine, timers |
| 11–12 Oct | [mini-trello-prototype](./mini-trello-prototype) | `useRef`, DOM measurement, drag and drop, modal forms |
| 7–20 Oct | [music-player](./music-player) | Context API, React Router, HTML5 Audio, effect cleanup |
| 20–21 Oct | [crypto-tracker](./crypto-tracker) | REST API integration, dynamic routes, async state, charts |

---

## Projects

### 1. my-first-react: fundamentals

My sandbox for the basics. It covers components and props, `useState` for local state, `useEffect` that reacts to a specific value, and a sign-up form built with React Hook Form.

- **Props and independent state:** each [`Card`](./my-first-react/components/Card.jsx) keeps its own like and view counters, so two cards rendered from one component don't share state.
- **Cross-field validation:** the confirm-password rule reads the other field with `getValues()` ([SignUpForm.jsx:38](./my-first-react/components/SignUpForm.jsx#L38)).

### 2. movie-web: styling and controlled inputs

A movie search landing page styled with Tailwind CSS (via the `@tailwindcss/vite` plugin). The search term lives in the parent ([App.jsx](./movie-web/src/App.jsx)) and is passed down to [`Search`](./movie-web/components/Search.jsx). This was my first time **lifting state up** and building a **controlled input**.

### 3. todo-web: first complete app

A task manager with add, complete, and delete, plus All / Active / Done tabs. It is my first app with real data flow across several components.

- **Lazy state initialiser:** `useState(() => JSON.parse(localStorage...))` reads storage only on the first render, not on every render ([App.jsx:10](./todo-web/src/App.jsx#L10)).
- **Persistence through effects:** a `useEffect` keyed on `[todos]` keeps `localStorage` in sync ([App.jsx:25](./todo-web/src/App.jsx#L25)).
- **Derived state:** tab counts are computed from `todos` during render instead of being stored separately, so they can't drift out of sync.
- **Immutable updates:** I use functional `setTodos(prev => ...)` with `map` and `filter`, and never mutate the array.
- **Component design:** `App` owns the state. [`TodoInput`](./todo-web/src/components/TodoInput.jsx), [`TodoList`](./todo-web/src/components/TodoList.jsx), [`Tabs`](./todo-web/src/components/Tabs.jsx) and `TodoCard` receive data and callbacks (`onAddTodo`, `onRemove`, `onMarkDone`) through props.

### 4. memory-game: custom hooks and game logic

A card-matching game with a move counter, a score, a reset button, and a win screen.

- **Custom hook:** all game rules live in [`useGameLogic`](./memory-game/src/hooks/useGameLogic.js), so [App.jsx](./memory-game/src/App.jsx) only renders. This is where I learned to separate *logic* from *presentation*.
- **Fisher–Yates shuffle:** an unbiased shuffle that copies the array first, so the original is never mutated ([useGameLogic.js:12](./memory-game/src/hooks/useGameLogic.js#L12)).
- **Input locking:** an `isLock` flag stops a third card from being flipped while two are being compared ([useGameLogic.js:66](./memory-game/src/hooks/useGameLogic.js#L66)).
- **Timers and state:** `setTimeout` delays the flip-back so the player can see a mismatch before the cards turn over ([useGameLogic.js:91](./memory-game/src/hooks/useGameLogic.js#L91)).

### 5. mini-trello-prototype: refs and drag and drop

A Kanban board with Todo / Doing / Done columns. Tasks are created in a modal form, can be deleted, and move between columns either from a dropdown or by dragging.

- **Drag-and-drop hit testing:** when a drag ends, I compare the card's centre point with each column's `getBoundingClientRect()` to work out where it was dropped ([Card.jsx:14](./mini-trello-prototype/src/components/Card.jsx#L14)).
- **Ref registry:** a single `useRef({})` holds a DOM reference to every column, and each column registers itself through a callback ([App.jsx:55](./mini-trello-prototype/src/App.jsx#L55)).
- **Resetting a component with `key`:** bumping `dragKey` remounts the `Draggable`, which snaps the card back so React re-renders it in its new column ([Card.jsx:40](./mini-trello-prototype/src/components/Card.jsx#L40)).
- **React Hook Form, going further:** `defaultValues`, plus `watch()` and `setValue()`, drive a custom priority picker made of buttons instead of a `<select>` ([AddNewTaskForm.jsx:19](./mini-trello-prototype/src/components/AddNewTaskForm.jsx#L19)).

### 6. music-player: global state, routing, and side effects

A music player with play/pause, next/previous, a seek bar, volume, auto-advance to the next track, and user-created playlists. It has two routes: All Songs and Playlists.

- **Context API:** [`MusicProvider`](./music-player/src/hooks/MusicContext.jsx) holds the player and playlist state for the whole app. A `useMusic()` hook wraps `useContext` and **throws a clear error** if a component uses it outside the provider ([MusicContext.jsx:151](./music-player/src/hooks/MusicContext.jsx#L151)).
- **React Router:** `BrowserRouter`, `Routes`, `Link`, and `useLocation()` highlight the active nav link ([Nav.jsx](./music-player/src/components/Nav.jsx)).
- **Syncing React with a browser API:** the `<audio>` element is reached through `useRef`. Its `loadedmetadata`, `timeupdate`, and `ended` events are subscribed in an effect, and the cleanup function **removes the listeners** when the effect re-runs ([MusicPlayer.jsx:54](./music-player/src/components/MusicPlayer.jsx#L54)).
- **Click-outside detection:** a document-level `mousedown` listener closes the song-search dropdown. It is attached only while the dropdown is open and removed on cleanup ([PlayListItem.jsx:54](./music-player/src/components/PlayListItem.jsx#L54)).
- **Duplicate prevention:** `some()` stops the same song from being added to a playlist twice ([MusicContext.jsx:111](./music-player/src/hooks/MusicContext.jsx#L111)).

### 7. crypto-tracker: real API data

A dashboard of the top 100 cryptocurrencies from the CoinGecko API, with search, six sort options, and a grid/list toggle. Each coin has a detail page with a 7-day price chart.

- **API layer:** every `fetch` call lives in [`api/coinGecko.js`](./crypto-tracker/src/api/coinGecko.js) and checks `response.ok`, so HTTP errors become thrown exceptions that the components catch.
- **Dynamic routes:** `/coin/:id` reads the coin with `useParams()`, and the fetch effect depends on `[id]` so moving between coins loads fresh data ([CoinDetail.jsx:68](./crypto-tracker/src/pages/CoinDetail.jsx#L68)).
- **Async UI states:** each page shows separate **loading**, **error**, and **loaded** states instead of assuming the request succeeded ([CoinDetail.jsx:92](./crypto-tracker/src/pages/CoinDetail.jsx#L92)).
- **Data transformation:** raw `[timestamp, price]` pairs from the API are mapped into `{ time, price }` objects for the Recharts `LineChart`.
- **Combined search and sort:** filtering and sorting run in one pass whenever the query, sort key, or data changes ([Home.jsx:32](./crypto-tracker/src/pages/Home.jsx#L32)).
- **Formatting utilities:** `Intl.NumberFormat` handles currency, and market caps are shortened to T/B/M ([formatter.js](./crypto-tracker/src/util/formatter.js)).

---

## Bugs that taught me the most

Fixing these taught me more than any tutorial did.

| Bug | Root cause | What I learned |
|---|---|---|
| Volume slider warned about switching from uncontrolled to controlled | The input had both `defaultValue` and `value` | An input is *either* controlled (`value` + `onChange`) *or* uncontrolled (`defaultValue`), never both |
| `AbortError: play() was interrupted by pause()` | Two separate effects both called `play()` and `pause()` on the same audio element | One piece of external state should be owned by **one** effect |
| Playback stopped when skipping to the next track | `currentSong` was missing from the effect's dependency array, so the effect never re-ran | Dependency arrays aren't optional. Every value the effect reads must be listed |
| Playlist search dropdown wouldn't open or close correctly | I used `??` (nullish coalescing) where I needed `&&` in a boolean condition | `??` only falls back on `null`/`undefined`, while `false` and `""` pass straight through |
| Coin detail page crashed when the API failed | The component only knew about *loading* and *loaded* | Async UI needs an explicit **error** state, and the state must be reset before each refetch |

---

## Concepts checklist

- [x] JSX, components, props, `children`
- [x] `useState`, including functional updates and lazy initialisers
- [x] `useEffect`: dependency arrays, cleanup, event-listener lifecycles
- [x] `useRef` for DOM access and for mutable values that shouldn't trigger re-renders
- [x] `useContext` with `createContext`, plus a guarded custom hook
- [x] Custom hooks for extracting logic
- [x] Lists and keys, conditional rendering
- [x] Controlled inputs and lifting state up
- [x] Derived state instead of duplicated state
- [x] Forms and validation with React Hook Form
- [x] Client-side routing with React Router, including URL parameters
- [x] Data fetching with async/await, error handling, and loading states
- [x] Browser APIs: `localStorage`, `HTMLAudioElement`, `getBoundingClientRect`
- [x] Third-party UI libraries (Recharts, react-draggable)

## What I'm learning next

- **TypeScript**, to catch prop and data-shape mistakes at compile time
- **Testing** with Vitest and React Testing Library
- **Server-state tools** like TanStack Query, which handle caching, refetching, and the loading/error states I currently write by hand
- **Performance:** `useMemo`, `useCallback`, and `React.memo`, and when they're actually worth using
- **Deployment** of these projects to Vercel or Netlify, with live demo links

---

## Running any project

Each folder is a standalone Vite app:

```bash
cd 3_React/<project-name>
npm install
npm run dev
```
