import { memo } from 'react'
import HeartIcon from './HeartIcon'

// memo: a card re-renders only if its own photo, favourite state or handler
// changes, so toggling one heart doesn't re-render the other 29 cards.
function PhotoCard({ photo, index, isFavourite, onToggle }) {
  const isFeature = index === 0 || index === 9

  return (
    <li className={isFeature ? 'sm:col-span-2' : ''}>
      <article className="group h-full bg-mat p-2.5 sm:p-3">
        <div className="overflow-hidden rounded-md bg-line">
          <img
            src={`https://picsum.photos/id/${photo.id}/640/480`}
            alt={`Photo by ${photo.author}`}
            width="640"
            height="480"
            loading="lazy"
            className={`w-full bg-line object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 ${
              isFeature ? 'aspect-[16/9]' : 'aspect-4/3'
            }`}
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-1 pt-2.5">
          <p className="truncate text-sm font-semibold tracking-[-0.01em] sm:text-base">{photo.author}</p>
          <button
            type="button"
            onClick={() => onToggle(photo.id)}
            aria-pressed={isFavourite}
            aria-label={
              isFavourite
                ? `Remove photo by ${photo.author} from favourites`
                : `Add photo by ${photo.author} to favourites`
            }
            className={`-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90 motion-reduce:transition-none ${
              isFavourite ? 'bg-accent/10 text-accent' : 'text-ink-soft hover:bg-wall hover:text-accent'
            }`}
          >
            <HeartIcon filled={isFavourite} />
          </button>
        </div>
      </article>
    </li>
  )
}

export default memo(PhotoCard)
