'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

import Image from 'next/image'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'Work', href: '#work', id: 'nav-work' },
    { label: 'Services', href: '#services', id: 'nav-services' },
    { label: 'Contact', href: '#contact', id: 'nav-contact' },
  ]

  return (
    <>
      <nav
        id="main-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000, padding: '0 40px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        }}
      >
        <a href="#" id="nav-home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }} data-hover>
          <div style={{ position: 'relative', width: 24, height: 24 }}>
            <Image src="/symbol.png" alt="ADDUS Symbol" fill style={{ objectFit: 'contain' }} />
          </div>
          <span 
            style={{ 
              fontFamily: 'var(--font-clash)', 
              fontWeight: 600, 
              letterSpacing: '0.08em', 
              fontSize: '20px', 
              color: '#F0EDE6',
              lineHeight: 1
            }}
          >
            ADDUS
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 36 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link" data-hover>
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          data-hover
          style={{
            background: 'none', border: 'none',
            color: 'var(--text-primary)', padding: 8,
            display: 'flex', flexDirection: 'column', gap: 5,
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 24, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
          <span style={{ display: 'block', width: 24, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 24, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-clash"
            data-hover
            style={{
              fontSize: 48, color: 'var(--text-primary)', textDecoration: 'none',
              transition: 'color 0.2s',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {l.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } nav { padding: 0 20px !important; } }
      `}</style>
    </>
  )
}
