export default function Spinner() {
  return (
    <div role="status" className="flex items-center gap-4 rounded-lg border border-line/70 bg-mat px-5 py-10 sm:px-7">
      <span
        className="h-7 w-7 animate-spin rounded-full border-[3px] border-line border-t-accent motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="text-base font-semibold">Gathering the gallery</span>
    </div>
  )
}
