import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { MaterialIcons } from "@expo/vector-icons"

// Driver Screens
import DriverDashboard from "../screens/driver/DriverDashboard"
import PickupAssignments from "../screens/driver/PickupAssignments"
import DriverAttendance from "../screens/driver/DriverAttendance"
import VehicleInfo from "../screens/driver/VehicleInfo"
import DriverMessages from "../screens/driver/DriverMessages"
import DriverProfile from "../screens/driver/DriverProfile"
import FeederPointDetail from "../screens/driver/FeederPointDetail"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AssignmentsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PickupAssignmentsList" component={PickupAssignments} options={{ headerShown: false }} />
      <Stack.Screen
        name="FeederPointDetail"
        component={FeederPointDetail}
        options={{
          headerShown: true,
          title: "Feeder Point Details",
        }}
      />
    </Stack.Navigator>
  )
}

const DriverNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap

          switch (route.name) {
            case "Dashboard":
              iconName = "dashboard"
              break
            case "Assignments":
              iconName = "assignment"
              break
            case "Attendance":
              iconName = "access-time"
              break
            case "Vehicle":
              iconName = "local-shipping"
              break
            case "Messages":
              iconName = "message"
              break
            case "Profile":
              iconName = "person"
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
      <Tab.Screen name="Dashboard" component={DriverDashboard} />
      <Tab.Screen name="Assignments" component={AssignmentsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Attendance" component={DriverAttendance} />
      <Tab.Screen name="Vehicle" component={VehicleInfo} />
      <Tab.Screen name="Messages" component={DriverMessages} />
      <Tab.Screen name="Profile" component={DriverProfile} />
    </Tab.Navigator>
  )
}

export default DriverNavigator
