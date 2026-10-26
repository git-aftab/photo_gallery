import { memo } from 'react'

// memo: re-renders only when `value` or `onChange` change. Because Gallery
// passes a useCallback-wrapped handler, toggling a favourite doesn't re-render it.
function SearchBar({ value, onChange }) {
  return (
    <div role="search" className="mt-7 max-w-xl sm:mt-9">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author
      </label>
      <input
        id="author-search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Find an author"
        autoComplete="off"
        className="w-full rounded-md border border-line/80 bg-mat px-4 py-3 text-base font-medium placeholder:text-ink-soft transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-5"
      />
    </div>
  )
}

export default memo(SearchBar)
