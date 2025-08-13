"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { Card, Text, Button, Chip, Tabs } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"

interface Request {
  id: string
  type: "worker" | "driver" | "vehicle"
  title: string
  requester: string
  requesterRole: string
  description: string
  timestamp: string
  priority: "low" | "medium" | "high"
  status: "pending" | "approved" | "rejected"
}

const RequestsApprovals = () => {
  const [activeTab, setActiveTab] = useState(0)

  const [requests] = useState<Request[]>([
    {
      id: "1",
      type: "driver",
      title: "New Driver Registration",
      requester: "Transport Contractor A",
      requesterRole: "contractor",
      description: "Request to add new driver Suresh Kumar with license DL123456789",
      timestamp: "2024-01-15 10:30 AM",
      priority: "high",
      status: "pending",
    },
    {
      id: "2",
      type: "worker",
      title: "Worker Transfer Request",
      requester: "HR Manager",
      requesterRole: "hr",
      description: "Transfer worker Ravi from Zone A to Zone B due to residential change",
      timestamp: "2024-01-15 09:15 AM",
      priority: "medium",
      status: "pending",
    },
    {
      id: "3",
      type: "vehicle",
      title: "Vehicle Maintenance",
      requester: "Driver Rajesh",
      requesterRole: "driver",
      description: "Vehicle DL-01-AB-1234 requires immediate brake repair",
      timestamp: "2024-01-14 05:45 PM",
      priority: "high",
      status: "approved",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "driver":
        return "person"
      case "worker":
        return "people"
      case "vehicle":
        return "local-shipping"
      default:
        return "help"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "driver":
        return "#1976d2"
      case "worker":
        return "#4caf50"
      case "vehicle":
        return "#ff9800"
      default:
        return "#666"
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
        return "#666"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#ff9800"
      case "approved":
        return "#4caf50"
      case "rejected":
        return "#f44336"
      default:
        return "#666"
    }
  }

  const filteredRequests = requests.filter((request) => {
    switch (activeTab) {
      case 0:
        return request.status === "pending"
      case 1:
        return request.status === "approved"
      case 2:
        return request.status === "rejected"
      default:
        return true
    }
  })

  const renderRequest = ({ item }: { item: Request }) => (
    <Card style={styles.requestCard}>
      <Card.Content>
        <View style={styles.requestHeader}>
          <View style={styles.requestInfo}>
            <View style={styles.titleRow}>
              <MaterialIcons name={getTypeIcon(item.type)} size={20} color={getTypeColor(item.type)} />
              <Text variant="titleMedium" style={styles.requestTitle}>
                {item.title}
              </Text>
            </View>
            <Text variant="bodySmall" style={styles.requester}>
              Requested by: {item.requester} ({item.requesterRole})
            </Text>
            <Text variant="bodySmall" style={styles.timestamp}>
              {item.timestamp}
            </Text>
          </View>
          <View style={styles.requestStatus}>
            <Chip mode="flat" textStyle={{ color: getPriorityColor(item.priority) }} style={styles.priorityChip}>
              {item.priority.toUpperCase()}
            </Chip>
            <Chip mode="flat" textStyle={{ color: getStatusColor(item.status) }} style={styles.statusChip}>
              {item.status.toUpperCase()}
            </Chip>
          </View>
        </View>

        <Text variant="bodyMedium" style={styles.description}>
          {item.description}
        </Text>

        {item.status === "pending" && (
          <View style={styles.requestActions}>
            <Button
              mode="contained"
              icon="check"
              onPress={() => {
                /* Approve request */
              }}
              style={[styles.actionButton, { backgroundColor: "#4caf50" }]}
            >
              Approve
            </Button>
            <Button
              mode="contained"
              icon="close"
              onPress={() => {
                /* Reject request */
              }}
              style={[styles.actionButton, { backgroundColor: "#f44336" }]}
            >
              Reject
            </Button>
            <Button
              mode="outlined"
              icon="forward"
              onPress={() => {
                /* Forward request */
              }}
              style={styles.actionButton}
            >
              Forward
            </Button>
          </View>
        )}

        {item.status !== "pending" && (
          <View style={styles.requestActions}>
            <Button
              mode="outlined"
              icon="visibility"
              onPress={() => {
                /* View details */
              }}
              style={styles.actionButton}
            >
              View Details
            </Button>
            <Button
              mode="outlined"
              icon="history"
              onPress={() => {
                /* View history */
              }}
              style={styles.actionButton}
            >
              History
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Requests & Approvals
      </Text>

      {/* Tabs */}
      <Tabs.TabScreen value={activeTab} onChangeValue={setActiveTab} style={styles.tabs}>
        <Tabs.Tab value={0} label="Pending" />
        <Tabs.Tab value={1} label="Approved" />
        <Tabs.Tab value={2} label="Rejected" />
      </Tabs.TabScreen>

      {/* Requests List */}
      <FlatList
        data={filteredRequests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.requestsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inbox" size={64} color="#ccc" />
            <Text variant="bodyLarge" style={styles.emptyText}>
              No {activeTab === 0 ? "pending" : activeTab === 1 ? "approved" : "rejected"} requests
            </Text>
          </View>
        }
      />
    </View>
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
  tabs: {
    marginBottom: 16,
  },
  requestsList: {
    flex: 1,
  },
  requestCard: {
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  requestInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  requestTitle: {
    marginLeft: 8,
    flex: 1,
  },
  requester: {
    color: "#666",
    marginBottom: 2,
  },
  timestamp: {
    color: "#999",
    fontSize: 12,
  },
  requestStatus: {
    alignItems: "flex-end",
  },
  priorityChip: {
    marginBottom: 4,
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  description: {
    marginBottom: 12,
    lineHeight: 20,
  },
  requestActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyText: {
    marginTop: 16,
    color: "#666",
  },
})

export default RequestsApprovals
