import { memo } from 'react'

// memo: re-renders only when `value` or `onChange` change. Because Gallery
// passes a useCallback-wrapped handler, toggling a favourite doesn't re-render it.
function SearchBar({ value, onChange }) {
  return (
    <div role="search" className="mt-8 sm:mt-12">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author
      </label>
      <input
        id="author-search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author"
        autoComplete="off"
        className="w-full border-b-2 border-ink bg-transparent py-3 text-3xl font-medium placeholder:text-ink-soft focus:border-accent focus:outline-none focus-visible:border-accent sm:text-5xl"
      />
    </div>
  )
}

export default memo(SearchBar)
