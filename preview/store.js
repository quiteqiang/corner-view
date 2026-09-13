import { trips } from './data.js';

export function createInitialState() {
  return {
    tab: 'discover', activeTripId: null, savedTripIds: [], skippedTripIds: [], copiedTrip: null,
    filters: { search: '', region: '全部地区', duration: '不限天数', budget: '不限预算', style: '不限风格' },
  };
}

export function matchingTrips(state) {
  const maxBudget = { 'RM 600 以下': 600, 'RM 800 以下': 800, 'RM 1000 以下': 1000 }[state.filters.budget];
  const dayRange = { '2–3 天': [2, 3], '4–5 天': [4, 5] }[state.filters.duration];
  const query = state.filters.search.trim().toLowerCase();
  return trips.filter((trip) => !state.skippedTripIds.includes(trip.id)
    && (state.filters.region === '全部地区' || trip.region === state.filters.region)
    && (!dayRange || (trip.days >= dayRange[0] && trip.days <= dayRange[1]))
    && (!maxBudget || trip.actualBudget <= maxBudget)
    && (state.filters.style === '不限风格' || trip.style === state.filters.style)
    && (!query || `${trip.title} ${trip.destination} ${trip.contributor}`.toLowerCase().includes(query)));
}

export function currentTrip(state) {
  const candidates = matchingTrips(state);
  return candidates.find((trip) => trip.id === state.activeTripId) || candidates[0] || null;
}
