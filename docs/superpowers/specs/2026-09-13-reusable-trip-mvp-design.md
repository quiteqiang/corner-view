# Reusable Trip MVP Design

## Purpose

Build the first usable slice of Pocket Quest: a mobile-first browser prototype where people discover complete, real-world trips, save or skip them, inspect the route, copy it into their own itinerary, and edit the copied version.

The source product proposal defines the central loop as Discover, Swipe, Copy, Remix, Travel, Record, Publish, Earn. This MVP implements the first five on local sample data, stopping before travel recording and publishing.

## Product decisions

The primary content unit is a completed trip, never an individual destination. A feed card must make it possible to decide “Would I travel this way?” without opening a detail view.

The first feed contains three Southeast Asia sample trips. Each card shows the contributor, destination, number of days, actual total spend, travel style, transport type, number of places, and a simplified route preview. A user may skip, save, or open the complete route.

Copying a trip creates an independent local itinerary. Subsequent Remix changes never alter the source trip. The user can remove a place, add a supplied optional place, edit a stop time, and set a total budget. The app recalculates the displayed daily budget and number of places from the user’s copy.

## Screens and behavior

### Discover feed

The opening screen is a single mobile trip-card deck. It presents one candidate at a time and includes search plus filters for region, duration, budget, and travel style. Filtering is local and uses sample records. Skip advances to the next matching trip. Save stores the trip id locally and advances. The card’s primary button copies the trip.

### Trip detail

Opening a card shows the complete, read-only original trip: trip summary, daily schedule, actual per-stop cost, tips, and a route map strip. It has explicit actions to return, save, or copy the trip.

### My itinerary

After copying, the app opens My itinerary. The original contributor and source-trip title remain visible as attribution. It displays daily stops and an editable budget. Removing a stop immediately updates the place count and daily budget. Adding an optional sample stop and changing a stop time update only the copied trip.

### Saved trips

The Saved tab lists saved original trip cards. It supports opening a detail view or copying a saved trip. It never displays a copied itinerary as a saved source trip.

## Data and state

Use a static `trips` dataset and a small store module held in browser memory for the first implementation. The types are:

```js
Trip { id, title, contributor, destination, region, days, actualBudget, style, transport, stops, optionalStops, tips }
Stop { id, day, time, name, cost, note }
AppState { activeTripId, savedTripIds, skippedTripIds, copiedTrip, filters }
```

`copiedTrip` is a deep copy of a source trip plus `sourceTripId`, `budget`, and its editable `stops`. Resetting the browser reloads sample data; no account, backend, payment, live mapping, location validation, OCR, or AI planning is included.

## Visual direction

Retain the approved summer pixel-art style: cyan sky, ivory clouds, lush green scenery, dark teal text, warm paper surfaces, thin borders, and detailed original pixel illustrations. Mobile is the primary viewport. The large central trip card must prioritize itinerary metadata and a simplified route over game mechanics. Passport, levels, receipts, subscriptions, traveller notes, rewards, and publishing stay out of this MVP slice.

## Boundaries and errors

Filters that match no trips show a clear empty state and a reset action. A copied trip with no stops is valid but reports zero places and no daily estimate. Budget fields accept only positive numeric values. Attempts to remove an already absent stop are ignored. All actions provide a short status message.

## Commit boundaries

Each independently reviewable product capability is committed separately:

1. mobile app shell and pixel design system
2. complete-trip discovery feed and filters
3. skip and save interactions
4. read-only trip detail route
5. copy source trip into My itinerary
6. remix places, times, and budget
7. saved trip list

No commit is pushed to a remote repository unless requested separately.
