'use client'
import { useEffect } from 'react'

export default function SmoothScrollHandler() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Handle in-page anchor links (e.g., #contact, #work)
      if (href.startsWith('#')) {
        e.preventDefault()
        if (href === '#' || href === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const el = document.querySelector(href)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
        // Keep the clean URL without hash (e.g. https://miftah-ab.vercel.app)
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    }

    // Also clean up any existing hash on initial load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  return null
}
