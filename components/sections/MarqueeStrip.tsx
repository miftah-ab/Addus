const ITEMS = ['AI Automation', 'SaaS Development', 'Addus', 'Built to ship', 'Full Stack', 'Real products', 'AI Systems', 'Automation', 'I build what\'s next']

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      id="marquee"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="marquee-track"
        style={{ gap: 0, animationDuration: '40s' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <span
              className="font-clash"
              style={{
                fontSize: 24, color: 'var(--text-primary)',
                whiteSpace: 'nowrap', padding: '0 24px',
                opacity: 0.85,
              }}
            >
              {item}
            </span>
            <span className="text-green" style={{ fontSize: 14, opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
