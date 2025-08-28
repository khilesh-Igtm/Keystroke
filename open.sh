#!/bin/bash

# Keystroke Neon Typing Test - Browser Opener Script
# This script opens the typing test in your default browser

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if server is running
check_server() {
    if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_warning "Server is not running on port 3000"
        print_status "Start the server first with: ${GREEN}./start.sh${NC}"
        exit 1
    fi
}

# Open browser
open_browser() {
    print_status "🌐 Opening Keystroke Neon Typing Test..."
    
    if command -v open >/dev/null 2>&1; then
        # macOS
        open http://localhost:3000
        print_success "✨ Browser opened successfully!"
    elif command -v xdg-open >/dev/null 2>&1; then
        # Linux
        xdg-open http://localhost:3000
        print_success "✨ Browser opened successfully!"
    elif command -v start >/dev/null 2>&1; then
        # Windows
        start http://localhost:3000
        print_success "✨ Browser opened successfully!"
    else
        print_warning "Could not auto-open browser"
        echo "Please manually visit: http://localhost:3000"
        exit 1
    fi
}

# Main function
main() {
    echo -e "${CYAN}🎮 Opening Neon Typing Test...${NC}"
    check_server
    open_browser
    echo -e "${GREEN}Ready to type at cyberpunk speed! ⚡${NC}"
}

# Run main function
main