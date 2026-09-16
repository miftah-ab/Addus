const ITEMS = [
  'Full-Stack Development',
  'AI Products',
  'SaaS Platforms',
  'Mobile Applications',
  'Automation Systems',
  'API Integrations',
  'Remote · Contract · Freelance',
  'Software That Ships',
]

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      id="marquee"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <div className="marquee-track" style={{ gap: 0, animationDuration: '50s' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 10,
                color: 'var(--text-tertiary)',
                whiteSpace: 'nowrap',
                padding: '0 24px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--border-strong)', fontSize: 8 }} aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
