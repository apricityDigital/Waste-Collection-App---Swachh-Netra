"use client"

import { useState } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { TextInput, Button, Text, Card } from "react-native-paper"
import { Picker } from "@react-native-picker/picker"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../App"
import FirebaseConnectionTest from "../components/FirebaseConnectionTest"

const LoginScreen = ({ onRoleLogin }: { onRoleLogin: (role: string) => void }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("driver")
  const [loading, setLoading] = useState(false)
  const [showConnectionTest, setShowConnectionTest] = useState(false)

  const roles = [
    { label: "Driver", value: "driver" },
    { label: "Admin", value: "admin" },
    { label: "Swachh HR", value: "swachh-hr" },
    { label: "Transport Contractor", value: "transport-contractor" },
    { label: "Quality Check", value: "quality-check" },
  ]

  const handleLogin = async () => {
    if (!email || !password || !selectedRole) {
      Alert.alert("Error", "Please fill in all fields and select a role")
      return
    }

    setLoading(true)
    try {
      if (email !== "demo@swachh.com") {
        if (!auth) {
          throw new Error("Firebase authentication not initialized. Please check your Firebase configuration.")
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log("✅ Firebase login successful:", userCredential.user.email)
      } else {
        console.log("✅ Demo login successful for role:", selectedRole)
      }

      console.log(`🔄 Navigating to ${selectedRole} interface`)
      onRoleLogin(selectedRole)

      const roleName = roles.find((r) => r.value === selectedRole)?.label
      Alert.alert("Success", `Logged in as ${roleName}!\n\nYou should now see the ${roleName} interface.`)
    } catch (error: any) {
      console.error("❌ Login error:", error)

      let errorMessage = "Login failed"
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email"
          break
        case "auth/wrong-password":
          errorMessage = "Incorrect password"
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address"
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Check your internet connection."
          break
        default:
          errorMessage = error.message
      }

      Alert.alert("Login Error", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {showConnectionTest && <FirebaseConnectionTest />}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Swachh Netra
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Waste Management System
          </Text>

          <Button mode="text" onPress={() => setShowConnectionTest(!showConnectionTest)} style={styles.testButton}>
            {showConnectionTest ? "Hide" : "Show"} Firebase Connection Test
          </Button>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="demo@swachh.com (or your email)"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            placeholder="demo123 (or your password)"
          />

          <Card style={styles.roleCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.roleTitle}>
                Select Role:
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRole}
                  onValueChange={(itemValue) => {
                    setSelectedRole(itemValue)
                    console.log(`🔄 Role selected: ${itemValue}`)
                  }}
                  style={styles.picker}
                >
                  {roles.map((role) => (
                    <Picker.Item key={role.value} label={role.label} value={role.value} />
                  ))}
                </Picker>
              </View>
            </Card.Content>
          </Card>

          <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
            Login as {roles.find((r) => r.value === selectedRole)?.label}
          </Button>

          <Text variant="bodySmall" style={styles.helpText}>
            Select your role and login to access the appropriate interface.{"\n"}
            Use demo@swachh.com / demo123 for testing.
          </Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e3f2fd",
  },
  card: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#1976d2",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
    color: "#666",
  },
  roleCard: {
    backgroundColor: "#f3e5f5",
    marginBottom: 16,
  },
  roleTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#7b1fa2",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  testButton: {
    marginBottom: 8,
  },
  helpText: {
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
})

export default LoginScreen
