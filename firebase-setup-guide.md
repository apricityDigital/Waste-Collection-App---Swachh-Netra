# Firebase Setup Guide for Swachh Netra

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project "swachh-netra" or similar
4. Enable Google Analytics (optional)

## Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider

## Step 3: Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location

## Step 4: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add web app
4. Register app with name "swachh-netra-app"
5. Copy the firebaseConfig object

## Step 5: Update App Configuration
Replace the firebaseConfig in `App.tsx` with your actual values:

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

## Step 6: Create User Accounts
1. In Firebase Console, go to "Authentication" > "Users"
2. Click "Add user"
3. Create accounts for different roles:
   - admin@swachh.com
   - driver@swachh.com
   - hr@swachh.com
   - contractor@swachh.com
   - quality@swachh.com

## Step 7: Set User Roles in Firestore
1. Go to "Firestore Database"
2. Create collection "users"
3. For each user, create document with their UID as document ID
4. Add field "role" with values:
   - "admin"
   - "driver"
   - "swachh-hr"
   - "transport-contractor"
   - "quality-check"

## Example Firestore Structure:
\`\`\`
users/
  ├── {user-uid-1}/
  │   └── role: "admin"
  ├── {user-uid-2}/
  │   └── role: "driver"
  └── {user-uid-3}/
      └── role: "swachh-hr"
\`\`\`

## Testing
1. Run the app
2. Use Firebase Connection Test to verify setup
3. Login with created accounts
4. Verify role-based navigation works
