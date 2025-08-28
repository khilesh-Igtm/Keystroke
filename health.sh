#!/bin/bash

# Keystroke Neon Typing Test - Health Check Script
# This script checks the server health and status

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
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if port 3000 is in use
check_port() {
    print_status "Checking port 3000..."
    
    if lsof -ti:3000 > /dev/null 2>&1; then
        PID=$(lsof -ti:3000 | head -1)
        PROCESS=$(ps -p $PID -o comm= 2>/dev/null || echo "unknown")
        print_success "Port 3000 is in use by PID: $PID ($PROCESS)"
        return 0
    else
        print_error "Port 3000 is not in use"
        return 1
    fi
}

# Check server response
check_server_response() {
    print_status "Testing server response..."
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
        print_success "Server is responding (HTTP 200)"
        return 0
    else
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
        print_error "Server not responding properly (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Check response time
check_response_time() {
    print_status "Measuring response time..."
    
    if command -v curl &> /dev/null; then
        RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" http://localhost:3000 2>/dev/null || echo "0")
        
        if (( $(echo "$RESPONSE_TIME > 0" | bc -l) )); then
            if (( $(echo "$RESPONSE_TIME < 1" | bc -l) )); then
                print_success "Response time: ${RESPONSE_TIME}s (Good)"
            elif (( $(echo "$RESPONSE_TIME < 3" | bc -l) )); then
                print_warning "Response time: ${RESPONSE_TIME}s (Slow)"
            else
                print_error "Response time: ${RESPONSE_TIME}s (Very Slow)"
            fi
        else
            print_error "Could not measure response time"
        fi
    fi
}

# Check memory usage
check_memory_usage() {
    print_status "Checking memory usage..."
    
    if lsof -ti:3000 > /dev/null 2>&1; then
        PID=$(lsof -ti:3000 | head -1)
        
        if ps -p $PID > /dev/null 2>&1; then
            # Get memory usage on macOS
            if [[ "$OSTYPE" == "darwin"* ]]; then
                MEM_KB=$(ps -p $PID -o rss= 2>/dev/null || echo "0")
                MEM_MB=$((MEM_KB / 1024))
            else
                # Linux
                MEM_KB=$(ps -p $PID -o rss= 2>/dev/null || echo "0")
                MEM_MB=$((MEM_KB / 1024))
            fi
            
            if [ $MEM_MB -lt 100 ]; then
                print_success "Memory usage: ${MEM_MB}MB (Low)"
            elif [ $MEM_MB -lt 500 ]; then
                print_warning "Memory usage: ${MEM_MB}MB (Moderate)"
            else
                print_error "Memory usage: ${MEM_MB}MB (High)"
            fi
        fi
    fi
}

# Check CPU usage
check_cpu_usage() {
    print_status "Checking CPU usage..."
    
    if lsof -ti:3000 > /dev/null 2>&1; then
        PID=$(lsof -ti:3000 | head -1)
        
        if ps -p $PID > /dev/null 2>&1; then
            # Get CPU usage
            CPU_USAGE=$(ps -p $PID -o %cpu= 2>/dev/null | awk '{print $1}' || echo "0")
            
            if (( $(echo "$CPU_USAGE < 10" | bc -l 2>/dev/null || echo "1") )); then
                print_success "CPU usage: ${CPU_USAGE}% (Low)"
            elif (( $(echo "$CPU_USAGE < 50" | bc -l 2>/dev/null || echo "0") )); then
                print_warning "CPU usage: ${CPU_USAGE}% (Moderate)"
            else
                print_error "CPU usage: ${CPU_USAGE}% (High)"
            fi
        fi
    fi
}

# Check log files
check_logs() {
    print_status "Checking log files..."
    
    if [ -d "logs" ]; then
        if [ -f "logs/app.log" ]; then
            LOG_SIZE=$(wc -l < logs/app.log 2>/dev/null || echo "0")
            print_success "App log: $LOG_SIZE lines"
            
            # Check for recent errors
            if [ -f "logs/error.log" ] && [ -s "logs/error.log" ]; then
                ERROR_COUNT=$(wc -l < logs/error.log 2>/dev/null || echo "0")
                if [ $ERROR_COUNT -gt 0 ]; then
                    print_warning "Error log: $ERROR_COUNT entries"
                else
                    print_success "Error log: No errors"
                fi
            else
                print_success "Error log: No errors"
            fi
        else
            print_warning "Log files not found"
        fi
    else
        print_warning "Logs directory not found"
    fi
}

# Check server uptime
check_uptime() {
    print_status "Checking server uptime..."
    
    if [ -f ".server.pid" ] && lsof -ti:3000 > /dev/null 2>&1; then
        PID=$(cat .server.pid 2>/dev/null || echo "")
        
        if [ -n "$PID" ] && ps -p $PID > /dev/null 2>&1; then
            # Calculate uptime (macOS/Linux compatible)
            if [[ "$OSTYPE" == "darwin"* ]]; then
                START_TIME=$(ps -p $PID -o lstart= 2>/dev/null | xargs -I {} date -j -f "%a %b %d %H:%M:%S %Y" "{}" "+%s" 2>/dev/null || echo "0")
            else
                START_TIME=$(ps -p $PID -o lstart= 2>/dev/null | xargs -I {} date -d "{}" "+%s" 2>/dev/null || echo "0")
            fi
            
            if [ "$START_TIME" != "0" ]; then
                CURRENT_TIME=$(date +%s)
                UPTIME=$((CURRENT_TIME - START_TIME))
                UPTIME_HOURS=$((UPTIME / 3600))
                UPTIME_MINUTES=$(((UPTIME % 3600) / 60))
                print_success "Uptime: ${UPTIME_HOURS}h ${UPTIME_MINUTES}m"
            else
                print_warning "Could not determine uptime"
            fi
        fi
    fi
}

# Display server info
display_server_info() {
    echo ""
    print_status "Server Information:"
    echo "  URL: ${BLUE}http://localhost:3000${NC}"
    echo "  Environment: ${YELLOW}Development${NC}"
    echo "  Framework: ${PURPLE}React + Vite${NC}"
    echo "  Theme: ${CYAN}Neon Cyberpunk${NC}"
}

# Main health check function
main() {
    echo -e "${GREEN}"
    cat << "EOF"
    ╔═══════════════════════════════════════╗
    ║        KEYSTROKE HEALTH CHECK         ║
    ║          Server Diagnostics           ║
    ╚═══════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    OVERALL_STATUS=0
    
    # Run all checks
    check_port || OVERALL_STATUS=1
    check_server_response || OVERALL_STATUS=1
    check_response_time
    check_memory_usage
    check_cpu_usage
    check_uptime
    check_logs
    
    display_server_info
    
    echo ""
    if [ $OVERALL_STATUS -eq 0 ]; then
        print_success "🎉 Server is healthy and running optimally!"
        echo ""
        echo -e "${CYAN}Quick Actions:${NC}"
        echo "  • Visit app: ${BLUE}open http://localhost:3000${NC}"
        echo "  • View logs: ${YELLOW}tail -f logs/app.log${NC}"
        echo "  • Stop server: ${RED}./stop.sh${NC}"
    else
        print_error "❌ Server has issues that need attention"
        echo ""
        echo -e "${CYAN}Troubleshooting:${NC}"
        echo "  • Restart server: ${YELLOW}./stop.sh && ./start.sh${NC}"
        echo "  • Check logs: ${YELLOW}cat logs/app.log${NC}"
        echo "  • Re-setup: ${BLUE}./setup.sh${NC}"
        exit 1
    fi
}

# Run main function
main