"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Card, Title, Paragraph, Button, Chip, Searchbar } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function ReportsMonitoring() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const [reports, setReports] = useState([
    {
      id: "RPT001",
      type: "Attendance",
      zone: "Zone 1",
      submittedBy: "Driver John",
      date: "2024-01-15",
      status: "reviewed",
      priority: "medium",
      description: "Daily attendance report for Zone 1 workers",
    },
    {
      id: "RPT002",
      type: "Waste Collection",
      zone: "Zone 3",
      submittedBy: "HR Manager",
      date: "2024-01-15",
      status: "pending",
      priority: "high",
      description: "Waste collection efficiency report",
    },
    {
      id: "RPT003",
      type: "Vehicle Issue",
      zone: "Zone 2",
      submittedBy: "Driver Mike",
      date: "2024-01-14",
      status: "resolved",
      priority: "low",
      description: "Vehicle maintenance required",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#ff9800"
      case "reviewed":
        return "#2196f3"
      case "resolved":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#f44336"
      case "medium":
        return "#ff9800"
      case "low":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "all" || report.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  return (
    <ScrollView style={styles.container}>
      {/* Search and Filters */}
      <Card style={styles.card}>
        <Card.Content>
          <Searchbar
            placeholder="Search reports..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <View style={styles.filterContainer}>
            <Chip
              selected={selectedFilter === "all"}
              onPress={() => setSelectedFilter("all")}
              style={styles.filterChip}
            >
              All Reports
            </Chip>
            <Chip
              selected={selectedFilter === "pending"}
              onPress={() => setSelectedFilter("pending")}
              style={styles.filterChip}
            >
              Pending
            </Chip>
            <Chip
              selected={selectedFilter === "reviewed"}
              onPress={() => setSelectedFilter("reviewed")}
              style={styles.filterChip}
            >
              Reviewed
            </Chip>
            <Chip
              selected={selectedFilter === "resolved"}
              onPress={() => setSelectedFilter("resolved")}
              style={styles.filterChip}
            >
              Resolved
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Reports Summary */}
      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { backgroundColor: "#fff3e0" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="file-document" size={24} color="#f57c00" />
            <Title style={styles.summaryNumber}>{reports.length}</Title>
            <Paragraph style={styles.summaryLabel}>Total Reports</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: "#ffebee" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="clock-alert" size={24} color="#f44336" />
            <Title style={styles.summaryNumber}>{reports.filter((r) => r.status === "pending").length}</Title>
            <Paragraph style={styles.summaryLabel}>Pending</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: "#e8f5e8" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#4caf50" />
            <Title style={styles.summaryNumber}>{reports.filter((r) => r.status === "resolved").length}</Title>
            <Paragraph style={styles.summaryLabel}>Resolved</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Reports List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Reports List</Title>

          {filteredReports.map((report) => (
            <Card key={report.id} style={styles.reportCard}>
              <Card.Content>
                <View style={styles.reportHeader}>
                  <View style={styles.reportInfo}>
                    <Title style={styles.reportId}>{report.id}</Title>
                    <Paragraph style={styles.reportType}>{report.type}</Paragraph>
                  </View>
                  <View style={styles.reportStatus}>
                    <Chip
                      style={[styles.statusChip, { backgroundColor: getStatusColor(report.status) }]}
                      textStyle={{ color: "white" }}
                    >
                      {report.status.toUpperCase()}
                    </Chip>
                    <Chip
                      style={[styles.priorityChip, { backgroundColor: getPriorityColor(report.priority) }]}
                      textStyle={{ color: "white" }}
                    >
                      {report.priority.toUpperCase()}
                    </Chip>
                  </View>
                </View>

                <Paragraph style={styles.reportDescription}>{report.description}</Paragraph>

                <View style={styles.reportDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>{report.zone}</Paragraph>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="account" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>{report.submittedBy}</Paragraph>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="calendar" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>{report.date}</Paragraph>
                  </View>
                </View>

                <View style={styles.reportActions}>
                  <Button mode="outlined" compact onPress={() => {}}>
                    View Details
                  </Button>
                  <Button mode="contained" compact onPress={() => {}} disabled={report.status === "resolved"}>
                    Export
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
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
  searchbar: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    flex: 0.32,
    elevation: 2,
  },
  summaryContent: {
    alignItems: "center",
    paddingVertical: 12,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#757575",
  },
  reportCard: {
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  reportInfo: {
    flex: 1,
  },
  reportId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reportType: {
    color: "#757575",
    fontSize: 14,
  },
  reportStatus: {
    alignItems: "flex-end",
    gap: 4,
  },
  statusChip: {
    minWidth: 80,
  },
  priorityChip: {
    minWidth: 60,
  },
  reportDescription: {
    marginBottom: 12,
    fontSize: 14,
  },
  reportDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: "#757575",
  },
  reportActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
})
