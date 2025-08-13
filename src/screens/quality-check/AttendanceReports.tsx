"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { Card, Title, Paragraph, Button, Chip, DataTable, Searchbar } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function AttendanceReports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("today")
  const [selectedZone, setSelectedZone] = useState("all")

  const [attendanceData, setAttendanceData] = useState([
    {
      id: "W001",
      name: "Rajesh Kumar",
      zone: "Zone 1",
      feederPoint: "FP-101",
      status: "present",
      checkInTime: "08:15 AM",
      checkOutTime: "05:30 PM",
      hoursWorked: 9.25,
      wasteCollected: 45,
    },
    {
      id: "W002",
      name: "Priya Sharma",
      zone: "Zone 1",
      feederPoint: "FP-102",
      status: "present",
      checkInTime: "08:00 AM",
      checkOutTime: "05:15 PM",
      hoursWorked: 9.25,
      wasteCollected: 38,
    },
    {
      id: "W003",
      name: "Mohammed Ali",
      zone: "Zone 2",
      feederPoint: "FP-201",
      status: "absent",
      checkInTime: "-",
      checkOutTime: "-",
      hoursWorked: 0,
      wasteCollected: 0,
    },
    {
      id: "W004",
      name: "Sunita Devi",
      zone: "Zone 2",
      feederPoint: "FP-202",
      status: "late",
      checkInTime: "09:30 AM",
      checkOutTime: "05:45 PM",
      hoursWorked: 8.25,
      wasteCollected: 32,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "#4caf50"
      case "absent":
        return "#f44336"
      case "late":
        return "#ff9800"
      case "reliever":
        return "#2196f3"
      default:
        return "#757575"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return "check-circle"
      case "absent":
        return "close-circle"
      case "late":
        return "clock-alert"
      case "reliever":
        return "account-switch"
      default:
        return "help-circle"
    }
  }

  const filteredData = attendanceData.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesZone = selectedZone === "all" || worker.zone === selectedZone

    return matchesSearch && matchesZone
  })

  const attendanceStats = {
    total: attendanceData.length,
    present: attendanceData.filter((w) => w.status === "present").length,
    absent: attendanceData.filter((w) => w.status === "absent").length,
    late: attendanceData.filter((w) => w.status === "late").length,
    attendanceRate: Math.round(
      (attendanceData.filter((w) => w.status === "present" || w.status === "late").length / attendanceData.length) *
        100,
    ),
  }

  return (
    <ScrollView style={styles.container}>
      {/* Filters */}
      <Card style={styles.card}>
        <Card.Content>
          <Searchbar
            placeholder="Search workers..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Paragraph style={styles.filterLabel}>Date:</Paragraph>
              <View style={styles.filterChips}>
                <Chip
                  selected={selectedDate === "today"}
                  onPress={() => setSelectedDate("today")}
                  style={styles.filterChip}
                >
                  Today
                </Chip>
                <Chip
                  selected={selectedDate === "week"}
                  onPress={() => setSelectedDate("week")}
                  style={styles.filterChip}
                >
                  This Week
                </Chip>
                <Chip
                  selected={selectedDate === "month"}
                  onPress={() => setSelectedDate("month")}
                  style={styles.filterChip}
                >
                  This Month
                </Chip>
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Paragraph style={styles.filterLabel}>Zone:</Paragraph>
              <View style={styles.filterChips}>
                <Chip
                  selected={selectedZone === "all"}
                  onPress={() => setSelectedZone("all")}
                  style={styles.filterChip}
                >
                  All Zones
                </Chip>
                <Chip
                  selected={selectedZone === "Zone 1"}
                  onPress={() => setSelectedZone("Zone 1")}
                  style={styles.filterChip}
                >
                  Zone 1
                </Chip>
                <Chip
                  selected={selectedZone === "Zone 2"}
                  onPress={() => setSelectedZone("Zone 2")}
                  style={styles.filterChip}
                >
                  Zone 2
                </Chip>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Attendance Summary */}
      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { backgroundColor: "#e3f2fd" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="account-group" size={24} color="#1976d2" />
            <Title style={styles.summaryNumber}>{attendanceStats.total}</Title>
            <Paragraph style={styles.summaryLabel}>Total Workers</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: "#e8f5e8" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#388e3c" />
            <Title style={styles.summaryNumber}>{attendanceStats.present}</Title>
            <Paragraph style={styles.summaryLabel}>Present</Paragraph>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: "#ffebee" }]}>
          <Card.Content style={styles.summaryContent}>
            <MaterialCommunityIcons name="close-circle" size={24} color="#d32f2f" />
            <Title style={styles.summaryNumber}>{attendanceStats.absent}</Title>
            <Paragraph style={styles.summaryLabel}>Absent</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Attendance Rate */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.rateHeader}>
            <Title>Overall Attendance Rate</Title>
            <Chip
              style={[
                styles.rateChip,
                {
                  backgroundColor:
                    attendanceStats.attendanceRate >= 90
                      ? "#4caf50"
                      : attendanceStats.attendanceRate >= 75
                        ? "#ff9800"
                        : "#f44336",
                },
              ]}
              textStyle={{ color: "white", fontWeight: "bold" }}
            >
              {attendanceStats.attendanceRate}%
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Attendance Details */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.tableHeader}>
            <Title>Attendance Details</Title>
            <Button mode="outlined" compact onPress={() => {}}>
              Export
            </Button>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Worker</DataTable.Title>
              <DataTable.Title>Zone</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title numeric>Hours</DataTable.Title>
            </DataTable.Header>

            {filteredData.map((worker) => (
              <DataTable.Row key={worker.id}>
                <DataTable.Cell>
                  <View>
                    <Paragraph style={styles.workerName}>{worker.name}</Paragraph>
                    <Paragraph style={styles.workerId}>{worker.id}</Paragraph>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <View>
                    <Paragraph>{worker.zone}</Paragraph>
                    <Paragraph style={styles.feederPoint}>{worker.feederPoint}</Paragraph>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.statusContainer}>
                    <MaterialCommunityIcons
                      name={getStatusIcon(worker.status) as any}
                      size={16}
                      color={getStatusColor(worker.status)}
                    />
                    <Paragraph style={[styles.statusText, { color: getStatusColor(worker.status) }]}>
                      {worker.status.toUpperCase()}
                    </Paragraph>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Paragraph>{worker.hoursWorked}h</Paragraph>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Detailed Worker Cards */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Worker Details</Title>
          {filteredData.map((worker) => (
            <Card key={worker.id} style={styles.workerCard}>
              <Card.Content>
                <View style={styles.workerHeader}>
                  <View>
                    <Title style={styles.workerCardName}>{worker.name}</Title>
                    <Paragraph style={styles.workerCardId}>
                      {worker.id} • {worker.zone}
                    </Paragraph>
                  </View>
                  <Chip
                    style={[styles.statusChip, { backgroundColor: getStatusColor(worker.status) }]}
                    textStyle={{ color: "white" }}
                  >
                    {worker.status.toUpperCase()}
                  </Chip>
                </View>

                <View style={styles.workerDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>{worker.feederPoint}</Paragraph>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="clock-in" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>In: {worker.checkInTime}</Paragraph>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="clock-out" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>Out: {worker.checkOutTime}</Paragraph>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="delete" size={16} color="#757575" />
                    <Paragraph style={styles.detailText}>{worker.wasteCollected}kg collected</Paragraph>
                  </View>
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
  filterRow: {
    gap: 16,
  },
  filterGroup: {
    marginBottom: 8,
  },
  filterLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterChips: {
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
  rateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateChip: {
    paddingHorizontal: 12,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  workerName: {
    fontWeight: "bold",
  },
  workerId: {
    fontSize: 12,
    color: "#757575",
  },
  feederPoint: {
    fontSize: 12,
    color: "#757575",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  workerCard: {
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },
  workerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  workerCardName: {
    fontSize: 16,
  },
  workerCardId: {
    fontSize: 12,
    color: "#757575",
  },
  statusChip: {
    alignSelf: "flex-start",
  },
  workerDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
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
})
