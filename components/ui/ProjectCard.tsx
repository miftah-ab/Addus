'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Project } from '@/lib/types'

interface Props {
  project: Project
}

const CATEGORY_LABELS: Record<string, string> = {
  'ai-tools':   'AI Tool',
  'saas':       'SaaS',
  'automation': 'Automation',
  'mobile':     'Mobile',
}

export default function ProjectCard({ project }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x, y })
  }

  const onLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x * 5}deg) rotateX(${-tilt.y * 5}deg) translateZ(${hovered ? '5px' : '0'})`,
        transition: hovered ? 'none' : 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {/* Image / cover */}
      <div
        style={{
          aspectRatio: '16/9',
          background: 'var(--bg-tertiary)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={`${project.name} screenshot`}
            fill
            style={{
              objectFit: 'cover',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="font-clash" style={{ fontSize: 48, color: 'var(--text-tertiary)', opacity: 0.25 }}>
              {project.name[0]}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span className="pill pill-neutral" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            {CATEGORY_LABELS[project.category] ?? project.category}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: '20px 22px 22px' }}>
        <h3
          className="font-clash"
          style={{ fontSize: 19, color: 'var(--text-primary)', marginBottom: 8, fontWeight: 600 }}
        >
          {project.name}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.75 }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {project.tech_stack.map(t => (
            <span key={t} className="pill pill-neutral" style={{ fontSize: 10 }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            borderTop: '1px solid var(--border)',
            paddingTop: 14,
          }}
        >
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              Live site ↗
            </a>
          ) : (
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Private</span>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
