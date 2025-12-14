# STELLA - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Expo**
   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on Device**
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Project Structure

```
Stella/
├── App.js                    # Main entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── babel.config.js           # Babel config
├── src/
│   ├── context/
│   │   └── ThemeContext.js   # Theme management
│   ├── navigation/
│   │   └── RootNavigator.js  # Navigation setup
│   ├── screens/              # All app screens
│   ├── components/            # Reusable components
│   └── data/                  # Mock data
└── assets/                    # Images and static files
```

## Navigation Flow

```
Splash → Login/SignUp → MainTabs
                              ├── HomeTab
                              ├── SearchTab
                              ├── GalaxyTab
                              ├── NewsTab
                              └── ProfileTab
                          
PlanetDetails (Stack screen accessible from tabs)
```

## Mock Authentication

- **Username:** Any text
- **Password:** Any text
- Login/SignUp will accept any input and log you in

## Theme Toggle

- Available on Splash, Login, and SignUp screens
- Toggle between Light and Dark modes
- Default: Dark mode

## Known Limitations

1. **3D Rendering:** React Three Fiber works best on native devices. Web support is limited.
2. **Planet Textures:** Currently using color placeholders. Add textures to `assets/planets/` to enable.
3. **News Images:** Using placeholders. Add images to `assets/news/` to enable.
4. **Authentication:** Mock implementation. Replace with Firebase for production.

## Troubleshooting

### 3D Not Rendering
- Ensure you're running on a physical device or emulator (not web)
- Check that expo-gl is properly installed
- Verify React Three Fiber dependencies

### Navigation Issues
- Clear Expo cache: `expo start -c`
- Restart Metro bundler

### Build Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`

## Next Steps

1. Add planet texture images to `assets/planets/`
2. Add news article images to `assets/news/`
3. Integrate Firebase for authentication
4. Add bookmark functionality
5. Implement settings screen

