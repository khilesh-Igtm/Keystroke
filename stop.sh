#!/bin/bash

# Keystroke Neon Typing Test - Stop Script
# This script stops the development server safely

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Stop server by PID file
stop_by_pid() {
    if [ -f ".server.pid" ]; then
        PID=$(cat .server.pid)
        print_status "Found server PID: $PID"
        
        if ps -p $PID > /dev/null 2>&1; then
            print_status "Stopping server gracefully..."
            kill $PID 2>/dev/null || true
            
            # Wait for graceful shutdown
            for i in {1..10}; do
                if ! ps -p $PID > /dev/null 2>&1; then
                    print_success "Server stopped gracefully"
                    rm -f .server.pid
                    return 0
                fi
                sleep 1
            done
            
            # Force kill if graceful shutdown failed
            print_warning "Graceful shutdown failed, force killing..."
            kill -9 $PID 2>/dev/null || true
            rm -f .server.pid
            print_success "Server force stopped"
        else
            print_warning "PID $PID is not running"
            rm -f .server.pid
        fi
    fi
}

# Stop server by port
stop_by_port() {
    print_status "Checking for processes on port 3000..."
    
    if lsof -ti:3000 > /dev/null 2>&1; then
        PIDS=$(lsof -ti:3000)
        print_status "Found processes: $PIDS"
        
        for PID in $PIDS; do
            print_status "Stopping process $PID..."
            kill $PID 2>/dev/null || true
        done
        
        # Wait for processes to stop
        sleep 3
        
        # Force kill if still running
        if lsof -ti:3000 > /dev/null 2>&1; then
            print_warning "Force killing remaining processes..."
            lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        fi
        
        print_success "All processes on port 3000 stopped"
    else
        print_warning "No processes found on port 3000"
    fi
}

# Stop npm processes
stop_npm_processes() {
    print_status "Stopping npm dev processes..."
    
    # Find and stop npm run dev processes
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    sleep 1
    print_success "npm processes stopped"
}

# Log shutdown
log_shutdown() {
    if [ -d "logs" ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Server shutdown completed" >> logs/app.log
    fi
}

# Verify shutdown
verify_shutdown() {
    print_status "Verifying server shutdown..."
    
    if lsof -ti:3000 > /dev/null 2>&1; then
        print_error "Server is still running on port 3000"
        return 1
    else
        print_success "✅ Server successfully stopped"
        return 0
    fi
}

# Main function
main() {
    echo -e "${RED}"
    cat << "EOF"
    ╔═══════════════════════════════════════╗
    ║         KEYSTROKE SERVER STOP         ║
    ║          Shutting down...             ║
    ╚═══════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    print_status "Initiating server shutdown..."
    
    # Try multiple methods to ensure server stops
    stop_by_pid
    stop_by_port
    stop_npm_processes
    
    # Log the shutdown
    log_shutdown
    
    # Verify shutdown
    if verify_shutdown; then
        echo ""
        print_success "🛑 Keystroke server has been stopped safely"
        print_status "Use ${GREEN}./start.sh${NC} to start the server again"
        echo ""
        echo -e "${PURPLE}Thanks for using Keystroke! ⚡${NC}"
    else
        print_error "Failed to stop server completely"
        print_status "You may need to restart your terminal or reboot"
        exit 1
    fi
}

# Run main function
main