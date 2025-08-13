import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Transport Contractor Screens
import ContractorDashboard from "../screens/transport-contractor/ContractorDashboard"
import DriversManagement from "../screens/transport-contractor/DriversManagement"
import VehiclesManagement from "../screens/transport-contractor/VehiclesManagement"
import RouteAssignment from "../screens/transport-contractor/RouteAssignment"
import TransportTracker from "../screens/transport-contractor/TransportTracker"
import ContractorPerformance from "../screens/transport-contractor/ContractorPerformance"
import ContractorRequests from "../screens/transport-contractor/ContractorRequests"
import ContractorMessaging from "../screens/transport-contractor/ContractorMessaging"

const Tab = createBottomTabNavigator()

export default function TransportContractorNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "Dashboard":
              iconName = "view-dashboard"
              break
            case "Drivers":
              iconName = "account-hard-hat"
              break
            case "Vehicles":
              iconName = "truck"
              break
            case "Routes":
              iconName = "map-marker-path"
              break
            case "Transport":
              iconName = "truck-delivery"
              break
            case "Performance":
              iconName = "chart-bar"
              break
            case "Requests":
              iconName = "file-document"
              break
            case "Messages":
              iconName = "message"
              break
            default:
              iconName = "help-circle"
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: "#FF9800",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FF9800",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={ContractorDashboard} options={{ title: "Dashboard" }} />
      <Tab.Screen name="Drivers" component={DriversManagement} options={{ title: "Drivers" }} />
      <Tab.Screen name="Vehicles" component={VehiclesManagement} options={{ title: "Vehicles" }} />
      <Tab.Screen name="Routes" component={RouteAssignment} options={{ title: "Routes" }} />
      <Tab.Screen name="Transport" component={TransportTracker} options={{ title: "Transport" }} />
      <Tab.Screen name="Performance" component={ContractorPerformance} options={{ title: "Performance" }} />
      <Tab.Screen name="Requests" component={ContractorRequests} options={{ title: "Requests" }} />
      <Tab.Screen name="Messages" component={ContractorMessaging} options={{ title: "Messages" }} />
    </Tab.Navigator>
  )
}
