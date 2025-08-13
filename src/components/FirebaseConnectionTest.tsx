"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text, Button, ActivityIndicator } from "react-native-paper"
import { auth, db } from "../../App"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

const FirebaseConnectionTest = () => {
  const [authStatus, setAuthStatus] = useState<"testing" | "connected" | "failed">("testing")
  const [dbStatus, setDbStatus] = useState<"testing" | "connected" | "failed">("testing")
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testFirebaseConnection = async () => {
    setAuthStatus("testing")
    setDbStatus("testing")
    setTestResults([])

    // Test Firebase Auth
    try {
      addResult("Testing Firebase Auth connection...")

      if (!auth) {
        throw new Error("Firebase Auth not initialized")
      }

      if (!db) {
        throw new Error("Firestore Database not initialized")
      }

      // Try to create a test user
      const testEmail = "test@swachh.com"
      const testPassword = "test123"

      try {
        await createUserWithEmailAndPassword(auth, testEmail, testPassword)
        addResult("✅ Test user created successfully")
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          addResult("✅ Auth connected (test user already exists)")
        } else {
          throw error
        }
      }

      await signInWithEmailAndPassword(auth, testEmail, testPassword)
      addResult("✅ Firebase Auth login successful")
      setAuthStatus("connected")
    } catch (error: any) {
      addResult(`❌ Firebase Auth failed: ${error.message}`)
      setAuthStatus("failed")
    }

    // Test Firestore Database
    try {
      addResult("Testing Firestore Database connection...")

      if (!db) {
        throw new Error("Firestore Database not initialized")
      }

      const testDoc = doc(db, "test", "connection-test")
      await setDoc(testDoc, {
        message: "Firebase connection test",
        timestamp: new Date(),
        status: "connected",
      })
      addResult("✅ Firestore write successful")

      const docSnap = await getDoc(testDoc)
      if (docSnap.exists()) {
        addResult("✅ Firestore read successful")
        addResult(`📄 Test data: ${JSON.stringify(docSnap.data())}`)
        setDbStatus("connected")
      } else {
        throw new Error("Document not found after write")
      }
    } catch (error: any) {
      addResult(`❌ Firestore failed: ${error.message}`)
      setDbStatus("failed")
    }
  }

  useEffect(() => {
    testFirebaseConnection()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "#4caf50"
      case "failed":
        return "#f44336"
      default:
        return "#ff9800"
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Firebase Connection Test
          </Text>

          <View style={styles.statusRow}>
            <Text variant="bodyMedium">Firebase Auth: </Text>
            {authStatus === "testing" ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.status, { color: getStatusColor(authStatus) }]}>{authStatus.toUpperCase()}</Text>
            )}
          </View>

          <View style={styles.statusRow}>
            <Text variant="bodyMedium">Firestore DB: </Text>
            {dbStatus === "testing" ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.status, { color: getStatusColor(dbStatus) }]}>{dbStatus.toUpperCase()}</Text>
            )}
          </View>

          <Button mode="outlined" onPress={testFirebaseConnection} style={styles.retestButton}>
            Retest Connection
          </Button>

          <Card style={styles.logCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.logTitle}>
                Test Results:
              </Text>
              {testResults.map((result, index) => (
                <Text key={index} variant="bodySmall" style={styles.logText}>
                  {result}
                </Text>
              ))}
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#1976d2",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  status: {
    fontWeight: "bold",
  },
  retestButton: {
    marginVertical: 16,
  },
  logCard: {
    backgroundColor: "#f5f5f5",
    maxHeight: 200,
  },
  logTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  logText: {
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 2,
  },
})

export default FirebaseConnectionTest
