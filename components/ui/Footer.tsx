'use client'

export default function Footer() {
  const navLinks = [
    { label: 'Work',         href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Stack',        href: '#stack' },
    { label: 'About',        href: '#about' },
    { label: 'Contact',      href: '#contact' },
  ]

  const socialLinks = [
    { label: 'GitHub',   href: 'https://github.com/miftah-ab' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/miftah-abate-addus' },
    { label: 'X',        href: 'https://x.com/Mif_Abate' },
  ]

  return (
    <footer
      id="main-footer"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
        padding: '52px 80px 40px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

          {/* Identity */}
          <div>
            <p
              className="font-clash"
              style={{ fontSize: 17, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6 }}
            >
              Miftah Abate
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Full-Stack Developer
            </p>
            <p
              style={{
                fontSize: 11,
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-geist-mono)',
                letterSpacing: '0.1em',
                marginBottom: 24,
              }}
            >
              REMOTE · CONTRACT · FREELANCE
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.7, maxWidth: 300 }}>
              Building practical software from the ground up — frontend, backend, AI, and mobile.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontSize: 10,
                color: 'var(--text-tertiary)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 16,
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontSize: 10,
                color: 'var(--text-tertiary)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 16,
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {socialLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-geist-mono)' }}>
            © 2026 Miftah Abate
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            Building software that ships.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #main-footer { padding: 40px 40px 32px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          #main-footer { padding: 40px 20px 32px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}
