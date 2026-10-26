export default function Spinner() {
  return (
    <div role="status" className="flex items-center gap-4 py-24">
      <span
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-ink motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="text-lg font-medium">Loading photos</span>
    </div>
  )
}
