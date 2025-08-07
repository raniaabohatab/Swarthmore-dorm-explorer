# Firebase Setup Guide

## 🚀 Setting Up Firebase for Swarthmore Dorm Explorer

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "swarthmore-dorm-explorer")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### Step 3: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose the closest to your users)
5. Click "Done"

### Step 4: Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "swarthmore-dorm-explorer-web")
6. Copy the configuration object

### Step 5: Update Your Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Step 6: Set Up Security Rules (Optional)

In Firestore Database > Rules, you can set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 7: Test Your Setup

1. Run your development server: `npm run dev`
2. Try to sign up with a new account
3. Check if the user appears in Firebase Authentication
4. Check if the user document appears in Firestore Database

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This usually means Firebase is already initialized
   - Check if you have multiple firebase.js files

2. **"Permission denied" errors**
   - Make sure Firestore is in test mode
   - Check your security rules

3. **Authentication not working**
   - Verify Email/Password is enabled in Firebase Console
   - Check your Firebase configuration is correct

### Security Notes:

- For production, set up proper Firestore security rules
- Consider enabling additional authentication methods (Google, Facebook, etc.)
- Set up proper CORS settings if needed

## 📱 Features Added

With Firebase, your app now has:

✅ **User Authentication** (Sign up, Login, Logout)
✅ **User Profiles** with personal information
✅ **Database Storage** for user data
✅ **Real-time Updates** (can be added later)
✅ **Secure Data** with Firebase security rules

## 🎯 Next Steps

1. **Deploy to Firebase Hosting** (optional)
2. **Add more authentication methods** (Google, Facebook)
3. **Implement real-time features** with Firestore listeners
4. **Add user avatars** and profile pictures
5. **Create admin features** for managing content

Your Swarthmore Dorm Explorer is now a full-featured social platform! 🎉 