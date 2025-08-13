"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"

import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

// Import all navigators
import DriverNavigator from "./src/navigation/DriverNavigator"
import AdminNavigator from "./src/navigation/AdminNavigator"
import SwachhHRNavigator from "./src/navigation/SwachhHRNavigator"
import TransportContractorNavigator from "./src/navigation/TransportContractorNavigator"
import QualityCheckNavigator from "./src/navigation/QualityCheckNavigator"

import LoadingScreen from "./src/screens/LoadingScreen"
import LoginScreen from "./src/screens/LoginScreen"

const firebaseConfig = {
  apiKey: "AIzaSyDITEkMNEoxReuV1mKUSdX9yXQdAjVyNfo",
  authDomain: "swachh-netra-waste-collection.firebaseapp.com",
  projectId: "swachh-netra-waste-collection",
  storageBucket: "swachh-netra-waste-collection.firebasestorage.app",
  messagingSenderId: "217847571486",
  appId: "1:217847571486:web:bea5903b30877c9e1cba0f",
  measurementId: "G-C299LH6MTC"
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  console.log("✅ Firebase initialized successfully")
} catch (error) {
  console.error("❌ Firebase initialization failed:", error)
  auth = undefined
  db = undefined
}

export { auth, db }

const Stack = createStackNavigator()

function getRoleNavigator(role: string) {
  console.log(`🔄 Getting navigator for role: ${role}`)
  switch (role) {
    case "admin":
      console.log("📱 Loading Admin Navigator")
      return AdminNavigator
    case "driver":
      console.log("📱 Loading Driver Navigator")
      return DriverNavigator
    case "swachh-hr":
      console.log("📱 Loading Swachh HR Navigator")
      return SwachhHRNavigator
    case "transport-contractor":
      console.log("📱 Loading Transport Contractor Navigator")
      return TransportContractorNavigator
    case "quality-check":
      console.log("📱 Loading Quality Check Navigator")
      return QualityCheckNavigator
    default:
      console.warn(`❌ Unknown role: ${role}, defaulting to driver`)
      return DriverNavigator
  }
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string>("driver")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔄 Auth state changed:", user ? "logged in" : "logged out")
      setCurrentUser(user)
      setLoading(false)

      if (user) {
        // User is signed in, maintain their session
        console.log("✅ User authenticated:", user.email)
        // Note: Role will be set through login screen selection
      } else {
        // User is signed out
        setIsLoggedIn(false)
        setUserRole("driver")
      }
    })

    return unsubscribe
  }, [])

  const handleRoleLogin = (selectedRole: string, user?: any) => {
    console.log(`✅ User logged in with role: ${selectedRole}`)
    setUserRole(selectedRole)
    setIsLoggedIn(true)
    if (user) {
      setCurrentUser(user)
    }
  }

  const handleLogout = () => {
    console.log("🚪 User logged out")
    setIsLoggedIn(false)
    setUserRole("driver")
    setCurrentUser(null)
    if (auth) {
      auth.signOut()
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!isLoggedIn) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <LoginScreen onRoleLogin={handleRoleLogin} />
        </NavigationContainer>
      </PaperProvider>
    )
  }

  const RoleNavigator = getRoleNavigator(userRole)

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RoleNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}
