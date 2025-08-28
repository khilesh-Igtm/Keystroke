// Logger utility for Keystroke Neon Typing Test
// Provides comprehensive logging with different levels and formatting

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  component?: string
  userId?: string
  sessionId?: string
}

class Logger {
  private logLevel: LogLevel = LogLevel.INFO
  private sessionId: string
  private logs: LogEntry[] = []
  private maxLogs: number = 1000

  constructor() {
    this.sessionId = this.generateSessionId()
    this.logLevel = this.getLogLevelFromEnv()
    this.initializeLogger()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getLogLevelFromEnv(): LogLevel {
    const envLevel = import.meta.env.VITE_LOG_LEVEL?.toLowerCase()
    switch (envLevel) {
      case 'debug': return LogLevel.DEBUG
      case 'info': return LogLevel.INFO
      case 'warn': return LogLevel.WARN
      case 'error': return LogLevel.ERROR
      default: return LogLevel.INFO
    }
  }

  private initializeLogger(): void {
    this.info('🚀 Keystroke Logger initialized', {
      sessionId: this.sessionId,
      logLevel: LogLevel[this.logLevel],
      timestamp: new Date().toISOString()
    })

    // Log uncaught errors
    window.addEventListener('error', (event) => {
      this.error('Uncaught Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      })
    })

    // Log unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled Promise Rejection', {
        reason: event.reason
      })
    })
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, component?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      component,
      sessionId: this.sessionId
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel
  }

  private formatConsoleOutput(entry: LogEntry): void {
    const levelEmojis = {
      [LogLevel.DEBUG]: '🐛',
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.ERROR]: '❌'
    }

    const levelColors = {
      [LogLevel.DEBUG]: 'color: #888',
      [LogLevel.INFO]: 'color: #00ffff',
      [LogLevel.WARN]: 'color: #ffff00',
      [LogLevel.ERROR]: 'color: #ff0080'
    }

    const emoji = levelEmojis[entry.level]
    const color = levelColors[entry.level]
    const componentStr = entry.component ? ` [${entry.component}]` : ''
    
    const output = `%c${emoji} [${entry.timestamp}]${componentStr} ${entry.message}`
    
    if (entry.data) {
      console.groupCollapsed(output, color)
      console.log('Data:', entry.data)
      console.groupEnd()
    } else {
      console.log(output, color)
    }
  }

  private storeLog(entry: LogEntry): void {
    this.logs.push(entry)
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Store in localStorage for persistence
    try {
      const recentLogs = this.logs.slice(-50) // Keep last 50 logs in storage
      localStorage.setItem('keystroke_logs', JSON.stringify(recentLogs))
    } catch (error) {
      console.warn('Failed to store logs in localStorage:', error)
    }
  }

  private log(level: LogLevel, message: string, data?: any, component?: string): void {
    if (!this.shouldLog(level)) return

    const entry = this.createLogEntry(level, message, data, component)
    
    this.formatConsoleOutput(entry)
    this.storeLog(entry)
  }

  // Public logging methods
  debug(message: string, data?: any, component?: string): void {
    this.log(LogLevel.DEBUG, message, data, component)
  }

  info(message: string, data?: any, component?: string): void {
    this.log(LogLevel.INFO, message, data, component)
  }

  warn(message: string, data?: any, component?: string): void {
    this.log(LogLevel.WARN, message, data, component)
  }

  error(message: string, data?: any, component?: string): void {
    this.log(LogLevel.ERROR, message, data, component)
  }

  // Specialized logging methods for typing test events
  logTypingEvent(event: string, data: any): void {
    this.info(`⌨️ Typing Event: ${event}`, data, 'TypingTest')
  }

  logPerformanceMetric(metric: string, value: number, unit: string): void {
    this.info(`📊 Performance: ${metric}`, { value, unit }, 'Performance')
  }

  logUserAction(action: string, data?: any): void {
    this.info(`👤 User Action: ${action}`, data, 'UserInteraction')
  }

  logTestResult(results: any): void {
    this.info('🏆 Test Completed', results, 'TestResults')
  }

  // Utility methods
  getSessionId(): string {
    return this.sessionId
  }

  getAllLogs(): LogEntry[] {
    return [...this.logs]
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level)
  }

  getLogsByComponent(component: string): LogEntry[] {
    return this.logs.filter(log => log.component === component)
  }

  clearLogs(): void {
    this.logs = []
    localStorage.removeItem('keystroke_logs')
    this.info('🧹 Logs cleared')
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  downloadLogs(): void {
    const logsJson = this.exportLogs()
    const blob = new Blob([logsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `keystroke-logs-${this.sessionId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    this.info('📥 Logs downloaded')
  }

  // Performance monitoring
  startTimer(label: string): void {
    console.time(label)
    this.debug(`⏱️ Timer started: ${label}`)
  }

  endTimer(label: string): void {
    console.timeEnd(label)
    this.debug(`⏱️ Timer ended: ${label}`)
  }

  // Memory usage tracking
  logMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.logPerformanceMetric('Memory Usage', Math.round(memory.usedJSHeapSize / 1024 / 1024), 'MB')
    }
  }
}

// Create singleton instance
const logger = new Logger()

export default logger

// Convenience function for quick access
export const log = {
  debug: (message: string, data?: any, component?: string) => logger.debug(message, data, component),
  info: (message: string, data?: any, component?: string) => logger.info(message, data, component),
  warn: (message: string, data?: any, component?: string) => logger.warn(message, data, component),
  error: (message: string, data?: any, component?: string) => logger.error(message, data, component),
  typingEvent: (event: string, data: any) => logger.logTypingEvent(event, data),
  performance: (metric: string, value: number, unit: string) => logger.logPerformanceMetric(metric, value, unit),
  userAction: (action: string, data?: any) => logger.logUserAction(action, data),
  testResult: (results: any) => logger.logTestResult(results)
}