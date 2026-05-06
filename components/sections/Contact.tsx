'use client'
import { useState, useRef } from 'react'
import { useInView, motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
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
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 40px', background: 'var(--bg-primary)',
        position: 'relative', zIndex: 1,
      }}
    >
      <div style={{ width: '100%', maxWidth: 560 }}>
        <span id="contact-label" className="section-label" style={{ textAlign: 'center', display: 'block' }}>{'// get in touch'}</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            textAlign: 'center', marginBottom: 16,
          }}
        >
          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s build<br />something.
          </h2>
        </div>

        <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 48 }}>
          Have a project in mind? Want to hire a builder?<br />Just want to say hello?
        </p>

        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              style={{
                padding: '32px', background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.2)', borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <p className="text-green" style={{ fontSize: 16, fontFamily: 'var(--font-geist-mono)' }}>
                ✓ Got it. I&apos;ll be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              id="contact-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit} 
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <input
                id="contact-name"
                className="form-input"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                id="contact-email"
                className="form-input"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <textarea
                id="contact-message"
                className="form-input"
                placeholder="Tell me about your project..."
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
            {state === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: 13, fontFamily: 'var(--font-geist-mono)' }}>
                Something went wrong. Email directly at hello@addus.xyz
              </p>
            )}
            <MagneticButton
              type="submit"
              variant="primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {state === 'loading' ? 'Sending...' : 'Send it →'}
            </MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-tertiary)' }}>
          Or reach out directly —{' '}
          <a
            href="mailto:hello@addus.xyz"
            className="text-green"
            data-hover
            style={{ opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
          >
            hello@addus.xyz
          </a>
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) { #contact { padding: 80px 24px !important; } }
      `}</style>
    </section>
  )
}
