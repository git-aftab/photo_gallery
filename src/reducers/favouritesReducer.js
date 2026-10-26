export const FAVOURITES_KEY = 'gallery-favourites'

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// State is an array of favourited photo ids, e.g. ["10", "27"].
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload]
    default:
      return state
  }
}

// Lazy initialiser for useReducer: reads saved favourites from localStorage
// once, on first render. Falls back to an empty list if nothing valid is saved.
export function initFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}
