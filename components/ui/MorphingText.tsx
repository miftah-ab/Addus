'use client'
import { useState, useEffect, useRef } from 'react'

interface Props {
  words: string[]
  interval?: number
}

export default function MorphingText({ words, interval = 2000 }: Props) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const cycle = () => {
      setVisible(false)
      timer.current = setTimeout(() => {
        setIdx(i => (i + 1) % words.length)
        setVisible(true)
      }, 450)
    }
    const id = setInterval(cycle, interval)
    return () => { clearInterval(id); clearTimeout(timer.current) }
  }, [words, interval])

  return (
    <span
      key={idx}
      className="text-green font-clash"
      style={{
        display: 'inline-block',
        animation: visible ? 'morph-in 0.5s ease forwards' : 'morph-out 0.4s ease forwards',
      }}
    >
      {words[idx]}
    </span>
  )
}
