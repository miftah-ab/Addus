import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary':  'var(--bg-tertiary)',
        accent:         'var(--accent)',
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        geist: ['var(--font-geist)', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
