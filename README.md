# Keystroke - Modern Typing Speed Test

A beautiful, modern typing speed test application built with React, TypeScript, and Tailwind CSS. Test your typing speed with a clean, responsive interface and real-time statistics.

![Keystroke Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Keystroke+Typing+Test)

## ✨ Features

### Core Functionality
- **Real-time WPM Calculation** - See your words-per-minute as you type
- **Accuracy Tracking** - Monitor your typing accuracy in real-time
- **Multiple Test Durations** - Choose from 15 seconds to 5 minutes
- **Difficulty Levels** - Easy, Medium, and Hard word sets
- **Word Count Options** - Test with 50 to 500 words

### User Experience
- **Modern UI/UX** - Clean, minimalist design that focuses on the typing experience
- **Dark/Light Mode** - Toggle between themes for comfortable typing
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Subtle animations enhance the user experience
- **Real-time Feedback** - Visual feedback for correct/incorrect characters

### Advanced Features
- **Detailed Statistics** - Comprehensive results with breakdowns
- **Performance Ratings** - Get rated on your speed and accuracy
- **Share Results** - Share your achievements on social media
- **Download Data** - Export your results as JSON
- **Progress Tracking** - Visual progress bars and indicators

### Technical Features
- **TypeScript** - Fully typed for better development experience
- **Modern React** - Uses React 18 with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Responsive** - Mobile-first design approach

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Keystroke
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start typing to begin your test!

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 How to Use

1. **Configure Your Test**
   - Choose test duration (15s - 5min)
   - Select difficulty level (Easy/Medium/Hard)
   - Pick word count (50-500 words)

2. **Take the Test**
   - Click in the input field to start
   - Type the words shown above
   - Press Space to move to the next word
   - Watch your stats update in real-time

3. **View Results**
   - See your WPM and accuracy scores
   - Get performance ratings
   - View detailed character statistics
   - Share or download your results

## 📊 Scoring System

### Words Per Minute (WPM)
- **70+ WPM** - Excellent (Professional level)
- **50-69 WPM** - Good (Above average)
- **30-49 WPM** - Average (Typical for most people)
- **<30 WPM** - Needs Practice

### Accuracy
- **95%+** - Perfect
- **85-94%** - Great
- **75-84%** - Good  
- **<75%** - Needs Work

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (monospace)

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#3B82F6 to #2563EB)
- **Accent**: Purple (#7C3AED)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Typography
- **Primary Font**: JetBrains Mono (monospace)
- **Fallbacks**: Fira Code, Monaco, Consolas, monospace

### Themes
- **Light Mode**: Clean whites and light grays
- **Dark Mode**: Rich dark grays with proper contrast

## 📱 Responsive Design

- **Mobile**: Optimized for touch typing on phones
- **Tablet**: Comfortable typing experience on tablets
- **Desktop**: Full-featured experience with all statistics

## 🔧 Configuration

### Word Lists
The app includes three difficulty levels:

- **Easy**: Common 2-5 character words (100 words)
- **Medium**: Mix of common and intermediate words (200+ words)  
- **Hard**: Complex 8+ character words (300+ words)

### Customization
You can easily customize:
- Word lists in `src/utils/wordGenerator.ts`
- Themes in `tailwind.config.js`
- Test durations in `src/App.tsx`
- Colors and styling in `src/index.css`

## 🚀 Performance

- **Fast Loading**: Optimized bundle size with Vite
- **Smooth Animations**: 60fps animations with CSS transitions
- **Real-time Updates**: Efficient state management for live stats
- **Memory Efficient**: Clean component structure with proper cleanup

## 🌟 Advantages Over 10FastFingers

### Better User Experience
- **Modern Design**: Clean, minimalist interface vs cluttered layout
- **Responsive**: Works on all devices vs desktop-focused
- **Dark Mode**: Built-in theme switching vs light-only
- **Smooth Animations**: Polished feel vs static interface

### Enhanced Features  
- **Real-time Stats**: Live WPM/accuracy vs end-only results
- **Better Feedback**: Character-level highlighting vs word-only
- **Multiple Difficulties**: Structured word lists vs random selection
- **Detailed Results**: Comprehensive breakdown vs basic stats

### Technical Improvements
- **Modern Stack**: React/TypeScript vs older technologies
- **Fast Performance**: Vite build system vs slower alternatives
- **Mobile Optimized**: Touch-friendly vs desktop-only
- **Accessible**: ARIA labels and keyboard navigation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Typing!** 🎯✨