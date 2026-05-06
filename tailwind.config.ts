import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#080808',
        'bg-secondary': '#0F0F0F',
        'bg-tertiary': '#141414',
        'accent-green': '#00FF88',
        'accent-purple': '#7B61FF',
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        geist: ['var(--font-geist)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
