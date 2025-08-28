import React, { useState, useEffect } from 'react'
import { Moon, Sun, Keyboard, RotateCcw, Settings } from 'lucide-react'
import TypingTest from './components/TypingTest'
import Results from './components/Results'
import Header from './components/Header'
import ThemeProvider from './context/ThemeContext'
import { log } from './utils/logger'

export type TestSettings = {
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  wordCount: number
}

export type TestResults = {
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  totalChars: number
  timeElapsed: number
}

function App() {
  const [testResults, setTestResults] = useState<TestResults | null>(null)
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [settings, setSettings] = useState<TestSettings>({
    duration: 60,
    difficulty: 'medium',
    wordCount: 200
  })

  // Log app initialization
  useEffect(() => {
    log.info('🚀 Keystroke App initialized', {
      initialSettings: settings,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }, 'App')

    // Log performance metrics
    log.performance('App Load Time', performance.now(), 'ms')
    
    return () => {
      log.info('👋 App component unmounting', {}, 'App')
    }
  }, [])

  // Log settings changes
  useEffect(() => {
    log.userAction('Settings Changed', settings, 'App')
  }, [settings])

  const handleTestComplete = (results: TestResults) => {
    log.testResult(results)
    log.userAction('Test Completed', {
      wpm: results.wpm,
      accuracy: results.accuracy,
      settings
    }, 'App')
    
    setTestResults(results)
    setIsTestComplete(true)
  }

  const handleRestart = () => {
    log.userAction('Test Restarted', {
      previousResults: testResults,
      settings
    }, 'App')
    
    setTestResults(null)
    setIsTestComplete(false)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-dark-900 transition-all duration-300 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-green/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <Header />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {!isTestComplete ? (
            <div className="space-y-8">
              {/* Settings Panel */}
              <div className="neon-glass p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-neon-purple/20 border border-neon-purple/50">
                    <Settings className="w-6 h-6 text-neon-purple" style={{ filter: 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.8))' }} />
                  </div>
                  <h2 className="text-2xl font-bold text-neon-cyan neon-text uppercase tracking-wider">
                    CONFIGURE TEST
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-neon-cyan mb-3 uppercase tracking-wider">
                      ⏱️ DURATION
                    </label>
                    <select
                      value={settings.duration}
                      onChange={(e) => setSettings(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      className="neon-input w-full font-mono text-lg"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
                    >
                      <option value={15} className="bg-dark-800 text-neon-cyan">15 SECONDS</option>
                      <option value={30} className="bg-dark-800 text-neon-cyan">30 SECONDS</option>
                      <option value={60} className="bg-dark-800 text-neon-cyan">1 MINUTE</option>
                      <option value={120} className="bg-dark-800 text-neon-cyan">2 MINUTES</option>
                      <option value={300} className="bg-dark-800 text-neon-cyan">5 MINUTES</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-neon-pink mb-3 uppercase tracking-wider">
                      🎯 DIFFICULTY
                    </label>
                    <select
                      value={settings.difficulty}
                      onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))}
                      className="neon-input w-full font-mono text-lg"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', borderColor: 'rgba(255, 0, 128, 0.3)' }}
                    >
                      <option value="easy" className="bg-dark-800 text-neon-cyan">🟢 EASY (COMMON)</option>
                      <option value="medium" className="bg-dark-800 text-neon-cyan">🟡 MEDIUM (MIXED)</option>
                      <option value="hard" className="bg-dark-800 text-neon-cyan">🔴 HARD (COMPLEX)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-neon-green mb-3 uppercase tracking-wider">
                      📊 WORD COUNT
                    </label>
                    <select
                      value={settings.wordCount}
                      onChange={(e) => setSettings(prev => ({ ...prev, wordCount: Number(e.target.value) }))}
                      className="neon-input w-full font-mono text-lg"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', borderColor: 'rgba(0, 255, 65, 0.3)' }}
                    >
                      <option value={50} className="bg-dark-800 text-neon-cyan">50 WORDS</option>
                      <option value={100} className="bg-dark-800 text-neon-cyan">100 WORDS</option>
                      <option value={200} className="bg-dark-800 text-neon-cyan">200 WORDS</option>
                      <option value={500} className="bg-dark-800 text-neon-cyan">500 WORDS</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Typing Test */}
              <TypingTest
                settings={settings}
                onTestComplete={handleTestComplete}
              />
            </div>
          ) : (
            <Results
              results={testResults!}
              onRestart={handleRestart}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App