import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Swachh HR Screens
import SwachhHRDashboard from "../screens/swachh-hr/SwachhHRDashboard"
import WorkersDirectory from "../screens/swachh-hr/WorkersDirectory"
import FeederAssignment from "../screens/swachh-hr/FeederAssignment"
import AttendanceMonitor from "../screens/swachh-hr/AttendanceMonitor"
import WasteTracker from "../screens/swachh-hr/WasteTracker"
import PerformanceDashboard from "../screens/swachh-hr/PerformanceDashboard"
import RequestTracker from "../screens/swachh-hr/RequestTracker"
import HRMessaging from "../screens/swachh-hr/HRMessaging"

const Tab = createBottomTabNavigator()

export default function SwachhHRNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "Dashboard":
              iconName = "view-dashboard"
              break
            case "Workers":
              iconName = "account-group"
              break
            case "Assignment":
              iconName = "map-marker-multiple"
              break
            case "Attendance":
              iconName = "calendar-check"
              break
            case "Waste":
              iconName = "delete-variant"
              break
            case "Performance":
              iconName = "chart-line"
              break
            case "Requests":
              iconName = "file-document-multiple"
              break
            case "Messages":
              iconName = "message-text"
              break
            default:
              iconName = "help-circle"
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={SwachhHRDashboard} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Workers" component={WorkersDirectory} options={{ title: "Workers" }} />
      <Tab.Screen name="Assignment" component={FeederAssignment} options={{ title: "Assignment" }} />
      <Tab.Screen name="Attendance" component={AttendanceMonitor} options={{ title: "Attendance" }} />
      <Tab.Screen name="Waste" component={WasteTracker} options={{ title: "Waste Tracker" }} />
      <Tab.Screen name="Performance" component={PerformanceDashboard} options={{ title: "Performance" }} />
      <Tab.Screen name="Requests" component={RequestTracker} options={{ title: "Requests" }} />
      <Tab.Screen name="Messages" component={HRMessaging} options={{ title: "Messages" }} />
    </Tab.Navigator>
  )
}
