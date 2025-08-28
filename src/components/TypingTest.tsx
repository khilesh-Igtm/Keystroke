import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Clock, Type, Target, Zap } from 'lucide-react'
import { TestSettings, TestResults } from '../App'
import { generateWords } from '../utils/wordGenerator'

interface TypingTestProps {
  settings: TestSettings
  onTestComplete: (results: TestResults) => void
}

interface CharState {
  char: string
  status: 'pending' | 'correct' | 'incorrect'
}

interface WordState {
  word: string
  chars: CharState[]
  status: 'pending' | 'correct' | 'incorrect' | 'current'
}

const TypingTest: React.FC<TypingTestProps> = ({ settings, onTestComplete }) => {
  const [words, setWords] = useState<WordState[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(settings.duration)
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [correctChars, setCorrectChars] = useState(0)
  const [incorrectChars, setIncorrectChars] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)

  // Initialize words
  useEffect(() => {
    const generatedWords = generateWords(settings.wordCount, settings.difficulty)
    const wordStates: WordState[] = generatedWords.map((word, index) => ({
      word,
      chars: word.split('').map(char => ({ char, status: 'pending' })),
      status: index === 0 ? 'current' : 'pending'
    }))
    setWords(wordStates)
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setInput('')
    setTimeLeft(settings.duration)
    setIsActive(false)
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
    setIncorrectChars(0)
  }, [settings])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTestComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  // Calculate WPM and accuracy
  const calculateStats = useCallback(() => {
    if (!startTime) return

    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
    const totalChars = correctChars + incorrectChars
    const wordsTyped = correctChars / 5 // Standard: 5 characters = 1 word
    const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0
    const currentAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100

    setWpm(currentWpm)
    setAccuracy(currentAccuracy)
  }, [startTime, correctChars, incorrectChars])

  // Update stats whenever chars change
  useEffect(() => {
    calculateStats()
  }, [calculateStats, correctChars, incorrectChars])

  const handleTestComplete = useCallback(() => {
    setIsActive(false)
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : settings.duration
    const totalChars = correctChars + incorrectChars
    
    const results: TestResults = {
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars,
      timeElapsed
    }
    
    onTestComplete(results)
  }, [startTime, settings.duration, wpm, accuracy, correctChars, incorrectChars, onTestComplete])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Start test on first keystroke
    if (!isActive && !startTime) {
      setIsActive(true)
      setStartTime(Date.now())
    }

    // Handle space (word completion)
    if (value.endsWith(' ')) {
      const typedWord = value.trim()
      const currentWord = words[currentWordIndex]
      
      if (!currentWord) return

      // Update word status
      const newWords = [...words]
      newWords[currentWordIndex] = {
        ...currentWord,
        status: typedWord === currentWord.word ? 'correct' : 'incorrect'
      }
      
      // Count correct/incorrect characters for this word
      let correct = 0
      let incorrect = 0
      
      for (let i = 0; i < Math.max(typedWord.length, currentWord.word.length); i++) {
        if (i < typedWord.length && i < currentWord.word.length) {
          if (typedWord[i] === currentWord.word[i]) {
            correct++
          } else {
            incorrect++
          }
        } else if (i >= typedWord.length) {
          // Missing characters
          incorrect++
        } else {
          // Extra characters
          incorrect++
        }
      }
      
      setCorrectChars(prev => prev + correct)
      setIncorrectChars(prev => prev + incorrect)

      // Move to next word
      if (currentWordIndex < words.length - 1) {
        newWords[currentWordIndex + 1] = {
          ...newWords[currentWordIndex + 1],
          status: 'current'
        }
        setCurrentWordIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      } else {
        // Test complete
        handleTestComplete()
        return
      }
      
      setWords(newWords)
      setInput('')
      return
    }

    // Handle character typing
    const currentWord = words[currentWordIndex]
    if (!currentWord) return

    const newWords = [...words]
    const newChars = [...currentWord.chars]
    
    // Update character states
    for (let i = 0; i < Math.max(value.length, currentWord.word.length); i++) {
      if (i < newChars.length) {
        if (i < value.length) {
          newChars[i] = {
            ...newChars[i],
            status: value[i] === currentWord.word[i] ? 'correct' : 'incorrect'
          }
        } else {
          newChars[i] = {
            ...newChars[i],
            status: 'pending'
          }
        }
      }
    }
    
    newWords[currentWordIndex] = {
      ...currentWord,
      chars: newChars
    }
    
    setWords(newWords)
    setCurrentCharIndex(value.length)
    setInput(value)
  }

  // Auto-scroll to current word
  useEffect(() => {
    if (wordsContainerRef.current) {
      const currentWordElement = wordsContainerRef.current.children[currentWordIndex] as HTMLElement
      if (currentWordElement) {
        currentWordElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }, [currentWordIndex])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="neon-glass p-8 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/30 border border-neon-cyan/30">
            <div className="w-14 h-14 bg-neon-cyan/20 border-2 border-neon-cyan/50 rounded-xl flex items-center justify-center animate-neon-glow">
              <Clock className="w-7 h-7 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))' }} />
            </div>
            <div>
              <p className="text-xs text-neon-cyan font-bold uppercase tracking-wider mb-1">⏱️ TIME</p>
              <p className="text-2xl font-bold text-neon-cyan neon-text">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/30 border border-neon-green/30">
            <div className="w-14 h-14 bg-neon-green/20 border-2 border-neon-green/50 rounded-xl flex items-center justify-center animate-neon-glow">
              <Zap className="w-7 h-7 text-neon-green" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.8))' }} />
            </div>
            <div>
              <p className="text-xs text-neon-green font-bold uppercase tracking-wider mb-1">⚡ SPEED</p>
              <p className="text-2xl font-bold text-neon-green neon-text">
                {wpm} WPM
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/30 border border-neon-pink/30">
            <div className="w-14 h-14 bg-neon-pink/20 border-2 border-neon-pink/50 rounded-xl flex items-center justify-center animate-neon-glow">
              <Target className="w-7 h-7 text-neon-pink" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 128, 0.8))' }} />
            </div>
            <div>
              <p className="text-xs text-neon-pink font-bold uppercase tracking-wider mb-1">🎯 ACCURACY</p>
              <p className="text-2xl font-bold text-neon-pink neon-text">
                {accuracy}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800/30 border border-neon-yellow/30">
            <div className="w-14 h-14 bg-neon-yellow/20 border-2 border-neon-yellow/50 rounded-xl flex items-center justify-center animate-neon-glow">
              <Type className="w-7 h-7 text-neon-yellow" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))' }} />
            </div>
            <div>
              <p className="text-xs text-neon-yellow font-bold uppercase tracking-wider mb-1">📊 PROGRESS</p>
              <p className="text-2xl font-bold text-neon-yellow neon-text">
                {currentWordIndex + 1}/{words.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="neon-glass p-10 shadow-lg relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-pink/5 pointer-events-none"></div>
        
        <div
          ref={wordsContainerRef}
          className="text-2xl leading-relaxed font-mono h-40 overflow-hidden relative mb-8 p-6 bg-dark-800/30 rounded-xl border-2 border-neon-cyan/20"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(42, 42, 42, 0.6) 100%)',
            boxShadow: 'inset 0 0 30px rgba(0, 255, 255, 0.1), 0 0 30px rgba(0, 255, 255, 0.2)'
          }}
        >
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={`typing-word inline-block px-2 py-1 transition-all duration-300 ${
                  word.status === 'current'
                    ? 'word-current scale-110'
                    : word.status === 'correct'
                    ? 'word-correct'
                    : word.status === 'incorrect'
                    ? 'word-incorrect'
                    : ''
                }`}
              >
                {word.chars.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`transition-all duration-150 ${
                      wordIndex === currentWordIndex && charIndex === currentCharIndex
                        ? 'char-current scale-125'
                        : char.status === 'correct'
                        ? 'char-correct'
                        : char.status === 'incorrect'
                        ? 'char-incorrect'
                        : 'char-pending'
                    }`}
                  >
                    {char.char}
                  </span>
                ))}
                {wordIndex === currentWordIndex && currentCharIndex >= word.word.length && (
                  <span className="typing-cursor ml-1" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={timeLeft === 0}
          className="neon-input w-full text-xl font-mono font-bold disabled:opacity-50"
          style={{
            fontSize: '1.5rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            borderWidth: '3px'
          }}
          placeholder={timeLeft === 0 ? "🎉 MISSION COMPLETE!" : "🚀 START TYPING..."}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
        />
        
        <div className="mt-4 text-center">
          <p className="text-neon-cyan font-bold uppercase tracking-wider">
            {timeLeft > 0 ? (
              <>🎯 TYPE THE NEON WORDS ABOVE • PRESS SPACE TO ADVANCE</>
            ) : (
              <>🏆 CYBERPUNK MISSION ACCOMPLISHED!</>
            )}
          </p>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingTest