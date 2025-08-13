# Firebase Setup Instructions

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project "swachh-netra"
4. Enable Google Analytics (optional)

## Step 2: Add Web App
1. Click the web icon (</>) in your project overview
2. Register your app with name "Swachh Netra"
3. Copy the Firebase configuration object

## Step 3: Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add test users:
   - admin@swachh.com (password: admin123)
   - driver@swachh.com (password: driver123)
   - hr@swachh.com (password: hr123)

## Step 4: Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in test mode
4. Choose your preferred location

## Step 5: Update Configuration
Replace the firebaseConfig object in App.tsx with your actual configuration:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
\`\`\`

## Step 6: Test Connection
1. Run `npx expo start`
2. Try logging in with the test credentials
3. Check Firebase Console for authentication logs
