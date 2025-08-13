"use client"

import React, { useState } from "react"
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { Card, Text, Button, Chip, ProgressBar } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"

const AdminDashboard = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData] = useState({
    totalUsers: 1250,
    activeDrivers: 85,
    activeContractors: 12,
    pendingRequests: 23,
    totalZones: 15,
    activeZones: 14,
    todayAttendance: 92,
    systemAlerts: 5,
  })

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text variant="headlineSmall" style={styles.title}>
        Admin Dashboard
      </Text>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="people" size={32} color="#1976d2" />
            <Text variant="headlineMedium">{dashboardData.totalUsers}</Text>
            <Text variant="bodySmall">Total Users</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="local-shipping" size={32} color="#4caf50" />
            <Text variant="headlineMedium">{dashboardData.activeDrivers}</Text>
            <Text variant="bodySmall">Active Drivers</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="business" size={32} color="#ff9800" />
            <Text variant="headlineMedium">{dashboardData.activeContractors}</Text>
            <Text variant="bodySmall">Contractors</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialIcons name="pending-actions" size={32} color="#f44336" />
            <Text variant="headlineMedium">{dashboardData.pendingRequests}</Text>
            <Text variant="bodySmall">Pending Requests</Text>
          </Card.Content>
        </Card>
      </View>

      {/* System Health */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">System Health</Text>
          <View style={styles.healthContainer}>
            <View style={styles.healthItem}>
              <Text variant="bodyMedium">Zone Coverage</Text>
              <ProgressBar
                progress={dashboardData.activeZones / dashboardData.totalZones}
                color="#4caf50"
                style={styles.progressBar}
              />
              <Text variant="bodySmall">
                {dashboardData.activeZones}/{dashboardData.totalZones} Active
              </Text>
            </View>
            <View style={styles.healthItem}>
              <Text variant="bodyMedium">Today's Attendance</Text>
              <ProgressBar progress={dashboardData.todayAttendance / 100} color="#1976d2" style={styles.progressBar} />
              <Text variant="bodySmall">{dashboardData.todayAttendance}%</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Alerts Panel */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">System Alerts</Text>
          <View style={styles.alertsContainer}>
            <Chip icon="warning" mode="flat" textStyle={{ color: "#f44336" }} style={styles.alertChip}>
              {dashboardData.systemAlerts} Critical Alerts
            </Chip>
            <Text variant="bodySmall" style={styles.alertText}>
              • 3 Drivers unassigned • 1 Vehicle maintenance overdue • 1 Zone with no updates (24h)
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Quick Actions</Text>
          <View style={styles.actionGrid}>
            <Button
              mode="contained"
              icon="people"
              onPress={() => navigation.navigate("Users")}
              style={styles.actionButton}
            >
              Manage Users
            </Button>
            <Button
              mode="outlined"
              icon="approval"
              onPress={() => navigation.navigate("Requests")}
              style={styles.actionButton}
            >
              Pending Requests
            </Button>
            <Button
              mode="outlined"
              icon="location-on"
              onPress={() => navigation.navigate("Zones")}
              style={styles.actionButton}
            >
              Zone Monitoring
            </Button>
            <Button
              mode="outlined"
              icon="analytics"
              onPress={() => navigation.navigate("Analytics")}
              style={styles.actionButton}
            >
              View Reports
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Recent Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <MaterialIcons name="person-add" size={20} color="#4caf50" />
              <Text variant="bodySmall" style={styles.activityText}>
                New driver registered - Amit Singh
              </Text>
              <Text variant="bodySmall" style={styles.activityTime}>
                2h ago
              </Text>
            </View>
            <View style={styles.activityItem}>
              <MaterialIcons name="report-problem" size={20} color="#ff9800" />
              <Text variant="bodySmall" style={styles.activityText}>
                Vehicle breakdown reported - DL-01-AB-5678
              </Text>
              <Text variant="bodySmall" style={styles.activityTime}>
                4h ago
              </Text>
            </View>
            <View style={styles.activityItem}>
              <MaterialIcons name="check-circle" size={20} color="#1976d2" />
              <Text variant="bodySmall" style={styles.activityText}>
                Zone A daily collection completed
              </Text>
              <Text variant="bodySmall" style={styles.activityTime}>
                6h ago
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    marginBottom: 16,
    color: "#1976d2",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    marginBottom: 8,
  },
  statContent: {
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
  },
  healthContainer: {
    marginTop: 8,
  },
  healthItem: {
    marginVertical: 8,
  },
  progressBar: {
    marginVertical: 4,
  },
  alertsContainer: {
    marginTop: 8,
  },
  alertChip: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  alertText: {
    color: "#666",
    lineHeight: 18,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    width: "48%",
    marginVertical: 4,
  },
  activityContainer: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  activityText: {
    flex: 1,
    marginLeft: 8,
    color: "#666",
  },
  activityTime: {
    color: "#999",
    fontSize: 12,
  },
})

export default AdminDashboard
