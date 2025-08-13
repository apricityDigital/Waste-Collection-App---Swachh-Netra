import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Quality Check Screens
import QualityCheckDashboard from "../screens/quality-check/QualityCheckDashboard"
import ReportsMonitoring from "../screens/quality-check/ReportsMonitoring"
import ZonePerformance from "../screens/quality-check/ZonePerformance"
import AttendanceReports from "../screens/quality-check/AttendanceReports"
import WasteAnalytics from "../screens/quality-check/WasteAnalytics"

const Tab = createBottomTabNavigator()

export default function QualityCheckNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "view-dashboard" : "view-dashboard-outline"
              break
            case "Reports":
              iconName = focused ? "file-chart" : "file-chart-outline"
              break
            case "Zones":
              iconName = focused ? "map-marker-multiple" : "map-marker-multiple-outline"
              break
            case "Attendance":
              iconName = focused ? "account-check" : "account-check-outline"
              break
            case "Analytics":
              iconName = focused ? "chart-line" : "chart-line-variant"
              break
            default:
              iconName = "circle"
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={QualityCheckDashboard} options={{ title: "QC Dashboard" }} />
      <Tab.Screen name="Reports" component={ReportsMonitoring} options={{ title: "Reports" }} />
      <Tab.Screen name="Zones" component={ZonePerformance} options={{ title: "Zone Performance" }} />
      <Tab.Screen name="Attendance" component={AttendanceReports} options={{ title: "Attendance" }} />
      <Tab.Screen name="Analytics" component={WasteAnalytics} options={{ title: "Analytics" }} />
    </Tab.Navigator>
  )
}
