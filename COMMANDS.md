# 🎮 Keystroke Neon - Command Reference

## 🚀 Quick Start Commands

```bash
# 1. Setup (run once)
./setup.sh

# 2. Start server (auto-opens browser)
./start.sh

# 3. Open browser (if server running)
./open.sh

# 4. Check health
./health.sh

# 5. Stop server
./stop.sh
```

## 📋 All Available Commands

### 🔧 Setup & Installation
```bash
./setup.sh                 # Full project setup
chmod +x *.sh              # Make scripts executable
```

### 🚀 Server Management
```bash
./start.sh                 # Start development server (auto-opens browser)
./stop.sh                  # Stop server safely
./health.sh                # Check server health
./open.sh                  # Open browser to typing test
npm run restart            # Restart server (stop + start)
npm run open               # Open browser (same as ./open.sh)
```

### 📊 Monitoring & Logs
```bash
npm run logs               # Watch live app logs
npm run logs:error         # Watch error logs
npm run logs:clear         # Clear all log files
tail -f logs/app.log       # Follow app logs directly
tail -f logs/error.log     # Follow error logs directly
```

### ⚙️ Development
```bash
npm run dev                # Start Vite dev server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint
npm run serve              # Build and serve production
```

### 🧹 Maintenance
```bash
npm run clean              # Clean build files and logs
rm -rf node_modules        # Remove dependencies
npm install                # Reinstall dependencies
```

### 🔍 Debugging
```bash
lsof -ti:3000              # Check what's using port 3000
ps aux | grep vite         # Find Vite processes
kill -9 $(lsof -ti:3000)   # Force kill port 3000
```

## 🌐 URLs & Endpoints

```bash
# Main application
http://localhost:3000

# Check if server responds
curl http://localhost:3000

# Check response time
curl -w "@-" -o /dev/null -s http://localhost:3000 <<< 'url: %{url_effective}\ntime_namelookup: %{time_namelookup}\ntime_connect: %{time_connect}\ntime_total: %{time_total}\n'
```

## 📁 Important Files & Directories

```bash
# Configuration
.env                       # Environment variables
package.json              # Dependencies and scripts
vite.config.ts            # Vite configuration
tailwind.config.js        # Tailwind CSS config

# Source Code
src/                       # Main source directory
src/components/            # React components
src/utils/logger.ts        # Logging system

# Logs & Runtime
logs/                      # Log files directory
logs/app.log              # Application logs
logs/error.log            # Error logs
.server.pid               # Server process ID

# Scripts
setup.sh                  # Setup script
start.sh                  # Start script
stop.sh                   # Stop script
health.sh                 # Health check script
```

## 🎯 Usage Examples

### Complete Workflow
```bash
# First time setup
git clone <repo-url>
cd Keystroke
./setup.sh

# Daily development
./start.sh                # Start server
# ... do development work ...
./health.sh               # Check status
./stop.sh                 # Stop when done

# Troubleshooting
./health.sh               # Diagnose issues
npm run logs              # Check logs
npm run restart           # Restart if needed
```

### Monitoring Session
```bash
# Terminal 1: Run server
./start.sh

# Terminal 2: Monitor health
watch -n 5 './health.sh'

# Terminal 3: Watch logs
npm run logs
```

### Production Deployment
```bash
npm run build             # Build for production
npm run serve             # Test production build
# Deploy dist/ directory to your hosting
```

## ⚡ Pro Tips

### Quick Status Check
```bash
./health.sh && echo "✅ All good!" || echo "❌ Issues found"
```

### Auto-restart on Crash
```bash
while true; do ./start.sh; sleep 5; done
```

### Performance Monitoring
```bash
# Memory usage
ps -o pid,rss,comm -p $(lsof -ti:3000)

# CPU usage
top -p $(lsof -ti:3000)
```

### Log Analysis
```bash
# Count errors
grep -c "ERROR" logs/app.log

# Recent errors
grep "ERROR" logs/app.log | tail -10

# Performance metrics
grep "Performance" logs/app.log
```

## 🚨 Emergency Commands

### Force Stop Everything
```bash
pkill -f "vite"
pkill -f "node"
kill -9 $(lsof -ti:3000)
rm -f .server.pid
```

### Nuclear Reset
```bash
./stop.sh
npm run clean
rm -rf node_modules package-lock.json
./setup.sh
./start.sh
```

### Port Issues
```bash
# See what's using port 3000
lsof -i :3000

# Kill everything on port 3000
lsof -ti:3000 | xargs kill -9
```

---

**🎮 Ready to type at neon speed! Use these commands to manage your cyberpunk typing experience. ⚡**