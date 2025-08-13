import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"

// Admin Screens
import AdminDashboard from "../screens/admin/AdminDashboard"
import UserManagement from "../screens/admin/UserManagement"
import RequestsApprovals from "../screens/admin/RequestsApprovals"
import ZoneMonitoring from "../screens/admin/ZoneMonitoring"
import Analytics from "../screens/admin/Analytics"
import AdminSettings from "../screens/admin/AdminSettings"

const Tab = createBottomTabNavigator()

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap

          switch (route.name) {
            case "Dashboard":
              iconName = "dashboard"
              break
            case "Users":
              iconName = "people"
              break
            case "Requests":
              iconName = "approval"
              break
            case "Zones":
              iconName = "location-on"
              break
            case "Analytics":
              iconName = "analytics"
              break
            case "Settings":
              iconName = "settings"
              break
            default:
              iconName = "dashboard"
          }

          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Users" component={UserManagement} />
      <Tab.Screen name="Requests" component={RequestsApprovals} />
      <Tab.Screen name="Zones" component={ZoneMonitoring} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Settings" component={AdminSettings} />
    </Tab.Navigator>
  )
}

export default AdminNavigator
