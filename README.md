# 🌌 STELLA - The Accessible Solar System Explorer

> **Tagline:** "The Universe, Pocket-Sized"

## Project Overview

**STELLA** is a fully accessible, mobile-first platform designed to solve the exclusion problem in astronomy education. The app is built with accessibility as a core principle, ensuring users with motor impairments, low vision, or no prior scientific knowledge can explore the solar system with ease.

## Key Features

### 🌍 Interactive Planet Exploration
- **3D Planet Models:** Rotating 3D representations of all planets in our solar system
- **Planet Carousel:** Navigate through planets with accessible left/right controls
- **Detailed Information:** Comprehensive stats, descriptions, and facts for each planet

### 🚀 Galaxy View (3D Star Map)
- **Interactive 3D Solar System:** Full WebGL canvas showing orbital rings and planets
- **Accessible Controls:** Zoom (+/-) and rotation buttons for users with motor impairments
- **Screen Reader Support:** ARIA-live announcements for all interactions

### 📰 Space News Feed
- **Latest Articles:** Curated space news and discoveries
- **Bookmarking:** Save articles for later reading
- **Clean Card Layout:** Easy-to-read article cards with images

### 🔍 Search & Discovery
- **Planet Search:** Quick search through all planets
- **Filtered Results:** Real-time filtering as you type
- **Quick Navigation:** Direct access to planet details

### 👤 User Profile
- **Settings Management:** Customize app preferences
- **Theme Toggle:** Switch between Light and Dark modes
- **Account Management:** Password changes and logout

### ♿ Accessibility Features
- **POUR Principles:** Perceivable, Operable, Understandable, Robust
- **High Contrast:** Dark and Light modes for optimal readability
- **No Mandatory Gestures:** All actions available via buttons
- **Screen Reader Support:** Full accessibility labels and announcements
- **Thumb Zone Design:** Primary controls placed for one-handed use

## Technical Stack

### Frontend
- **Framework:** React Native (Expo ~51.0.0)
- **3D Engine:** React Three Fiber (@react-three/fiber)
- **3D Helpers:** @react-three/drei
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **Styling:** StyleSheet with Theme Context
- **Icons:** @expo/vector-icons

### Backend
- **Status:** Mock data (no backend implementation required)
- **Future:** Ready for Firebase integration (Authentication & User Data)

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator / Physical device with Expo Go app

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
# or
expo start
```

### 3. Run on Device/Emulator
- **iOS:** Press `i` in the terminal or scan QR code with Expo Go
- **Android:** Press `a` in the terminal or scan QR code with Expo Go
- **Web:** Press `w` in the terminal (limited 3D support)

## Project Structure

```
Stella/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── src/
│   ├── context/
│   │   └── ThemeContext.js    # Light/Dark theme management
│   ├── navigation/
│   │   └── RootNavigator.js    # Navigation setup
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignUpScreen.js
│   │   ├── HomeScreen.js
│   │   ├── PlanetDetailsScreen.js
│   │   ├── GalaxyScreen.js
│   │   ├── NewsScreen.js
│   │   ├── SearchScreen.js
│   │   └── ProfileScreen.js
│   ├── components/
│   │   ├── Planet3DView.js
│   │   ├── PlanetMesh.js
│   │   └── GalaxyScene.js
│   └── data/
│       ├── planets.js    # Planet data
│       └── news.js       # News articles
└── assets/               # Images and static assets
```

## Screen Flow

1. **Splash Screen** → Theme toggle, "Start Exploring" button
2. **Login/Sign Up** → Authentication (mock)
3. **Home** → Planet carousel with 3D models
4. **Planet Details** → Comprehensive planet information
5. **Galaxy** → Interactive 3D solar system view
6. **News** → Space news feed
7. **Search** → Planet search and discovery
8. **Profile** → User settings and account management

## Accessibility Implementation

### Perceivable
- High contrast color schemes (Dark/Light modes)
- Large, legible text throughout
- Clear visual hierarchy

### Operable
- All controls in thumb zone (bottom of screen)
- No mandatory gestures (pinch-to-zoom, complex swipes)
- Explicit buttons for all actions
- Large touch targets (44x44 minimum)

### Understandable
- Layered information (Basic → Intermediate → Advanced)
- Clear navigation structure
- Consistent UI patterns

### Robust
- Screen reader support (accessibility labels)
- ARIA-live announcements for dynamic content
- Keyboard navigation support (web)

## Development Notes

- **Mock Authentication:** Login/Sign Up currently use mock authentication. Replace with Firebase Auth for production.
- **3D Assets:** Planet textures are commented out. Add actual texture files to `assets/planets/` when available.
- **News Images:** News article images are placeholders. Add actual images to `assets/news/` when available.

## Future Enhancements

- [ ] Firebase Authentication integration
- [ ] Real planet texture maps
- [ ] News article images
- [ ] Bookmark functionality
- [ ] Settings screen implementation
- [ ] Password change flow
- [ ] Offline mode support
- [ ] Advanced 3D interactions

## License

This project is built for educational purposes as part of the HCI & Computer Graphics course.

---

**Built with ❤️ for accessible space exploration**
