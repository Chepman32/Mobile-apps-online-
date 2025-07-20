# FitBuddy - Social Fitness Tracking App

A comprehensive React Native fitness app that gamifies workouts by competing with friends in real-time challenges. Built with modern mobile development practices and a focus on user engagement.

## 🏃‍♂️ Features

### Core Functionality
- **Real-time Workout Tracking**: Track workouts with live metrics (calories, distance, heart rate, pace)
- **Social Challenges**: Create and join fitness challenges with friends
- **Leaderboards**: Compete on various metrics (calories, distance, streak, workouts)
- **Achievement System**: Unlock badges and level up through consistent workouts
- **User Profiles**: Comprehensive profiles with stats, badges, and progress tracking

### Social Features
- **Friend Challenges**: Invite friends to compete in fitness challenges
- **Real-time Updates**: Live leaderboard updates and challenge progress
- **Social Sharing**: Share achievements and workout results
- **Community Features**: View and interact with other users' profiles

### Gamification
- **Badge System**: Unlock badges for milestones and achievements
- **Level System**: Gain experience and level up through workouts
- **Streak Tracking**: Maintain daily workout streaks
- **Progress Visualization**: Beautiful charts and progress indicators

### Technical Features
- **Firebase Integration**: Real-time database, authentication, and cloud functions
- **Offline Support**: Cache data for offline functionality
- **Push Notifications**: Reminders and challenge updates
- **Haptic Feedback**: Enhanced user experience with tactile feedback
- **Responsive Design**: Optimized for various screen sizes

## 🛠 Tech Stack

### Frontend
- **React Native** (Expo) - Cross-platform mobile development
- **Redux Toolkit** - State management
- **React Navigation** - Navigation and routing
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **React Native Vector Icons** - Icon library
- **React Native Reanimated** - Smooth animations

### Backend & Services
- **Firebase Authentication** - User authentication
- **Firestore** - Real-time database
- **Firebase Functions** - Serverless backend functions
- **Firebase Storage** - File storage for images and media

### UI/UX Libraries
- **React Native Paper** - Material Design components
- **React Native Elements** - UI component library
- **Lottie React Native** - Animation library
- **React Native Chart Kit** - Data visualization

### Development Tools
- **Expo CLI** - Development and build tools
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📱 Screens & Navigation

### Authentication Flow
- **Auth Screen**: Sign in/Sign up with email and social options
- **Form Validation**: Real-time validation and error handling

### Main App Tabs
1. **Home**: Dashboard with stats, quick actions, and recent activity
2. **Challenges**: Create and join fitness challenges
3. **Workout**: Start and track workout sessions
4. **Leaderboard**: View rankings and compete with friends
5. **Profile**: User profile, badges, and settings

### Key Components
- **WorkoutTimer**: Real-time workout tracking with haptic feedback
- **ChallengeCard**: Interactive challenge display with progress
- **BadgeCard**: Animated badge system with rarity levels
- **LeaderboardItem**: User ranking display with stats

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FitBuddy
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Update `src/config/firebase.js` with your Firebase config

4. **Start the development server**
```bash
npm start
# or
expo start
```

5. **Run on device/simulator**
```bash
# iOS
npm run ios

# Android
npm run android
```

## 📊 Data Models

### User Model
```javascript
{
  id: string,
  name: string,
  email: string,
  avatar: string,
  badges: string[],
  totalWorkouts: number,
  totalCalories: number,
  totalDistance: number,
  totalTime: number,
  currentStreak: number,
  bestStreak: number,
  level: number,
  experience: number,
  createdAt: timestamp
}
```

### Challenge Model
```javascript
{
  id: string,
  title: string,
  description: string,
  goal: string,
  type: string,
  duration: number,
  participants: array,
  status: string,
  leaderboard: array,
  createdAt: timestamp,
  startDate: timestamp,
  endDate: timestamp
}
```

### Workout Model
```javascript
{
  id: string,
  userId: string,
  type: string,
  duration: number,
  goal: string,
  status: string,
  startTime: timestamp,
  endTime: timestamp,
  currentTime: number,
  calories: number,
  distance: number,
  heartRate: array,
  steps: number,
  pace: number,
  achievements: array
}
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Modern gradient themes (#667eea to #764ba2)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth
- **Animations**: Smooth transitions and micro-interactions

### Accessibility
- **Haptic Feedback**: Tactile responses for important actions
- **Color Contrast**: High contrast ratios for readability
- **Touch Targets**: Minimum 44px touch targets
- **Screen Reader**: Proper accessibility labels

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Firebase Setup
1. Enable Authentication methods (Email/Password, Google, Apple)
2. Set up Firestore database with security rules
3. Configure Storage for user avatars and media
4. Set up Firebase Functions for backend logic

## 📱 Platform Support

### iOS
- Minimum iOS version: 12.0
- Optimized for iPhone and iPad
- Supports iOS-specific features (Haptic Feedback, etc.)

### Android
- Minimum Android version: 6.0 (API level 23)
- Material Design components
- Android-specific optimizations

## 🚀 Deployment

### Expo Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production version
3. Submit to App Store Connect/Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- Firebase for backend services
- React Native community for libraries and support
- Material Design for design inspiration

## 📞 Support

For support, email support@fitbuddy.app or create an issue in the repository.

---

**FitBuddy** - Your social fitness companion 🏃‍♂️💪
