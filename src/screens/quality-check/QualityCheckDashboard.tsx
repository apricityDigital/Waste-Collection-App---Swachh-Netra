"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Card, Title, Paragraph, Chip, DataTable, ProgressBar } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function QualityCheckDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalZones: 12,
    activeDrivers: 45,
    totalWorkers: 128,
    todayAttendance: 85,
    wasteCollected: 2.4,
    completionRate: 92,
    pendingReports: 3,
    criticalAlerts: 1,
  })

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: "warning", message: "Zone 5 - Low attendance (65%)", time: "2 hours ago" },
    { id: 2, type: "error", message: "Vehicle breakdown reported - Zone 3", time: "4 hours ago" },
    { id: 3, type: "info", message: "New waste collection record - Zone 8", time: "6 hours ago" },
  ])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return "alert-circle"
      case "warning":
        return "alert"
      case "info":
        return "information"
      default:
        return "bell"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "#f44336"
      case "warning":
        return "#ff9800"
      case "info":
        return "#2196f3"
      default:
        return "#757575"
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Overview Cards */}
      <View style={styles.cardRow}>
        <Card style={[styles.overviewCard, { backgroundColor: "#e3f2fd" }]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="map-marker-multiple" size={32} color="#1976d2" />
            <Title style={styles.cardNumber}>{dashboardData.totalZones}</Title>
            <Paragraph style={styles.cardLabel}>Total Zones</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.overviewCard, { backgroundColor: "#e8f5e8" }]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="account-group" size={32} color="#388e3c" />
            <Title style={styles.cardNumber}>{dashboardData.totalWorkers}</Title>
            <Paragraph style={styles.cardLabel}>Total Workers</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.cardRow}>
        <Card style={[styles.overviewCard, { backgroundColor: "#fff3e0" }]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="truck" size={32} color="#f57c00" />
            <Title style={styles.cardNumber}>{dashboardData.activeDrivers}</Title>
            <Paragraph style={styles.cardLabel}>Active Drivers</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.overviewCard, { backgroundColor: "#fce4ec" }]}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="delete" size={32} color="#c2185b" />
            <Title style={styles.cardNumber}>{dashboardData.wasteCollected}T</Title>
            <Paragraph style={styles.cardLabel}>Waste Today</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Performance Metrics */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Today's Performance</Title>

          <View style={styles.metricRow}>
            <Paragraph>Attendance Rate</Paragraph>
            <Chip style={styles.chip}>{dashboardData.todayAttendance}%</Chip>
          </View>
          <ProgressBar progress={dashboardData.todayAttendance / 100} color="#4caf50" style={styles.progressBar} />

          <View style={styles.metricRow}>
            <Paragraph>Collection Completion</Paragraph>
            <Chip style={styles.chip}>{dashboardData.completionRate}%</Chip>
          </View>
          <ProgressBar progress={dashboardData.completionRate / 100} color="#2196f3" style={styles.progressBar} />
        </Card.Content>
      </Card>

      {/* Recent Alerts */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Alerts</Title>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <MaterialCommunityIcons
                name={getAlertIcon(alert.type) as any}
                size={24}
                color={getAlertColor(alert.type)}
              />
              <View style={styles.alertContent}>
                <Paragraph style={styles.alertMessage}>{alert.message}</Paragraph>
                <Paragraph style={styles.alertTime}>{alert.time}</Paragraph>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Quick Stats Table */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Zone Summary</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Zone</DataTable.Title>
              <DataTable.Title numeric>Attendance</DataTable.Title>
              <DataTable.Title numeric>Collection</DataTable.Title>
              <DataTable.Title numeric>Status</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Zone 1</DataTable.Cell>
              <DataTable.Cell numeric>95%</DataTable.Cell>
              <DataTable.Cell numeric>98%</DataTable.Cell>
              <DataTable.Cell numeric>
                <Chip style={{ backgroundColor: "#4caf50" }} textStyle={{ color: "white" }}>
                  Good
                </Chip>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Zone 2</DataTable.Cell>
              <DataTable.Cell numeric>88%</DataTable.Cell>
              <DataTable.Cell numeric>92%</DataTable.Cell>
              <DataTable.Cell numeric>
                <Chip style={{ backgroundColor: "#ff9800" }} textStyle={{ color: "white" }}>
                  Fair
                </Chip>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Zone 3</DataTable.Cell>
              <DataTable.Cell numeric>65%</DataTable.Cell>
              <DataTable.Cell numeric>70%</DataTable.Cell>
              <DataTable.Cell numeric>
                <Chip style={{ backgroundColor: "#f44336" }} textStyle={{ color: "white" }}>
                  Poor
                </Chip>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  overviewCard: {
    flex: 0.48,
    elevation: 2,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 4,
  },
  cardLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#757575",
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  chip: {
    backgroundColor: "#e3f2fd",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: "500",
  },
  alertTime: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
})
