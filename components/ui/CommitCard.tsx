'use client'
import { CommitData } from '@/lib/types'

interface Props {
  commit: CommitData
  index: number
}

export default function CommitCard({ commit, index }: Props) {
  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="commit-card"
      style={{
        animation: `slide-in-from-right 0.5s ease ${index * 0.08}s both`,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
      data-hover
    >
      {/* Pulse dot */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-green)',
            animation: commit.isToday ? 'pulse-dot 2s ease-in-out infinite' : 'none',
            opacity: commit.isToday ? 1 : 0.4,
          }}
        />
      </div>

      {/* Repo pill */}
      <span className="pill pill-green" style={{ flexShrink: 0, fontFamily: 'var(--font-geist-mono)', fontSize: 11 }}>
        {commit.repoDisplay}
      </span>

      {/* Message */}
      <span
        style={{
          flex: 1, fontSize: 14, color: 'var(--text-primary)',
          fontFamily: 'var(--font-geist-mono)', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}
      >
        {commit.message}
      </span>

      {/* Time */}
      <span style={{ flexShrink: 0, fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-geist-mono)' }}>
        {commit.date}
      </span>

      {/* Arrow */}
      <span className="text-green" style={{ flexShrink: 0, opacity: 0.5, fontSize: 14 }}>→</span>
    </a>
  )
}
