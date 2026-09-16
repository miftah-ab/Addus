'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

export default function FeaturedProject() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="featured-project"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Featured project</span>

        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Project header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 56,
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <h2
                className="font-clash text-display"
                style={{ color: 'var(--text-primary)', marginBottom: 14 }}
              >
                Adera SMS
              </h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Android', 'Automation', 'Mobile'].map(tag => (
                  <span key={tag} className="pill pill-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="https://adera-sms.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ alignSelf: 'flex-start' }}
            >
              View project ↗
            </a>
          </div>

          {/* Case study body */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}
            className="case-study-grid"
          >
            {/* Left */}
            <div>
              <CaseBlock title="The Problem">
                <p>
                  When you miss a call, you often miss the moment to respond before it passes. Most people have no way to automatically let callers know they&apos;re unavailable — the caller hangs up with no information, and the opportunity is gone.
                </p>
              </CaseBlock>

              <CaseBlock title="The Product Concept">
                <p>
                  Adera SMS is a practical Android utility designed around one clear use case: a missed call should not become a missed opportunity. The app automatically sends a customizable SMS reply when a call is missed, so the caller immediately knows the situation.
                </p>
              </CaseBlock>

              <CaseBlock title="What I Built">
                <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <li>Missed call detection using Android telephony APIs</li>
                  <li>Automatic SMS dispatch triggered on missed call events</li>
                  <li>Customizable reply message templates</li>
                  <li>Offline-first — no internet connection required</li>
                  <li>Product landing page at adera-sms.vercel.app</li>
                </ul>
              </CaseBlock>
            </div>

            {/* Right */}
            <div>
              <CaseBlock title="Technical Implementation">
                <p>
                  Built as a native Android application using Kotlin. The app registers a BroadcastReceiver that listens for phone state changes. When a missed call event is detected, it reads the caller&apos;s number and dispatches an SMS using Android&apos;s SmsManager API. All logic runs on-device with no server dependency.
                </p>
              </CaseBlock>

              <CaseBlock title="Key Product Decisions">
                <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <li>Offline-first: core functionality works without internet</li>
                  <li>Minimal permissions: only what the feature actually requires</li>
                  <li>No backend: all processing happens on the device</li>
                  <li>Simple configuration: set once, runs automatically</li>
                </ul>
              </CaseBlock>

              <CaseBlock title="Technology">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Android', 'Kotlin', 'BroadcastReceiver', 'SmsManager API', 'Telephony API'].map(t => (
                    <span key={t} className="pill pill-neutral">
                      {t}
                    </span>
                  ))}
                </div>
              </CaseBlock>

              <CaseBlock title="Current Status">
                <p>
                  The app is functional and deployed. The product landing page is live at{' '}
                  <a
                    href="https://adera-sms.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    adera-sms.vercel.app
                  </a>
                  . The core use case — automatic SMS on missed call — is fully implemented.
                </p>
              </CaseBlock>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #featured-project { padding: 80px 40px !important; } }
        @media (max-width: 767px) {
          #featured-project { padding: 80px 24px !important; }
          .case-study-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
