# FitBuddy - Social Fitness Tracking App

A fun, social fitness tracking app that gamifies workouts by competing with friends in real-time challenges. Built with React Native and Expo.

## 🏃‍♂️ Features

### Core Features
- **Real-time Workout Tracking**: Track your workouts with live metrics including calories, distance, heart rate, and pace
- **Social Challenges**: Join and create fitness challenges with friends
- **Leaderboards**: Compete on global and friend leaderboards
- **Achievement System**: Unlock badges and level up as you progress
- **Friend System**: Connect with friends and see their progress
- **Beautiful UI**: Modern, gradient-based design with smooth animations

### Key Screens
- **Home Dashboard**: Overview of stats, active challenges, and quick actions
- **Workout Tracker**: Real-time workout session with timer and metrics
- **Challenges**: Browse and join fitness challenges
- **Leaderboard**: Global and friend rankings
- **Profile**: Personal stats, badges, and achievements

## 🛠️ Technical Stack

### Frontend
- **React Native** with Expo
- **React Navigation** for navigation
- **Redux Toolkit** for state management
- **Expo Linear Gradient** for beautiful gradients
- **React Native Reanimated** for smooth animations
- **Expo Haptics** for tactile feedback

### State Management
- **User Slice**: User profile, authentication, achievements
- **Challenge Slice**: Challenge management and real-time updates
- **Workout Slice**: Workout tracking and session management

### UI Components
- **WorkoutCard**: Beautiful workout display cards
- **ChallengeCard**: Challenge cards with progress tracking
- **StatsCard**: Reusable statistics display
- **Custom Navigation**: Bottom tab navigation with icons

## 📱 Screenshots

### Home Dashboard
- User profile with level and XP
- Quick action buttons for starting workouts
- Weekly progress tracking
- Stats overview with beautiful cards
- Active challenges display
- Recent workouts carousel

### Workout Tracker
- Real-time timer with animations
- Live metrics (calories, distance, heart rate, pace)
- Progress bar visualization
- Start/Pause/Resume/End controls
- Beautiful gradient backgrounds

### Challenges
- Available challenges to join
- Active user challenges
- Challenge statistics
- Detailed challenge modals
- Progress tracking

### Leaderboard
- Global and friend rankings
- Current user highlighting
- Challenge-specific leaderboards
- Time-based filtering
- Share ranking functionality

### Profile
- User stats overview
- Badge collection
- Achievement history
- Friend list
- Recent workouts

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FitBuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📦 Dependencies

### Core Dependencies
```json
{
  "expo": "~48.0.18",
  "react": "^18.2.0",
  "react-native": "^0.71.8",
  "@react-navigation/native": "^6.1.6",
  "@react-navigation/bottom-tabs": "^6.5.7",
  "@react-navigation/stack": "^6.3.16",
  "react-redux": "^8.0.5",
  "@reduxjs/toolkit": "^1.9.5"
}
```

### UI & Animation Dependencies
```json
{
  "react-native-gesture-handler": "^2.9.0",
  "react-native-reanimated": "^2.14.4",
  "lottie-react-native": "^5.1.4",
  "react-native-svg": "^13.4.0",
  "expo-linear-gradient": "~12.1.2",
  "expo-blur": "~12.2.2",
  "expo-haptics": "~12.2.1"
}
```

### Additional Dependencies
```json
{
  "expo-av": "~13.2.1",
  "expo-location": "~15.1.1",
  "expo-sensors": "~11.3.0",
  "expo-notifications": "~0.18.1",
  "react-native-vector-icons": "^9.2.0",
  "react-native-chart-kit": "^6.12.0",
  "react-native-modal": "^13.0.1"
}
```

## 🏗️ Project Structure

```
FitBuddy/
├── App.js                 # Main app component
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
└── src/
    ├── components/       # Reusable UI components
    │   ├── WorkoutCard.js
    │   ├── ChallengeCard.js
    │   └── StatsCard.js
    ├── screens/          # App screens
    │   ├── HomeScreen.js
    │   ├── WorkoutScreen.js
    │   ├── ChallengesScreen.js
    │   ├── ProfileScreen.js
    │   └── LeaderboardScreen.js
    └── store/           # Redux store and slices
        ├── index.js
        ├── userSlice.js
        ├── challengeSlice.js
        └── workoutSlice.js
```

## 🎯 Key Features Implementation

### Real-time Workout Tracking
- Timer with live updates
- Calorie burn simulation based on workout type
- Distance tracking for cardio workouts
- Heart rate simulation
- Pace calculation
- Progress animations

### Social Features
- Friend system with avatars
- Challenge creation and joining
- Real-time leaderboards
- Achievement sharing
- Social media integration

### Gamification
- XP and leveling system
- Badge collection
- Achievement unlocks
- Streak tracking
- Challenge rewards

### Beautiful UI/UX
- Gradient backgrounds
- Smooth animations
- Haptic feedback
- Modern card designs
- Responsive layouts

## 🔧 Configuration

### Environment Setup
The app uses mock data for demonstration. In a production environment, you would:

1. **Set up Firebase** for backend services
2. **Configure authentication** with Firebase Auth
3. **Set up Firestore** for real-time data
4. **Configure push notifications** with Expo Notifications
5. **Set up analytics** with Segment or similar

### API Integration
Currently uses mock data. For production:
- Replace mock API calls with real endpoints
- Implement proper error handling
- Add loading states
- Configure real-time listeners

## 🚀 Deployment

### Expo Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for platforms
eas build --platform ios
eas build --platform android
```

## 📊 Performance Optimizations

- **Lazy loading** of screens and components
- **Memoization** of expensive calculations
- **Optimized re-renders** with React.memo
- **Image optimization** with proper sizing
- **Animation performance** with Reanimated 2

## 🔒 Security Considerations

- **Input validation** on all user inputs
- **Secure storage** for sensitive data
- **API authentication** with proper tokens
- **Data encryption** for user information
- **Privacy compliance** with GDPR/CCPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Expo** for the amazing development platform
- **React Navigation** for navigation solutions
- **Redux Toolkit** for state management
- **React Native Reanimated** for smooth animations

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**FitBuddy** - Making fitness fun and social! 🏃‍♂️💪
