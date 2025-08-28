import React from 'react'
import { Moon, Sun, Keyboard, Github } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="neon-glass border-b-2 border-neon-cyan/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-xl flex items-center justify-center animate-neon-glow">
              <Keyboard className="w-7 h-7 text-dark-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text animate-neon-pulse">KEYSTROKE</h1>
              <p className="text-sm text-neon-green neon-text">
                CYBERPUNK TYPING TEST
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#test"
              className="text-neon-cyan hover:text-neon-pink transition-all duration-300 uppercase tracking-wider font-semibold text-sm hover:animate-neon-pulse"
            >
              TEST
            </a>
            <a
              href="#leaderboard"
              className="text-neon-cyan hover:text-neon-green transition-all duration-300 uppercase tracking-wider font-semibold text-sm hover:animate-neon-pulse"
            >
              LEADERBOARD
            </a>
            <a
              href="#about"
              className="text-neon-cyan hover:text-neon-yellow transition-all duration-300 uppercase tracking-wider font-semibold text-sm hover:animate-neon-pulse"
            >
              ABOUT
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-dark-800/50 border-2 border-neon-purple/30 text-neon-purple hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
              style={{ 
                boxShadow: '0 0 15px rgba(138, 43, 226, 0.3)',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
              }}
              aria-label={theme === 'light' ? 'Neon Mode' : 'Cyber Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-dark-800/50 border-2 border-neon-orange/30 text-neon-orange hover:border-neon-orange hover:bg-neon-orange/10 transition-all duration-300"
              style={{ 
                boxShadow: '0 0 15px rgba(255, 69, 0, 0.3)',
                textShadow: '0 0 10px rgba(255, 69, 0, 0.5)'
              }}
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header