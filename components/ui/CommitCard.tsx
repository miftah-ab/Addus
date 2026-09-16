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
      aria-label={`Commit: ${commit.message} in ${commit.repoDisplay}, ${commit.date}`}
      style={{
        animation: `fade-up 0.45s ease ${index * 0.07}s both`,
        textDecoration: 'none',
      }}
    >
      {/* Indicator dot */}
      <div style={{ flexShrink: 0 }} aria-hidden="true">
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: commit.isToday ? 'pulse-dot 2s ease-in-out infinite' : 'none',
            opacity: commit.isToday ? 1 : 0.3,
          }}
        />
      </div>

      {/* Repo */}
      <span
        className="pill pill-accent"
        style={{ flexShrink: 0, fontFamily: 'var(--font-geist-mono)', fontSize: 10 }}
      >
        {commit.repoDisplay}
      </span>

      {/* Message */}
      <span
        style={{
          flex: 1,
          fontSize: 13,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-geist-mono)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {commit.message}
      </span>

      {/* Time */}
      <span
        style={{
          flexShrink: 0,
          fontSize: 11,
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-geist-mono)',
        }}
      >
        {commit.date}
      </span>

      <span style={{ flexShrink: 0, color: 'var(--accent)', opacity: 0.5, fontSize: 12 }} aria-hidden="true">
        →
      </span>
    </a>
  )
}
