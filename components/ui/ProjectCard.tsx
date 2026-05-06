'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Project } from '@/lib/types'

interface Props {
  project: Project
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

  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false) }

  const colors: Record<string, string> = {
    'Next.js': '#fff', TypeScript: '#3178c6', Supabase: '#3ecf8e',
    Stripe: '#635bff', 'Groq AI': '#00ff88', 'GitHub API': '#888',
    'Telegram Bot API': '#26a5e4', Python: '#3776ab', Vercel: '#fff',
    'Framer Motion': '#bb4b96',
  }

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg) translateZ(${hovered ? '10px' : '0'})`,
        transition: hovered ? 'none' : 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0f0f0f' }}>
        <div
          style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span className="font-clash text-dimmed" style={{ fontSize: 48, opacity: 0.15 }}>
            {project.name[0]}
          </span>
        </div>
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.7)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span className="text-green font-clash" style={{ fontSize: 16, fontWeight: 600 }}>
            View project →
          </span>
        </div>
        {/* Scale image on hover */}
        {project.image_url && (
          <Image
            src={project.image_url}
            alt={project.name}
            fill
            className="absolute inset-0 object-cover"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease' }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <h3 className="font-clash" style={{ fontSize: 22, color: 'var(--text-primary)', marginBottom: 6 }}>
          {project.name}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.tech_stack.map(t => (
            <span key={t} className="pill pill-dark" style={{ fontSize: 11 }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 16 }}>
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              className="text-green" style={{ fontSize: 13, opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              Live site ↗
            </a>
          ) : (
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Coming soon</span>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="text-green" style={{ fontSize: 13, opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
