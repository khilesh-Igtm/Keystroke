import React from 'react'
import { Trophy, Target, Clock, Type, RotateCcw, Share2, Download } from 'lucide-react'
import { TestResults } from '../App'

interface ResultsProps {
  results: TestResults
  onRestart: () => void
}

const Results: React.FC<ResultsProps> = ({ results, onRestart }) => {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 70) return { rating: 'Excellent', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' }
    if (wpm >= 50) return { rating: 'Good', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' }
    if (wpm >= 30) return { rating: 'Average', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' }
    return { rating: 'Needs Practice', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' }
  }

  const getAccuracyRating = (accuracy: number) => {
    if (accuracy >= 95) return { rating: 'Perfect', color: 'text-green-600 dark:text-green-400' }
    if (accuracy >= 85) return { rating: 'Great', color: 'text-blue-600 dark:text-blue-400' }
    if (accuracy >= 75) return { rating: 'Good', color: 'text-yellow-600 dark:text-yellow-400' }
    return { rating: 'Needs Work', color: 'text-red-600 dark:text-red-400' }
  }

  const wpmRating = getWpmRating(results.wpm)
  const accuracyRating = getAccuracyRating(results.accuracy)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const shareResults = () => {
    const text = `I just completed a typing test on Keystroke! 🚀\n\n⚡ Speed: ${results.wpm} WPM\n🎯 Accuracy: ${results.accuracy}%\n\nTry it yourself!`
    
    if (navigator.share) {
      navigator.share({
        title: 'My Keystroke Typing Test Results',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!')
      })
    }
  }

  const downloadResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      wpm: results.wpm,
      accuracy: results.accuracy,
      correctChars: results.correctChars,
      incorrectChars: results.incorrectChars,
      totalChars: results.totalChars,
      timeElapsed: results.timeElapsed
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `keystroke-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-neon-glow">
          <Trophy className="w-12 h-12 text-dark-900" />
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4 uppercase tracking-wider">MISSION COMPLETE!</h1>
        <p className="text-neon-green text-xl font-bold uppercase tracking-wider neon-text">
          🏆 CYBERPUNK PERFORMANCE ANALYSIS 🏆
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WPM */}
        <div className="neon-glass p-10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-transparent pointer-events-none"></div>
          <div className="w-20 h-20 bg-neon-green/20 border-3 border-neon-green rounded-full flex items-center justify-center mx-auto mb-6 animate-neon-glow">
            <Type className="w-10 h-10 text-neon-green" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.8))' }} />
          </div>
          <div className="text-7xl font-bold text-neon-green neon-text mb-4">
            {results.wpm}
          </div>
          <div className="text-xl text-neon-cyan font-bold uppercase tracking-wider mb-2">
            ⚡ WORDS PER MINUTE
          </div>
          <div className={`text-lg font-bold uppercase tracking-wider ${wpmRating.color}`}>
            🏅 {wpmRating.rating}
          </div>
        </div>

        {/* Accuracy */}
        <div className="neon-glass p-10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-transparent pointer-events-none"></div>
          <div className="w-20 h-20 bg-neon-pink/20 border-3 border-neon-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-neon-glow">
            <Target className="w-10 h-10 text-neon-pink" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 128, 0.8))' }} />
          </div>
          <div className="text-7xl font-bold text-neon-pink neon-text mb-4">
            {results.accuracy}%
          </div>
          <div className="text-xl text-neon-cyan font-bold uppercase tracking-wider mb-2">
            🎯 PRECISION RATING
          </div>
          <div className={`text-lg font-bold uppercase tracking-wider ${accuracyRating.color}`}>
            🎖️ {accuracyRating.rating}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="neon-glass p-10 shadow-lg">
        <h2 className="text-3xl font-bold text-neon-cyan neon-text mb-8 text-center uppercase tracking-wider">
          📊 DETAILED CYBER METRICS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-dark-800/30 rounded-xl border-2 border-neon-cyan/30">
            <div className="w-16 h-16 bg-neon-cyan/20 border-2 border-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))' }} />
            </div>
            <div className="text-3xl font-bold text-neon-cyan neon-text mb-2">
              {formatTime(results.timeElapsed)}
            </div>
            <div className="text-sm text-neon-cyan font-bold uppercase tracking-wider">
              ⏱️ TIME ELAPSED
            </div>
          </div>

          <div className="text-center p-6 bg-dark-800/30 rounded-xl border-2 border-neon-green/30">
            <div className="w-16 h-16 bg-neon-green/20 border-2 border-neon-green rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                <span className="text-dark-900 text-sm font-bold">✓</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-neon-green neon-text mb-2">
              {results.correctChars}
            </div>
            <div className="text-sm text-neon-green font-bold uppercase tracking-wider">
              ✅ CORRECT HITS
            </div>
          </div>

          <div className="text-center p-6 bg-dark-800/30 rounded-xl border-2 border-neon-pink/30">
            <div className="w-16 h-16 bg-neon-pink/20 border-2 border-neon-pink rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center">
                <span className="text-dark-900 text-sm font-bold">✗</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-neon-pink neon-text mb-2">
              {results.incorrectChars}
            </div>
            <div className="text-sm text-neon-pink font-bold uppercase tracking-wider">
              ❌ ERROR COUNT
            </div>
          </div>

          <div className="text-center p-6 bg-dark-800/30 rounded-xl border-2 border-neon-yellow/30">
            <div className="w-16 h-16 bg-neon-yellow/20 border-2 border-neon-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
              <Type className="w-8 h-8 text-neon-yellow" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))' }} />
            </div>
            <div className="text-3xl font-bold text-neon-yellow neon-text mb-2">
              {results.totalChars}
            </div>
            <div className="text-sm text-neon-yellow font-bold uppercase tracking-wider">
              🎯 TOTAL KEYSTROKES
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="neon-glass p-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-neon-cyan uppercase tracking-wider">
            🎯 PRECISION ANALYSIS
          </span>
          <span className="text-lg text-neon-green font-bold">
            {results.correctChars} / {results.totalChars} KEYSTROKES
          </span>
        </div>
        <div className="w-full bg-dark-800 rounded-full h-6 border-2 border-neon-cyan/30">
          <div
            className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
            style={{ 
              width: `${results.accuracy}%`,
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-border-flow"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          onClick={onRestart}
          className="neon-button rounded-xl text-lg py-4 px-8 flex items-center justify-center space-x-3"
        >
          <RotateCcw className="w-6 h-6" />
          <span>🚀 RETRY MISSION</span>
        </button>
        
        <button
          onClick={shareResults}
          className="px-8 py-4 bg-dark-800/50 border-2 border-neon-pink/30 text-neon-pink hover:border-neon-pink hover:bg-neon-pink/10 transition-all duration-300 rounded-xl font-bold uppercase tracking-wider text-lg flex items-center justify-center space-x-3"
          style={{ 
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)',
            textShadow: '0 0 10px rgba(255, 0, 128, 0.5)'
          }}
        >
          <Share2 className="w-6 h-6" />
          <span>📤 SHARE VICTORY</span>
        </button>
        
        <button
          onClick={downloadResults}
          className="px-8 py-4 bg-dark-800/50 border-2 border-neon-green/30 text-neon-green hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 rounded-xl font-bold uppercase tracking-wider text-lg flex items-center justify-center space-x-3"
          style={{ 
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
          }}
        >
          <Download className="w-6 h-6" />
          <span>💾 SAVE DATA</span>
        </button>
      </div>

      {/* Tips */}
      <div className="neon-glass p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-neon-yellow neon-text mb-6 text-center uppercase tracking-wider">
          💡 CYBERPUNK TRAINING PROTOCOLS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
          <div className="p-6 bg-dark-800/30 rounded-xl border-2 border-neon-green/30">
            <strong className="text-neon-green text-lg font-bold uppercase tracking-wider mb-4 block">⚡ SPEED ENHANCEMENT:</strong>
            <ul className="space-y-2 text-neon-cyan">
              <li className="flex items-start space-x-2">
                <span className="text-neon-green">▸</span>
                <span>Practice regular cyber-sessions (15-30 min)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-neon-green">▸</span>
                <span>Master rhythm before raw speed boost</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-neon-green">▸</span>
                <span>Deploy all 10 fingers in combat mode</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-dark-800/30 rounded-xl border-2 border-neon-pink/30">
            <strong className="text-neon-pink text-lg font-bold uppercase tracking-wider mb-4 block">🎯 PRECISION TRAINING:</strong>
            <ul className="space-y-2 text-neon-cyan">
              <li className="flex items-start space-x-2">
                <span className="text-neon-pink">▸</span>
                <span>Reduce velocity, maximize accuracy first</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-neon-pink">▸</span>
                <span>Keep eyes on screen matrix, not keys</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-neon-pink">▸</span>
                <span>Take neural rest breaks to prevent fatigue</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results