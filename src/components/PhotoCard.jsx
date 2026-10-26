import { memo } from 'react'
import HeartIcon from './HeartIcon'

// memo: a card re-renders only if its own photo, favourite state or handler
// changes, so toggling one heart doesn't re-render the other 29 cards.
function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <li className="bg-mat p-3 pb-1">
      <img
        src={`https://picsum.photos/id/${photo.id}/640/480`}
        alt={`Photo by ${photo.author}`}
        width="640"
        height="480"
        loading="lazy"
        className="aspect-4/3 w-full bg-line object-cover"
      />
      <div className="flex items-center justify-between gap-2 pt-2">
        <p className="truncate text-lg font-semibold">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          className={`-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90 motion-reduce:transition-none ${
            isFavourite ? 'text-accent' : 'text-ink-soft hover:text-accent'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </li>
  )
}

export default memo(PhotoCard)
