/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC143C',
          dark: '#8B0000',
          deeper: '#660000',
          glow: '#FF1744',
        },
        gold: {
          DEFAULT: '#C9A84C',
          warm: '#D4890F',
        },
        parchment: '#F5F0E8',
        surface: {
          DEFAULT: '#0A0A0A',
          elevated: '#141414',
          hover: '#1A1A1A',
          theater: '#1A0808',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#808080',
          gold: '#B38080',
          goldMuted: '#6B4B4B',
        },
        border: {
          DEFAULT: '#1A1A1A',
          subtle: '#3D0000',
        },
        success: '#C9A84C',
        error: '#FF1744',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Garamond', 'serif'],
      },
      spacing: {
        '4.5': '18px',
        '18': '72px',
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
