'use client'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
}

export default function MagneticButton({ children, className = '', style, onClick, href, type = 'button', variant = 'primary' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0,0)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
    }
    const onEnter = () => { el.style.transition = 'transform 0.1s ease' }

    el.addEventListener('mousemove', onMove as EventListener)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter)
    return () => {
      el.removeEventListener('mousemove', onMove as EventListener)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} style={style} data-hover>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} className={cls} style={style} data-hover>
      {children}
    </button>
  )
}
