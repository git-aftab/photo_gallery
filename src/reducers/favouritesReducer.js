export const FAVOURITES_KEY = 'gallery-favourites'

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

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

export function initFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}
