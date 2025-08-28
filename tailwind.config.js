/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        neon: {
          pink: '#ff0080',
          cyan: '#00ffff',
          green: '#00ff41',
          purple: '#8a2be2',
          yellow: '#ffff00',
          orange: '#ff4500',
          blue: '#0080ff',
        },
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#00ffff',
          600: '#00e6e6',
          700: '#00cccc',
          800: '#00b3b3',
          900: '#009999',
        },
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s ease-in-out 3',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 1.5s ease-in-out infinite alternate',
        'text-flicker': 'text-flicker 0.1s ease-in-out infinite alternate',
        'border-flow': 'border-flow 3s linear infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'neon-pulse': {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '50%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'neon-glow': {
          'from': {
            boxShadow: '0 0 20px currentColor',
          },
          'to': {
            boxShadow: '0 0 30px currentColor, 0 0 40px currentColor',
          },
        },
        'text-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 15px currentColor, 0 0 20px currentColor',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
        'border-flow': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}