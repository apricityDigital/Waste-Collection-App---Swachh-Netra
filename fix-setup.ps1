# Navigate to the correct Expo project directory
cd "C:\Users\HP\Downloads\waste collection app\SwachhNetraExpo"

# Check if we're in the right directory
Write-Host "Current directory: $(Get-Location)"
Write-Host "Files in directory:"
Get-ChildItem

# Install dependencies properly
Write-Host "Installing dependencies..."
npm install

# Install missing Expo dependencies
Write-Host "Installing Expo dependencies..."
npx expo install expo-status-bar

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "node_modules exists"
} else {
    Write-Host "node_modules missing - installing dependencies"
    npm install
}

# Remove any CSS files (not needed in React Native)
if (Test-Path "app\globals.css") {
    Remove-Item "app\globals.css" -Force
    Write-Host "Removed globals.css"
}

if (Test-Path "globals.css") {
    Remove-Item "globals.css" -Force
    Write-Host "Removed globals.css"
}

# Start the development server
Write-Host "Starting Expo development server..."
npx expo start
