#!/bin/bash

# Keystroke Neon Typing Test - Setup Script
# This script sets up the development environment

set -e  # Exit on any error

echo "🚀 KEYSTROKE NEON TYPING TEST - SETUP INITIATED"
echo "================================================"

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

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 16 or higher
        NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | cut -d'v' -f2)
        if [ "$NODE_MAJOR" -lt 16 ]; then
            print_warning "Node.js version 16 or higher is recommended. Current: $NODE_VERSION"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 16+ and try again."
        echo "Download from: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully!"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Create logs directory
create_logs_dir() {
    print_status "Creating logs directory..."
    mkdir -p logs
    touch logs/app.log
    touch logs/error.log
    touch logs/access.log
    print_success "Logs directory created!"
}

# Make shell scripts executable
make_scripts_executable() {
    print_status "Making shell scripts executable..."
    chmod +x *.sh
    print_success "Shell scripts are now executable!"
}

# Create environment file if it doesn't exist
create_env_file() {
    print_status "Setting up environment configuration..."
    if [ ! -f .env ]; then
        cat > .env << EOF
# Keystroke Environment Configuration
NODE_ENV=development
VITE_APP_NAME=Keystroke
VITE_APP_VERSION=1.0.0
VITE_PORT=3000
VITE_LOG_LEVEL=info
EOF
        print_success "Environment file created!"
    else
        print_warning "Environment file already exists, skipping..."
    fi
}

# Main setup function
main() {
    echo -e "${PURPLE}"
    cat << "EOF"
    ██╗  ██╗███████╗██╗   ██╗███████╗████████╗██████╗  ██████╗ ██╗  ██╗███████╗
    ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝
    █████╔╝ █████╗   ╚████╔╝ ███████╗   ██║   ██████╔╝██║   ██║█████╔╝ █████╗  
    ██╔═██╗ ██╔══╝    ╚██╔╝  ╚════██║   ██║   ██╔══██╗██║   ██║██╔═██╗ ██╔══╝  
    ██║  ██╗███████╗   ██║   ███████║   ██║   ██║  ██║╚██████╔╝██║  ██╗███████╗
    ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
EOF
    echo -e "${NC}"
    
    print_status "Starting setup process..."
    sleep 1
    
    check_node
    check_npm
    install_dependencies
    create_logs_dir
    create_env_file
    make_scripts_executable
    
    echo ""
    print_success "🎉 SETUP COMPLETED SUCCESSFULLY!"
    echo ""
    echo -e "${CYAN}Next steps:${NC}"
    echo "  1. Run ${GREEN}./start.sh${NC} to start the development server"
    echo "  2. Open ${BLUE}http://localhost:3000${NC} in your browser"
    echo "  3. Use ${YELLOW}./health.sh${NC} to check server status"
    echo "  4. Use ${RED}./stop.sh${NC} to stop the server"
    echo ""
    echo -e "${PURPLE}Happy coding! 🚀${NC}"
}

# Run main function
main