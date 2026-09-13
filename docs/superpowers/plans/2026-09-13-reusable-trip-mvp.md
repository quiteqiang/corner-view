# Reusable Trip MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Pocket Quest prototype that lets users discover, save, inspect, copy, and remix complete sample travel trips.

**Architecture:** A dependency-free browser prototype in `preview/`. `data.js` owns immutable source-trip records, `store.js` owns in-memory app state and pure updates, and `app.js` renders screens and dispatches user actions. The existing `preview/style.css` owns the approved pixel-art mobile design system.

**Tech Stack:** HTML, CSS, vanilla JavaScript, inline SVG pixel illustrations; no server, framework, external API, persistence, or automated tests.

**Spec:** `docs/superpowers/specs/2026-09-13-reusable-trip-mvp-design.md`

## Global Constraints

- Build for mobile first at a 390px logical viewport; keep a useful desktop preview.
- Use complete trips as the feed item, never individual destinations.
- Store all sample state in memory; reloading resets it.
- Do not add account, backend, payment, live map, OCR, AI planning, rewards, passport, wallet, subscription, or publishing features.
- Do not run automated tests, following the user's earlier request; verify by loading the local preview and exercising each flow manually.
- Make each numbered task a separate local Git commit. Do not push.

---

## File structure

- `preview/index.html` — app mount point and mobile viewport metadata.
- `preview/style.css` — pixel-art surfaces, cards, deck transitions, route maps, forms, and responsive mobile layout.
- `preview/data.js` — immutable `trips` sample data and shared SVG illustration helpers.
- `preview/store.js` — state initialization, filter matching, feed selection, save/skip updates, copy construction, and safe remix operations.
- `preview/app.js` — screen rendering, accessible dialog handling, and DOM event listeners.
- `README.md` — local preview command, product scope, and local-state constraints.

## Tasks

### Task 1: Mobile shell and pixel design system

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/style.css`
- Modify: `preview/app.js`
- Modify: `README.md`

**Interfaces:**
- Produces: `<main id="app">` as the sole app mount target, plus CSS classes `.mobile-app`, `.app-header`, `.bottom-nav`, `.surface-card`, `.pixel-button`, `.status-toast`.

- [x] **Step 1: Replace the desktop-oriented shell with a mobile app mount point**

Keep `#app`, `#modal-root`, and `#toast`; load `app.js` as a module and render a temporary mobile shell into `#app`. Set `theme-color` to the warm paper background and retain the iPhone viewport directive. Tasks 2 and 3 add `data.js` and `store.js`.

- [x] **Step 2: Establish the approved mobile visual system**

Implement CSS custom properties for paper, ink, cyan, leaf green, cloud, line, muted copy, and safe-area insets. Add the bottom navigation and button/card classes listed above. At `max-width: 720px`, constrain content to 430px, reserve bottom safe-area space, and make controls at least 44px tall.

- [x] **Step 3: Update the README preview entry point**

Describe the prototype as a reusable-trip MVP and retain the no-dependency command:

```sh
python3 -m http.server 4173 --directory preview
```

- [x] **Step 4: Manual inspection skipped at user request**

The user requested no testing, so no browser inspection was run for this task.

- [x] **Step 5: Commit the mobile shell**

```bash
git add README.md preview/index.html preview/style.css preview/app.js docs/superpowers/plans/2026-09-13-reusable-trip-mvp.md
git commit -m "feat: establish mobile trip app shell"
```

### Task 2: Complete-trip discovery feed and filters

**Files:**
- Create: `preview/data.js`
- Create: `preview/store.js`
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `trips`, `createInitialState()`, `matchingTrips(state)`, `currentTrip(state)`, and `renderDiscover()`.

- [x] **Step 1: Define three complete Southeast Asia source trips**

Add immutable Bangkok, Ubud, and Chiang Mai records. Every record includes `id`, `title`, `contributor`, `destination`, `region`, `days`, `actualBudget`, `style`, `transport`, `stops`, `optionalStops`, `tips`, and a pixel-art scenery identifier. Each stop uses `{ id, day, time, name, cost, note }`.

- [x] **Step 2: Add filter and feed-selection state**

Create `createInitialState()` with `filters`, `savedTripIds`, `skippedTripIds`, `activeTripId`, and `copiedTrip`. Implement `matchingTrips(state)` and `currentTrip(state)` so skipped trips are excluded and the first remaining filtered trip becomes active.

- [x] **Step 3: Render one complete trip card**

Render the approved Chinese headline, search text input, region/duration/budget/style select controls, contributor attribution, destination title, actual total cost, stop count, transport, and a schematic route strip. The primary card button opens or copies a full trip; it must never frame an individual place as the content unit.

- [x] **Step 4: Add filter event handling and empty state**

Updating a search or select field updates `state.filters` and rerenders. If no trip matches, render a message and a reset-filters button that restores `createInitialState().filters` while preserving saves, skips, and a copied trip.

- [x] **Step 5: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 6: Commit discovery**

```bash
git add preview/data.js preview/store.js preview/app.js preview/style.css
git commit -m "feat: add complete trip discovery feed"
```

