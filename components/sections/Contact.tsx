'use client'
import { useState, useRef } from 'react'
import { useInView, motion, AnimatePresence } from 'framer-motion'

const WEB3FORMS_KEY = 'b2e9868b-f167-41ec-aba8-cd0dc1eac91e'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: 'Portfolio | Miftah Abate',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setState('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left — heading */}
        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="section-label">Get in touch</span>
          <h2
            id="contact-headline"
            className="font-clash text-display"
            style={{ color: 'var(--text-primary)', marginBottom: 20 }}
          >
            Have something<br />worth building?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 44, maxWidth: 360 }}>
            Tell me what you&apos;re working on. I&apos;ll get back to you within 24 hours.
          </p>

          {/* Direct contact options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <a
              href="https://t.me/mif_ab"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.55, flexShrink: 0 }}>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.47c-.144.652-.53.815-1.073.505l-2.97-2.188-1.434 1.38c-.158.158-.292.292-.6.292l.213-3.03 5.52-4.988c.24-.213-.052-.332-.374-.118l-6.822 4.298-2.94-.917c-.64-.2-.65-.64.134-.95l11.462-4.42c.534-.196 1.001.118.894.666z" />
              </svg>
              Message on Telegram
            </a>
            <a
              href="https://www.linkedin.com/in/miftah-abate-dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.55, flexShrink: 0 }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <AnimatePresence mode="wait">
            {state === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  padding: '32px',
                  background: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 10,
                }}
              >
                <p style={{ fontSize: 15, color: 'var(--accent)', fontFamily: 'var(--font-geist-mono)' }}>
                  ✓ Message received. I&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                id="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ display: 'block', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.1em' }}
                  >
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ display: 'block', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.1em' }}
                  >
                    EMAIL
                  </label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6, fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.1em' }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input"
                    placeholder="Tell me what you're working on..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>

                {state === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: 13, fontFamily: 'var(--font-geist-mono)' }}>
                    Something went wrong. Try again or reach out on Telegram.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ justifyContent: 'center', marginTop: 4, width: '100%' }}
                  disabled={state === 'loading'}
                >
                  {state === 'loading' ? 'Sending...' : 'Send message →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #contact { padding: 80px 40px !important; } }
        @media (max-width: 767px) {
          #contact { padding: 80px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
