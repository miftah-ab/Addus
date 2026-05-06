'use client'
export default function Footer() {
  const links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/miftah-abate' },
    { label: 'GitHub', href: 'https://github.com/ki706' },
    { label: 'X', href: 'https://x.com/miftahabate' },
  ]

  return (
    <footer
      id="main-footer"
      style={{
        padding: '32px 80px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <span id="copyright" style={{ fontSize: 13, color: 'var(--text-tertiary)', fontFamily: 'var(--font-geist)' }}>
        Addus © 2026
      </span>
      <div id="footer-socials" style={{ display: 'flex', gap: 24 }}>
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            style={{
              fontSize: 13, color: 'var(--text-tertiary)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
          >
            {l.label}
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          footer { padding: 24px 20px !important; flex-direction: column; gap: 16px; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
