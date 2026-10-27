import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL
// console.log("API URL:", API_URL)

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // (StrictMode mounts twice in development, so this matters).
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`The server responded with status ${response.status}.`)
        }
        const data = await response.json()
        setPhotos(data)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'The request failed.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
