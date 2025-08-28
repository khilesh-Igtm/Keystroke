#!/bin/bash

# Keystroke Neon Typing Test - Start Script
# This script starts the development server with logging

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

# Create logs directory if it doesn't exist
create_logs() {
    if [ ! -d "logs" ]; then
        mkdir -p logs
        print_status "Created logs directory"
    fi
}

# Check if server is already running
check_running() {
    if lsof -ti:3000 > /dev/null 2>&1; then
        print_warning "Server is already running on port 3000"
        print_status "Current server status:"
        echo ""
        ./health.sh
        echo ""
        
        # Offer to open browser for existing server
        print_status "🎮 Want to open the neon typing test in your browser?"
        read -p "$(echo -e "${CYAN}[Y/n]${NC} ") " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
            print_status "🌐 Opening browser..."
            if command -v open >/dev/null 2>&1; then
                open http://localhost:3000
                print_success "✨ Browser opened! Ready to type in neon style!"
            else
                print_warning "Could not auto-open browser. Please visit http://localhost:3000 manually"
            fi
        fi
        
        echo ""
        print_status "Use ${RED}./stop.sh${NC} to stop the server or ${YELLOW}./health.sh${NC} to check status"
        exit 0
    fi
}

# Kill any existing processes on port 3000
cleanup_port() {
    print_status "Cleaning up port 3000..."
    if lsof -ti:3000 > /dev/null 2>&1; then
        print_warning "Killing existing process on port 3000"
        lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
}

# Start the development server
start_server() {
    print_status "Starting Keystroke Neon Typing Test server..."
    
    # Log startup time
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Server startup initiated" >> logs/app.log
    
    # Start the server with logging
    npm run dev 2>&1 | while read line; do
        echo "$line"
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line" >> logs/app.log
    done &
    
    # Get the process ID
    SERVER_PID=$!
    echo $SERVER_PID > .server.pid
    
    print_success "Server starting with PID: $SERVER_PID"
    
    # Wait a bit for server to start
    print_status "Waiting for server to initialize..."
    sleep 5
    
    # Check if server is responding
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "🚀 Server is running successfully!"
        echo ""
        print_status "🌐 Access your neon typing test at: ${BLUE}http://localhost:3000${NC}"
        print_status "📊 Check server status with: ${YELLOW}./health.sh${NC}"
        print_status "🛑 Stop the server with: ${RED}./stop.sh${NC}"
        
        # Auto-open browser
        print_status "🎮 Opening browser automatically..."
        if command -v open >/dev/null 2>&1; then
            open http://localhost:3000
            print_success "✨ Browser opened! Ready to type in neon style!"
        elif command -v xdg-open >/dev/null 2>&1; then
            xdg-open http://localhost:3000
            print_success "✨ Browser opened! Ready to type in neon style!"
        elif command -v start >/dev/null 2>&1; then
            start http://localhost:3000
            print_success "✨ Browser opened! Ready to type in neon style!"
        else
            print_warning "Could not auto-open browser. Please visit http://localhost:3000 manually"
        fi
        
        echo ""
        echo -e "${PURPLE}Enjoy your cyberpunk typing experience! ⚡${NC}"
    else
        print_error "Server failed to start properly"
        print_status "Check logs/app.log for details"
        exit 1
    fi
}

# Main function
main() {
    echo -e "${CYAN}"
    cat << "EOF"
    ╔═══════════════════════════════════════╗
    ║         KEYSTROKE SERVER START        ║
    ║          Neon Edition v1.0            ║
    ╚═══════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    create_logs
    check_running
    cleanup_port
    start_server
}

# Trap to handle cleanup on exit
trap 'print_warning "Server startup interrupted"' INT TERM

# Run main function
main