"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { Card, Title, Paragraph, Button, Chip, DataTable } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

export default function WasteAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedMetric, setSelectedMetric] = useState("collection")

  const [analyticsData, setAnalyticsData] = useState({
    totalWasteToday: 2.4,
    totalWasteWeek: 16.8,
    totalWasteMonth: 72.5,
    averagePerWorker: 18.5,
    topPerformingZone: "Zone 1",
    collectionEfficiency: 92,
    recyclingRate: 68,
    wasteReduction: 12,
  })

  const [zoneWasteData, setZoneWasteData] = useState([
    { zone: "Zone 1", collected: 8.2, target: 8.5, efficiency: 96, workers: 25 },
    { zone: "Zone 2", collected: 5.8, target: 6.2, efficiency: 94, workers: 18 },
    { zone: "Zone 3", collected: 2.8, target: 4.5, efficiency: 62, workers: 22 },
  ])

  const [wasteTypeData, setWasteTypeData] = useState([
    { type: "Organic", amount: 12.5, percentage: 52, color: "#4caf50" },
    { type: "Plastic", amount: 6.2, percentage: 26, color: "#2196f3" },
    { type: "Paper", amount: 3.8, percentage: 16, color: "#ff9800" },
    { type: "Metal", amount: 1.5, percentage: 6, color: "#9c27b0" },
  ])

  const [dailyTrends, setDailyTrends] = useState([
    { day: "Mon", collected: 3.2, target: 3.5 },
    { day: "Tue", collected: 3.8, target: 3.5 },
    { day: "Wed", collected: 2.9, target: 3.5 },
    { day: "Thu", collected: 3.6, target: 3.5 },
    { day: "Fri", collected: 3.3, target: 3.5 },
    { day: "Sat", collected: 2.1, target: 2.0 },
    { day: "Sun", collected: 1.9, target: 2.0 },
  ])

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "#4caf50"
    if (efficiency >= 75) return "#ff9800"
    return "#f44336"
  }

  return (
    <ScrollView style={styles.container}>
      {/* Period Filter */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Analytics Period</Title>
          <View style={styles.filterContainer}>
            <Chip
              selected={selectedPeriod === "day"}
              onPress={() => setSelectedPeriod("day")}
              style={styles.filterChip}
            >
              Today
            </Chip>
            <Chip
              selected={selectedPeriod === "week"}
              onPress={() => setSelectedPeriod("week")}
              style={styles.filterChip}
            >
              This Week
            </Chip>
            <Chip
              selected={selectedPeriod === "month"}
              onPress={() => setSelectedPeriod("month")}
              style={styles.filterChip}
            >
              This Month
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Key Metrics */}
      <View style={styles.metricsRow}>
        <Card style={[styles.metricCard, { backgroundColor: "#e8f5e8" }]}>
          <Card.Content style={styles.metricContent}>
            <MaterialCommunityIcons name="delete" size={28} color="#4caf50" />
            <Title style={styles.metricValue}>
              {selectedPeriod === "day"
                ? analyticsData.totalWasteToday
                : selectedPeriod === "week"
                  ? analyticsData.totalWasteWeek
                  : analyticsData.totalWasteMonth}
              T
            </Title>
            <Paragraph style={styles.metricLabel}>Total Waste</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.metricCard, { backgroundColor: "#e3f2fd" }]}>
          <Card.Content style={styles.metricContent}>
            <MaterialCommunityIcons name="chart-line" size={28} color="#2196f3" />
            <Title style={styles.metricValue}>{analyticsData.collectionEfficiency}%</Title>
            <Paragraph style={styles.metricLabel}>Efficiency</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.metricsRow}>
        <Card style={[styles.metricCard, { backgroundColor: "#fff3e0" }]}>
          <Card.Content style={styles.metricContent}>
            <MaterialCommunityIcons name="recycle" size={28} color="#f57c00" />
            <Title style={styles.metricValue}>{analyticsData.recyclingRate}%</Title>
            <Paragraph style={styles.metricLabel}>Recycling Rate</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.metricCard, { backgroundColor: "#fce4ec" }]}>
          <Card.Content style={styles.metricContent}>
            <MaterialCommunityIcons name="trending-down" size={28} color="#c2185b" />
            <Title style={styles.metricValue}>{analyticsData.wasteReduction}%</Title>
            <Paragraph style={styles.metricLabel}>Reduction</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Zone Performance */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Zone-wise Collection Performance</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Zone</DataTable.Title>
              <DataTable.Title numeric>Collected</DataTable.Title>
              <DataTable.Title numeric>Target</DataTable.Title>
              <DataTable.Title numeric>Efficiency</DataTable.Title>
            </DataTable.Header>

            {zoneWasteData.map((zone, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{zone.zone}</DataTable.Cell>
                <DataTable.Cell numeric>{zone.collected}T</DataTable.Cell>
                <DataTable.Cell numeric>{zone.target}T</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Chip
                    style={[styles.efficiencyChip, { backgroundColor: getEfficiencyColor(zone.efficiency) }]}
                    textStyle={{ color: "white" }}
                  >
                    {zone.efficiency}%
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Waste Type Distribution */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Waste Type Distribution</Title>
          <View style={styles.wasteTypeContainer}>
            {wasteTypeData.map((item, index) => (
              <View key={index} style={styles.wasteTypeItem}>
                <View style={styles.wasteTypeHeader}>
                  <View style={styles.wasteTypeInfo}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <Paragraph style={styles.wasteTypeName}>{item.type}</Paragraph>
                  </View>
                  <Paragraph style={styles.wasteTypePercentage}>{item.percentage}%</Paragraph>
                </View>
                <View style={styles.wasteTypeDetails}>
                  <Paragraph style={styles.wasteTypeAmount}>{item.amount}T collected</Paragraph>
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Daily Trends */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Daily Collection Trends</Title>
          <View style={styles.trendsContainer}>
            {dailyTrends.map((day, index) => (
              <View key={index} style={styles.trendItem}>
                <Paragraph style={styles.dayLabel}>{day.day}</Paragraph>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.collectedBar,
                      {
                        height: (day.collected / 4) * 60,
                        backgroundColor: day.collected >= day.target ? "#4caf50" : "#ff9800",
                      },
                    ]}
                  />
                  <View style={[styles.targetLine, { bottom: (day.target / 4) * 60 }]} />
                </View>
                <Paragraph style={styles.valueLabel}>{day.collected}T</Paragraph>
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "#4caf50" }]} />
              <Paragraph style={styles.legendText}>Collected</Paragraph>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine]} />
              <Paragraph style={styles.legendText}>Target</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Top Performers */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Top Performing Workers</Title>
          <View style={styles.performersList}>
            {[
              { name: "Rajesh Kumar", zone: "Zone 1", collected: 52, rank: 1 },
              { name: "Priya Sharma", zone: "Zone 1", collected: 48, rank: 2 },
              { name: "Mohammed Ali", zone: "Zone 2", collected: 45, rank: 3 },
            ].map((worker, index) => (
              <View key={index} style={styles.performerItem}>
                <View style={styles.rankBadge}>
                  <Paragraph style={styles.rankText}>{worker.rank}</Paragraph>
                </View>
                <View style={styles.performerInfo}>
                  <Paragraph style={styles.performerName}>{worker.name}</Paragraph>
                  <Paragraph style={styles.performerZone}>{worker.zone}</Paragraph>
                </View>
                <View style={styles.performerStats}>
                  <Paragraph style={styles.performerAmount}>{worker.collected}kg</Paragraph>
                  <Paragraph style={styles.performerLabel}>this week</Paragraph>
                </View>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Export Options */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Export Analytics</Title>
          <View style={styles.exportButtons}>
            <Button mode="outlined" onPress={() => {}} style={styles.exportButton}>
              Export PDF Report
            </Button>
            <Button mode="contained" onPress={() => {}} style={styles.exportButton}>
              Export Excel Data
            </Button>
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
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricCard: {
    flex: 0.48,
    elevation: 2,
  },
  metricContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#757575",
  },
  efficiencyChip: {
    minWidth: 60,
  },
  wasteTypeContainer: {
    marginTop: 16,
  },
  wasteTypeItem: {
    marginBottom: 16,
  },
  wasteTypeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  wasteTypeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  wasteTypeName: {
    fontWeight: "bold",
  },
  wasteTypePercentage: {
    fontWeight: "bold",
    fontSize: 16,
  },
  wasteTypeDetails: {
    marginLeft: 24,
  },
  wasteTypeAmount: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  trendsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 120,
    marginVertical: 16,
  },
  trendItem: {
    alignItems: "center",
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    marginBottom: 8,
    color: "#757575",
  },
  barContainer: {
    position: "relative",
    width: 20,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    justifyContent: "flex-end",
  },
  collectedBar: {
    width: "100%",
    borderRadius: 2,
  },
  targetLine: {
    position: "absolute",
    left: -2,
    right: -2,
    height: 2,
    backgroundColor: "#f44336",
  },
  valueLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#757575",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendLine: {
    width: 12,
    height: 2,
    backgroundColor: "#f44336",
  },
  legendText: {
    fontSize: 12,
    color: "#757575",
  },
  performersList: {
    marginTop: 16,
  },
  performerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "white",
    fontWeight: "bold",
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontWeight: "bold",
  },
  performerZone: {
    fontSize: 12,
    color: "#757575",
  },
  performerStats: {
    alignItems: "flex-end",
  },
  performerAmount: {
    fontWeight: "bold",
    color: "#4caf50",
  },
  performerLabel: {
    fontSize: 12,
    color: "#757575",
  },
  exportButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  exportButton: {
    flex: 1,
  },
})