### Task 3: Skip and save interactions

**Files:**
- Modify: `preview/store.js`
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `skipTrip(state, tripId)`, `toggleSavedTrip(state, tripId)`, and status-toaster feedback.

- [x] **Step 1: Add pure skip and save state updates**

`skipTrip` adds a source-trip id to `skippedTripIds` and selects the next matching card. `toggleSavedTrip` adds or removes an id from `savedTripIds` without changing source-trip data.

- [x] **Step 2: Add explicit accessible buttons**

Render a labeled Skip button, a labeled Save button whose state is announced through `aria-pressed`, and a clear gesture hint. Retain a one-card deck visual but support buttons without needing touch gestures.

- [x] **Step 3: Show short outcomes**

On skip, show “已跳过这趟旅行”; on save, show “已收藏这趟旅行”; on removal, show “已移出收藏”.

- [x] **Step 4: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 5: Commit interactions**

```bash
git add preview/store.js preview/app.js preview/style.css
git commit -m "feat: add trip skip and save interactions"
```

### Task 4: Read-only trip detail route

**Files:**
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `renderTripDetail(tripId)` and a route-detail screen opened by a feed-card control.

- [x] **Step 1: Render original route information by day**

Show title, contributor, actual cost, transport, tips, and stop rows grouped by `day`. Every row includes the time, place name, price, and note from the source `Trip` record.

- [x] **Step 2: Add a readable route map strip and controls**

Use numbered markers and a dashed route between every trip stop. The screen has Back, Save, and Copy this trip buttons. It must clearly label the route as the original contributor’s completed trip.

- [x] **Step 3: Keep source data read-only**

No input control may change the source trip. Detail’s Save calls `toggleSavedTrip`; Copy calls the copy flow planned for Task 5 only after it exists.

- [x] **Step 4: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 5: Commit route detail**

```bash
git add preview/app.js preview/style.css
git commit -m "feat: add read-only trip route detail"
```

### Task 5: Copy source trip into My itinerary

**Files:**
- Modify: `preview/store.js`
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `copyTrip(state, tripId)`, `copiedTrip.sourceTripId`, and `renderMyTrip()`.

- [x] **Step 1: Implement a true deep-copy operation**

`copyTrip` copies the selected `Trip`, clones every source stop, preserves `sourceTripId`, initializes `budget` from `actualBudget`, and adds a user-facing `title` ending with “的行程”. It must not retain mutable stop references from `trips`.

- [x] **Step 2: Render My itinerary**

Add a bottom navigation item labeled “我的行程”. When `copiedTrip` is absent, show an empty state that links back to Discover. When present, show source attribution, place count, total budget, daily budget, and daily stop groups.

- [x] **Step 3: Connect Copy actions**

The feed and detail primary action calls `copyTrip`, switches to the My itinerary tab, and shows “已复制到我的行程”.

- [x] **Step 4: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 5: Commit copied itinerary**

```bash
git add preview/store.js preview/app.js preview/style.css
git commit -m "feat: copy trip into my itinerary"
```

### Task 6: Remix places, times, and budget

**Files:**
- Modify: `preview/store.js`
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `removeCopiedStop(state, stopId)`, `addOptionalStop(state, stopId)`, `updateCopiedStopTime(state, stopId, time)`, and `updateCopiedBudget(state, budget)`.

- [x] **Step 1: Implement guarded remix operations**

All mutation functions return a new `copiedTrip` and do nothing if no copied itinerary or matching stop exists. `updateCopiedBudget` accepts finite numbers greater than zero only. `addOptionalStop` refuses duplicate stop ids.

- [x] **Step 2: Add edit controls to My itinerary**

Every copied stop has a time input and a Remove action. Render optional source-trip stops in an Add places section. Provide a numeric total-budget input with an RM prefix.

- [x] **Step 3: Recalculate derived information on every render**

Display `copiedTrip.stops.length` and `copiedTrip.budget / copiedTrip.days` rounded to the nearest whole RM. With no stops, report “0 个地点” and “暂无每日预算”.

- [x] **Step 4: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 5: Commit Remix**

```bash
git add preview/store.js preview/app.js preview/style.css
git commit -m "feat: remix copied trip itinerary"
```

### Task 7: Saved trip list

**Files:**
- Modify: `preview/app.js`
- Modify: `preview/style.css`

**Interfaces:**
- Produces: `renderSavedTrips()` and a bottom navigation item labeled “收藏”.

- [x] **Step 1: Render only saved source trips**

Map `savedTripIds` to the immutable `trips` dataset. Every item shows contributor, title, duration, actual total spend, and a route-preview thumbnail. Do not list copied itineraries here.

- [x] **Step 2: Connect navigation and actions**

The Saved screen has an empty state that links to Discover. Each saved card opens read-only detail; its visible action can copy the source trip to My itinerary.

- [x] **Step 3: Manual verification skipped at user request**

The user requested no testing, so no browser verification was run for this task.

- [x] **Step 4: Commit saved trips**

```bash
git add preview/app.js preview/style.css
git commit -m "feat: add saved trip list"
```
