"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Card, Text, Button, ActivityIndicator, Chip } from "react-native-paper"
import { FirebaseService } from "../services/FirebaseService"

const DatabaseViewer = () => {
  const [connectionStatus, setConnectionStatus] = useState<"testing" | "connected" | "failed">("testing")
  const [collections, setCollections] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    setTestResults([])
    addResult("🔍 Testing database connection...")

    try {
      // Test basic connection
      const isConnected = await FirebaseService.testConnection()
      if (isConnected) {
        setConnectionStatus("connected")
        addResult("✅ Database connection successful")
        await loadCollectionData()
      } else {
        setConnectionStatus("failed")
        addResult("❌ Database connection failed")
      }
    } catch (error: any) {
      setConnectionStatus("failed")
      addResult(`❌ Connection error: ${error.message}`)
    }

    setLoading(false)
  }

  const loadCollectionData = async () => {
    const collectionsData: any = {}

    try {
      addResult("📊 Loading collection data...")

      // Users collection
      try {
        const users = await FirebaseService.getUsers()
        collectionsData.users = users
        addResult(`👥 Users: ${users.length} documents`)
      } catch (error) {
        addResult("👥 Users: Collection empty or not accessible")
        collectionsData.users = []
      }

      // Assignments collection
      try {
        const assignments = await FirebaseService.getAssignments()
        collectionsData.assignments = assignments
        addResult(`📋 Assignments: ${assignments.length} documents`)
      } catch (error) {
        addResult("📋 Assignments: Collection empty or not accessible")
        collectionsData.assignments = []
      }

      // Zones collection
      try {
        const zones = await FirebaseService.getZones()
        collectionsData.zones = zones
        addResult(`🗺️ Zones: ${zones.length} documents`)
      } catch (error) {
        addResult("🗺️ Zones: Collection empty or not accessible")
        collectionsData.zones = []
      }

      setCollections(collectionsData)
      addResult("✅ Collection data loaded successfully")
    } catch (error: any) {
      addResult(`❌ Error loading collections: ${error.message}`)
    }
  }

  const addTestData = async () => {
    setLoading(true)
    addResult("➕ Adding test data...")

    try {
      const testUser = {
        name: "Test User",
        email: "test@swachh.com",
        role: "driver",
        zone: "Zone A",
        status: "active",
      }

      const userId = await FirebaseService.createUser(testUser)
      addResult(`✅ Test user created with ID: ${userId}`)

      const testAssignment = {
        driverId: userId,
        feederPoint: "Test Feeder Point",
        route: "Route 1",
        scheduledTime: new Date().toISOString(),
        status: "pending",
      }

      const assignmentId = await FirebaseService.createAssignment(testAssignment)
      addResult(`✅ Test assignment created with ID: ${assignmentId}`)

      // Reload data to show new entries
      await loadCollectionData()
    } catch (error: any) {
      addResult(`❌ Error adding test data: ${error.message}`)
    }

    setLoading(false)
  }

  useEffect(() => {
    testDatabaseConnection()
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
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            🔥 Firebase Database Status
          </Text>

          <View style={styles.statusRow}>
            <Text variant="bodyMedium">Connection: </Text>
            {connectionStatus === "testing" ? (
              <ActivityIndicator size="small" />
            ) : (
              <Chip
                mode="flat"
                textStyle={{ color: getStatusColor(connectionStatus) }}
                style={{ backgroundColor: `${getStatusColor(connectionStatus)}20` }}
              >
                {connectionStatus.toUpperCase()}
              </Chip>
            )}
          </View>

          <View style={styles.buttonRow}>
            <Button mode="outlined" onPress={testDatabaseConnection} loading={loading} style={styles.button}>
              Retest Connection
            </Button>
            <Button mode="contained" onPress={addTestData} loading={loading} style={styles.button}>
              Add Test Data
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Collections Data */}
      {Object.keys(collections).length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              📊 Database Collections
            </Text>

            {Object.entries(collections).map(([collectionName, data]: [string, any]) => (
              <View key={collectionName} style={styles.collectionSection}>
                <Text variant="titleSmall" style={styles.collectionTitle}>
                  {collectionName.toUpperCase()} ({Array.isArray(data) ? data.length : 0} documents)
                </Text>

                {Array.isArray(data) && data.length > 0 ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data.slice(0, 3).map((item: any, index: number) => (
                      <Card key={index} style={styles.dataCard}>
                        <Card.Content>
                          <Text variant="bodySmall" style={styles.dataText}>
                            ID: {item.id}
                          </Text>
                          {Object.entries(item)
                            .slice(1, 4)
                            .map(([key, value]: [string, any]) => (
                              <Text key={key} variant="bodySmall" style={styles.dataText}>
                                {key}:{" "}
                                {typeof value === "object"
                                  ? JSON.stringify(value).slice(0, 30) + "..."
                                  : String(value).slice(0, 30)}
                              </Text>
                            ))}
                        </Card.Content>
                      </Card>
                    ))}
                  </ScrollView>
                ) : (
                  <Text variant="bodySmall" style={styles.emptyText}>
                    No data found
                  </Text>
                )}
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Test Results Log */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            📝 Connection Log
          </Text>
          <ScrollView style={styles.logContainer} nestedScrollEnabled>
            {testResults.map((result, index) => (
              <Text key={index} variant="bodySmall" style={styles.logText}>
                {result}
              </Text>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#1976d2",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  collectionSection: {
    marginBottom: 16,
  },
  collectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#666",
  },
  dataCard: {
    width: 200,
    marginRight: 8,
    backgroundColor: "#e3f2fd",
  },
  dataText: {
    fontSize: 11,
    marginBottom: 2,
    fontFamily: "monospace",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    padding: 16,
  },
  logContainer: {
    maxHeight: 150,
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 4,
  },
  logText: {
    fontFamily: "monospace",
    fontSize: 11,
    marginBottom: 2,
    color: "#333",
  },
})

export default DatabaseViewer
