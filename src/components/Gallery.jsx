import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import {
  FAVOURITES_KEY,
  TOGGLE_FAVOURITE,
  favouritesReducer,
  initFavourites,
} from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [query, setQuery] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    initFavourites,
  );

  // Save favourites to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch {
      // Storage can be blocked (private mode, quota); the app still works.
    }
  }, [favourites]);

  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, query]);

  return (
    <>
      <header className="border-b border-line/70 pb-8 sm:pb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent sm:mb-4">
          THE DAILY FRAME{" "}
        </p>
        <h1 className="title-condensed max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
          Moments, held close.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft sm:mt-5 sm:text-base">
          A curated collection of photographs, everyday scenes, and moments worth remembering. Discover the stories behind each image and save your favourites along the way.
        </p>
        <SearchBar value={query} onChange={handleSearchChange} />
      </header>

      <section className="mt-8 sm:mt-10">
        {loading && <Spinner />}

        {error && (
          <p
            role="alert"
            className="max-w-xl rounded-lg border border-accent/30 bg-mat px-5 py-10 text-base leading-7 text-ink-soft sm:px-7"
          >
            <span className="block font-semibold text-ink">
              The gallery is unavailable.
            </span>
            Photos could not be loaded. {error} Check your connection and reload
            the page.
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="max-w-xl rounded-lg border border-line/70 bg-mat px-5 py-10 text-base leading-7 text-ink-soft sm:px-7">
            No photos by “{query.trim()}”. Try another author name.
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isFavourite={favourites.includes(photo.id)}
                onToggle={handleToggleFavourite}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
