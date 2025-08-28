# 🚀 Keystroke Neon Typing Test - Installation & Setup Guide

Welcome to the **Keystroke Neon Typing Test** - the most advanced cyberpunk typing speed test experience! This guide will get you up and running in minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Terminal/Command Prompt** access
- A modern web browser (Chrome, Firefox, Safari, Edge)

## ⚡ Quick Start (Automated Setup)

### 1. Clone and Navigate
```bash
git clone <your-repo-url>
cd Keystroke
```

### 2. Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

The setup script will automatically:
- ✅ Check system requirements
- ✅ Install dependencies
- ✅ Create log directories
- ✅ Set up environment files
- ✅ Make scripts executable

### 3. Start the Server
```bash
./start.sh
```

### 4. Open Your Browser
Navigate to: **http://localhost:3000**

🎉 **That's it! You're ready to experience neon typing!**

---

## 🛠️ Manual Setup (Alternative)

If you prefer manual setup or the automated script doesn't work:

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Logs Directory
```bash
mkdir -p logs
touch logs/app.log logs/error.log logs/access.log
```

### 3. Start Development Server
```bash
npm run dev
```

---

## 📜 Available Scripts

Once setup is complete, you can use these scripts:

### Server Management
```bash
./start.sh          # Start the development server
./stop.sh           # Stop the server safely
./health.sh         # Check server health and status
```

### NPM Scripts
```bash
npm run start       # Start server (calls ./start.sh)
npm run stop        # Stop server (calls ./stop.sh) 
npm run health      # Health check (calls ./health.sh)
npm run restart     # Restart server (stop + start)
```

### Logging & Monitoring
```bash
npm run logs        # Follow live app logs
npm run logs:error  # Follow error logs
npm run logs:clear  # Clear all log files
```

### Development
```bash
npm run dev         # Start Vite dev server directly
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Maintenance
```bash
npm run clean       # Clean build files and logs
npm run serve       # Build and serve production
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file to customize your setup:

```env
NODE_ENV=development
VITE_APP_NAME=Keystroke
VITE_APP_VERSION=1.0.0
VITE_PORT=3000
VITE_LOG_LEVEL=info
```

### Log Levels
Set `VITE_LOG_LEVEL` to control logging verbosity:
- `debug` - All logs (most verbose)
- `info` - Information and above (default)
- `warn` - Warnings and errors only
- `error` - Errors only

---

## 📊 Monitoring & Logs

### Real-time Monitoring
```bash
# Check server health
./health.sh

# Watch live logs
npm run logs

# Monitor errors
npm run logs:error
```

### Log Files Location
- **App Logs**: `logs/app.log`
- **Error Logs**: `logs/error.log`
- **Access Logs**: `logs/access.log`

### Health Check Features
The health script checks:
- ✅ Port availability (3000)
- ✅ Server response (HTTP 200)
- ✅ Response time measurement
- ✅ Memory usage monitoring
- ✅ CPU usage tracking
- ✅ Server uptime
- ✅ Log file analysis

---

## 🚨 Troubleshooting

### Common Issues

#### Port 3000 Already in Use
```bash
./stop.sh           # Stop any existing server
./start.sh          # Start fresh
```

#### Permission Denied on Scripts
```bash
chmod +x *.sh       # Make scripts executable
```

#### Node Version Issues
```bash
node --version      # Check your Node.js version
# Upgrade to Node.js 16+ if needed
```

#### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install         # Fresh install
```

#### Server Won't Start
```bash
npm run logs        # Check logs for errors
./health.sh         # Run diagnostics
npm run clean       # Clean and restart
./setup.sh          # Re-run setup
```

### Reset Everything
If nothing works, reset completely:
```bash
npm run clean       # Clean all files
./setup.sh          # Re-setup
./start.sh          # Start fresh
```

---

## 🌟 Features Overview

Once running, you'll have access to:

### ⚡ Core Features
- **Real-time WPM tracking**
- **Live accuracy monitoring**
- **Multiple test durations** (15s - 5min)
- **Difficulty levels** (Easy/Medium/Hard)
- **Customizable word counts**

### 🎨 Neon UI Features
- **Cyberpunk theme** with glowing effects
- **Dark/Light mode** toggle
- **Responsive design** (mobile-friendly)
- **Smooth animations** and transitions
- **Character-level feedback**

### 📈 Advanced Features
- **Detailed statistics** and performance ratings
- **Results sharing** and export
- **Session logging** and analytics
- **Performance monitoring**
- **Health diagnostics**

---

## 📝 Development

### Project Structure
```
Keystroke/
├── src/
│   ├── components/     # React components
│   ├── utils/         # Utilities (logger, etc.)
│   ├── context/       # React contexts
│   └── ...
├── logs/              # Application logs
├── *.sh               # Shell scripts
├── package.json       # Dependencies
└── README.md         # Documentation
```

### Adding Features
1. Edit React components in `src/`
2. Use the logger: `import { log } from './utils/logger'`
3. Test with `npm run dev`
4. Check logs with `npm run logs`

---

## 🎯 Next Steps

After successful installation:

1. **Take a test** - Experience the neon typing interface
2. **Check health** - Run `./health.sh` to see monitoring
3. **View logs** - Use `npm run logs` to see real-time logging
4. **Customize** - Modify settings and themes
5. **Share results** - Export and share your achievements

---

## 🆘 Support

If you encounter issues:

1. **Check logs**: `npm run logs`
2. **Run health check**: `./health.sh`
3. **Try clean restart**: `npm run clean && ./setup.sh`
4. **Check documentation**: Read this guide thoroughly

---

**Happy Typing in the Neon Cyberspace! 🎮✨**