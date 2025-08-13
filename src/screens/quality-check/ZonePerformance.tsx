"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Card, Title, Paragraph, Chip, DataTable, ProgressBar, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function ZonePerformance() {
  const [selectedZone, setSelectedZone] = useState("all")

  const [zoneData, setZoneData] = useState([
    {
      id: "zone1",
      name: "Zone 1",
      totalWorkers: 25,
      activeWorkers: 23,
      attendanceRate: 92,
      wasteCollected: 450,
      completionRate: 95,
      status: "excellent",
      lastUpdated: "2 hours ago",
    },
    {
      id: "zone2",
      name: "Zone 2",
      totalWorkers: 18,
      activeWorkers: 16,
      attendanceRate: 89,
      wasteCollected: 320,
      completionRate: 88,
      status: "good",
      lastUpdated: "1 hour ago",
    },
    {
      id: "zone3",
      name: "Zone 3",
      totalWorkers: 22,
      activeWorkers: 14,
      attendanceRate: 64,
      wasteCollected: 180,
      completionRate: 65,
      status: "poor",
      lastUpdated: "30 minutes ago",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "#4caf50"
      case "good":
        return "#2196f3"
      case "fair":
        return "#ff9800"
      case "poor":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  const filteredZones = selectedZone === "all" ? zoneData : zoneData.filter((zone) => zone.id === selectedZone)

  return (
    <ScrollView style={styles.container}>
      {/* Zone Filter */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Zone Selection</Title>
          <View style={styles.filterContainer}>
            <Chip selected={selectedZone === "all"} onPress={() => setSelectedZone("all")} style={styles.filterChip}>
              All Zones
            </Chip>
            {zoneData.map((zone) => (
              <Chip
                key={zone.id}
                selected={selectedZone === zone.id}
                onPress={() => setSelectedZone(zone.id)}
                style={styles.filterChip}
              >
                {zone.name}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Zone Performance Cards */}
      {filteredZones.map((zone) => (
        <Card key={zone.id} style={styles.card}>
          <Card.Content>
            <View style={styles.zoneHeader}>
              <View>
                <Title>{zone.name}</Title>
                <Paragraph style={styles.lastUpdated}>Last updated: {zone.lastUpdated}</Paragraph>
              </View>
              <Chip
                style={[styles.statusChip, { backgroundColor: getStatusColor(zone.status) }]}
                textStyle={{ color: "white" }}
              >
                {zone.status.toUpperCase()}
              </Chip>
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <MaterialCommunityIcons name="account-group" size={24} color="#2196f3" />
                <Title style={styles.metricValue}>
                  {zone.activeWorkers}/{zone.totalWorkers}
                </Title>
                <Paragraph style={styles.metricLabel}>Active Workers</Paragraph>
              </View>

              <View style={styles.metric}>
                <MaterialCommunityIcons name="delete" size={24} color="#4caf50" />
                <Title style={styles.metricValue}>{zone.wasteCollected}kg</Title>
                <Paragraph style={styles.metricLabel}>Waste Collected</Paragraph>
              </View>
            </View>

            {/* Performance Bars */}
            <View style={styles.performanceSection}>
              <View style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Paragraph>Attendance Rate</Paragraph>
                  <Paragraph style={styles.percentage}>{zone.attendanceRate}%</Paragraph>
                </View>
                <ProgressBar
                  progress={zone.attendanceRate / 100}
                  color={zone.attendanceRate >= 80 ? "#4caf50" : zone.attendanceRate >= 60 ? "#ff9800" : "#f44336"}
                  style={styles.progressBar}
                />
              </View>

              <View style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Paragraph>Collection Completion</Paragraph>
                  <Paragraph style={styles.percentage}>{zone.completionRate}%</Paragraph>
                </View>
                <ProgressBar
                  progress={zone.completionRate / 100}
                  color={zone.completionRate >= 80 ? "#4caf50" : zone.completionRate >= 60 ? "#ff9800" : "#f44336"}
                  style={styles.progressBar}
                />
              </View>
            </View>

            <Button mode="outlined" onPress={() => {}} style={styles.detailButton}>
              View Detailed Report
            </Button>
          </Card.Content>
        </Card>
      ))}

      {/* Comparative Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Zone Comparison</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Zone</DataTable.Title>
              <DataTable.Title numeric>Attendance</DataTable.Title>
              <DataTable.Title numeric>Collection</DataTable.Title>
              <DataTable.Title numeric>Workers</DataTable.Title>
            </DataTable.Header>

            {zoneData.map((zone) => (
              <DataTable.Row key={zone.id}>
                <DataTable.Cell>{zone.name}</DataTable.Cell>
                <DataTable.Cell numeric>{zone.attendanceRate}%</DataTable.Cell>
                <DataTable.Cell numeric>{zone.completionRate}%</DataTable.Cell>
                <DataTable.Cell numeric>
                  {zone.activeWorkers}/{zone.totalWorkers}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
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
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  zoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  lastUpdated: {
    color: "#757575",
    fontSize: 12,
  },
  statusChip: {
    alignSelf: "flex-start",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metric: {
    alignItems: "center",
    flex: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#757575",
    textAlign: "center",
  },
  performanceSection: {
    marginBottom: 16,
  },
  performanceItem: {
    marginBottom: 16,
  },
  performanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  percentage: {
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  detailButton: {
    marginTop: 8,
  },
})
