# Navigate to project directory
cd "C:\Users\HP\Downloads\waste collection app\SwachhNetraExpo"

# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Fresh install
npm install

# Install specific Expo packages
npx expo install expo-status-bar
npx expo install react-native-screens react-native-safe-area-context

# Restart TypeScript server (run this in VS Code)
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
