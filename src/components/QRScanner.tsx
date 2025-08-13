"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Text, Button, Card } from "react-native-paper"
import * as Location from "expo-location"

interface QRScannerProps {
  onScanComplete: (data: string, location: Location.LocationObject) => void
  onCancel: () => void
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanComplete, onCancel }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)

  useEffect(() => {
    getPermissions()
  }, [])

  const getPermissions = async () => {
    // Camera permission
    const { status: cameraStatus } = await BarCodeScanner.requestPermissionsAsync()

    // Location permission
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync()

    if (cameraStatus === "granted" && locationStatus === "granted") {
      setHasPermission(true)
      getCurrentLocation()
    } else {
      setHasPermission(false)
      Alert.alert("Permission denied", "Camera and location permissions are required")
    }
  }

  const getCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
    } catch (error) {
      Alert.alert("Error", "Failed to get current location")
    }
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true)
    if (location) {
      onScanComplete(data, location)
    } else {
      Alert.alert("Error", "Location not available")
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions...</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text variant="titleMedium">No access to camera or location</Text>
            <Text variant="bodyMedium" style={styles.errorText}>
              Please grant camera and location permissions to scan QR codes
            </Text>
            <Button mode="contained" onPress={onCancel} style={styles.button}>
              Go Back
            </Button>
          </Card.Content>
        </Card>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text variant="titleMedium" style={styles.instructionText}>
          Point camera at QR code
        </Text>
        {location && (
          <Text variant="bodySmall" style={styles.locationText}>
            Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {scanned && (
          <Button mode="contained" onPress={() => setScanned(false)} style={styles.button}>
            Tap to Scan Again
          </Button>
        )}
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  instructionText: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  locationText: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
  button: {
    marginVertical: 5,
  },
  errorCard: {
    margin: 20,
  },
  errorText: {
    marginVertical: 10,
    textAlign: "center",
  },
})

export default QRScanner
