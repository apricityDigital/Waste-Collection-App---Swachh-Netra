# 🔥 Firebase Setup Instructions for Swachh Netra

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name: "swachh-netra" (or your preferred name)
4. Enable Google Analytics (optional)

## Step 2: Enable Services
### Authentication
1. Go to Authentication → Get started
2. Sign-in method → Enable "Email/Password"

### Firestore Database
1. Go to Firestore Database → Create database
2. Start in "test mode" for development
3. Choose your region

## Step 3: Get Configuration
1. Project Settings (⚙️ icon)
2. Your apps → Add app → Web (</>) 
3. App nickname: "swachh-netra-app"
4. Copy the firebaseConfig object

## Step 4: Update App.tsx
Replace the firebaseConfig in App.tsx with your actual values:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
\`\`\`

## Step 5: Create Test Users
In Firebase Console → Authentication → Users:
- admin@swachh.com (password: admin123)
- driver@swachh.com (password: driver123)
- hr@swachh.com (password: hr123)

## Step 6: Initialize Collections
The app will automatically create these Firestore collections:
- `users` - User profiles and roles
- `drivers` - Driver information
- `driver_attendance` - Driver punch in/out records
- `driver_trips` - Trip tracking data
- `assignments` - Pickup assignments
- `vehicles` - Vehicle information
- `feeder_points` - Collection points
- `workers` - Worker information
- `worker_attendance` - Worker attendance records

## Step 7: Test Connection
1. Run the app: `npx expo start`
2. Login as driver with role selection
3. Check Firebase Connection Test in driver dashboard
4. Verify data is being stored in Firestore

## 🚀 You're Ready!
Your Swachh Netra app is now fully connected to Firebase with real-time data synchronization.
