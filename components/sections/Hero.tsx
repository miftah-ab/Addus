'use client'
import { useEffect, useState } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'
import MorphingText from '@/components/ui/MorphingText'

const TECH = ['Next.js', 'TypeScript', 'Supabase', 'Groq AI', 'Python', 'Stripe', 'Vercel', 'Framer Motion']
const MORPH_WORDS = ['automate', 'qualify', 'generate', 'ship']

export default function Hero() {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const onScroll = () => setShowArrow(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Available for work pill */}
      <div
        id="hero-availability"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 100,
          border: '1px solid rgba(0,255,136,0.2)',
          background: 'rgba(0,255,136,0.05)',
          marginBottom: 48,
          animation: 'fade-up 0.8s ease 0.1s both',
        }}
      >
        <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-green)' }} />
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: 'var(--accent-green)', opacity: 0.85 }}>
          Available for work
        </span>
      </div>

      {/* Main headline */}
      <h1
        id="hero-headline"
        className="font-clash text-hero"
        style={{
          color: 'var(--text-primary)',
          maxWidth: 900,
          animation: 'fade-up 0.8s ease 0.2s both',
        }}
      >
        We build<br />
        <span className="text-green">what&rsquo;s next.</span>
      </h1>

      {/* Morphing sub */}
      <div
        id="hero-morph-wrapper"
        style={{
          fontSize: 'var(--text-lg)', color: 'var(--text-secondary)',
          marginTop: 24, marginBottom: 12,
          animation: 'fade-up 0.8s ease 0.35s both',
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        <span>AI systems that</span>
        <MorphingText words={MORPH_WORDS} interval={2200} />
      </div>

      {/* Description */}
      <p
        id="hero-description"
        style={{
          fontSize: 'var(--text-md)', color: 'var(--text-secondary)',
          maxWidth: 480, lineHeight: 1.7,
          marginTop: 8, marginBottom: 48,
          animation: 'fade-up 0.8s ease 0.45s both',
        }}
      >
        From AI automation to full SaaS products — we build
        systems that work from day one.
      </p>

      {/* CTAs */}
      <div
        id="hero-ctas"
        style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fade-up 0.8s ease 0.55s both',
        }}
      >
        <MagneticButton href="#work" variant="primary" id="hero-cta-work">See our work</MagneticButton>
        <MagneticButton href="#contact" variant="ghost" id="hero-cta-contact">Let&apos;s talk</MagneticButton>
      </div>

      {/* Scroll arrow */}
      <div
        className="scroll-arrow"
        style={{
          position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)',
          opacity: showArrow ? 0.4 : 0,
          transition: 'opacity 0.4s ease',
          color: 'var(--text-secondary)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Tech stack ticker */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '20px 0',
          borderTop: '1px solid var(--border)',
          overflow: 'hidden',
          animation: 'fade-up 0.8s ease 0.7s both',
        }}
      >
        <div className="marquee-track" style={{ gap: 48 }}>
          {[...TECH, ...TECH].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 12,
                color: 'var(--text-tertiary)',
                whiteSpace: 'nowrap',
                paddingRight: 48,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity:0; transform:translateY(24px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes slide-in-from-right {
          from { opacity:0; transform:translateX(40px); }
          to { opacity:1; transform:translateX(0); }
        }
        @media (max-width: 767px) {
          #hero { padding: 100px 24px 80px !important; }
          #hero h1 { font-size: clamp(44px, 12vw, 72px) !important; }
        }
      `}</style>
    </section>
  )
}
