import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  FAVOURITES_KEY,
  TOGGLE_FAVOURITE,
  favouritesReducer,
  initFavourites,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import Spinner from './Spinner'

export default function Gallery() {
  // Data comes from the custom hook; Gallery never calls fetch itself.
  const { photos, loading, error } = useFetchPhotos()

  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites)

  // Save favourites to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites))
    } catch {
      // Storage can be blocked (private mode, quota); the app still works.
    }
  }, [favourites])

  // useCallback: keeps the same function identity between renders, so the
  // memoised SearchBar and PhotoCards don't re-render for no reason.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: id })
  }, [])

  // useMemo: re-filters only when the photos or the query change, not when
  // an unrelated state change (like toggling a favourite) re-renders Gallery.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  return (
    <>
      <header>
        <h1 className="title-condensed text-7xl font-black leading-[0.85] tracking-tight sm:text-9xl">
          Photo gallery
        </h1>
        <SearchBar value={query} onChange={handleSearchChange} />
      </header>

      <section className="mt-10 sm:mt-14">
        {loading && <Spinner />}

        {error && (
          <p role="alert" className="max-w-xl py-16 text-xl">
            Photos could not be loaded. {error} Check your connection and
            reload the page.
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-16 text-xl">
            No photos by “{query.trim()}”. Try another author name.
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggle={handleToggleFavourite}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
