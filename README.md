# Pocket Quest

A mobile-first prototype for reusable real-world trips. Discover a complete route, decide whether you want to travel that way, then copy it and make it yours.

## Interactive design preview

From this directory run:

```sh
python3 -m http.server 4173 --directory preview
```

Open http://localhost:4173. The layout is designed for a 390px mobile viewport and remains useful in a desktop browser. No package installation is needed. Optional Google Fonts fall back to local fonts when offline.

The MVP focuses on complete trips: discovery, filters, skip, save, route detail, copy and Remix. All records are local sample data and reset when the browser reloads.

## Native iOS UI

Create an **iOS App** project in Xcode named **PocketQuest**, using **SwiftUI** and **Swift**, with an iOS 17+ deployment target. Replace the generated app and ContentView source with the two files inside `ios/PocketQuest/` (remove the generated app entry point to avoid duplicate `@main` definitions). Run using an iPhone simulator or your development device.

The native source contains all five screens, original pixel artwork drawn with Canvas, destination search and categories, saved places, route sheets, daily itinerary selection, journal draft entry, an expense form and equal bill splitting, and a membership concept sheet. Browser-specific extras include budget filters, trip renaming, and the receipt file picker.

## Product direction

Lead with useful community routes and transparent travel costs. Use character progression and collectible stamps as a light reward layer. Consider real maps, community publishing, receipt OCR, persistent accounts, verified costs, and subscriptions as later product phases.

All destinations, dates, prices, ratings, XP, and memberships are illustrative. User edits are held in memory and reset when the app or preview reloads. No backend, payments, receipt OCR, live maps, or location-verified rewards are connected. The native deliverable is source code, not a signed app or generated Xcode project.

Plan: `docs/superpowers/plans/2026-09-11-pocket-quest.md`.

Tests and compilation were not run, as requested.
