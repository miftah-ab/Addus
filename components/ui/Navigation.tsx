'use client'
import { useState, useEffect, useCallback } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme')
    setTheme(stored === 'dark' ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setTheme(next)
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300)
  }, [theme])

  const links = [
    { label: 'Work',         href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Stack',        href: '#stack' },
    { label: 'About',        href: '#about' },
    { label: 'Contact',      href: '#contact' },
  ]

  const SunIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )

  const MoonIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )

  return (
    <>
      <nav
        id="main-nav"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 48px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'var(--bg-primary)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          id="nav-home"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          aria-label="Miftah Abate home"
        >
          <span
            className="font-clash"
            style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}
          >
            Miftah Abate
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link" id={`nav-${l.label.toLowerCase().replace(' ', '-')}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop right: theme toggle + CTA */}
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            id="theme-toggle-desktop"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              borderRadius: 6,
              color: 'var(--text-secondary)',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'var(--accent)'
              el.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'var(--border-strong)'
              el.style.color = 'var(--text-secondary)'
            }}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <a href="#contact" className="btn-primary" id="nav-cta" style={{ padding: '8px 18px', fontSize: 13 }}>
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
          <button
            id="theme-toggle-mobile"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-clash"
            style={{
              fontSize: 38,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: menuOpen ? `${i * 0.04}s` : '0s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ marginTop: 8 }}
        >
          Let&apos;s talk
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-mobile-controls { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-controls { display: flex !important; }
          #main-nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
