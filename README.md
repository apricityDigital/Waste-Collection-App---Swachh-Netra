# Swachh Netra - Waste Management System

A comprehensive React Native application for waste management with dual roles: Driver and Admin.

## Features

### Driver Role
- **Dashboard**: Overview of daily tasks, performance stats, and alerts
- **Pickup Assignments**: View and manage assigned feeder points
- **Attendance**: Mark in/out with GPS verification and offline sync
- **QR Code Scanning**: Feeder point verification with mandatory GPS and photo capture
- **Worker Attendance**: Manage worker attendance at each feeder point
- **Vehicle Information**: View vehicle details and report issues
- **Messages**: Secure communication with admin and contractors
- **Performance Tracking**: View personal performance metrics

### Admin Role
- **Dashboard**: System overview with key metrics and alerts
- **User Management**: Manage users across all roles (Driver, Contractor, ZI, HR, Worker)
- **Requests & Approvals**: Handle all types of requests and approvals
- **Zone Monitoring**: Real-time zone status and performance tracking
- **Analytics**: Comprehensive reports and data visualization
- **System Settings**: Configure roles, permissions, and system parameters

## Key Technologies

- **React Native** with Expo
- **Firebase** for backend services
- **React Navigation** for navigation
- **React Native Paper** for UI components
- **Expo Camera** for QR scanning
- **Expo Location** for GPS tracking
- **AsyncStorage** for offline data storage
- **React Native Chart Kit** for analytics

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Configure Firebase:
   - Create a Firebase project
   - Add your Firebase configuration to `App.tsx`
   - Enable Authentication and Firestore

4. Run the application:
   \`\`\`bash
   npm start
   \`\`\`

## Core Features Implementation

### Offline Sync Capability
- Local storage of attendance, QR scans, and worker data
- Automatic sync when network is available
- Visual indicators for sync status

### QR Code Workflow
1. Scan QR code at feeder point
2. Capture GPS location (non-editable)
3. Take mandatory photo
4. Fill status checklist
5. Access worker attendance and waste logging

### Role-Based Access
- Dynamic navigation based on user role
- Secure authentication with Firebase
- Role-specific features and permissions

### Real-time Updates
- Live data synchronization
- Push notifications for important updates
- Real-time zone monitoring

## Project Structure

\`\`\`
src/
├── components/          # Reusable components
├── screens/            # Screen components
│   ├── driver/         # Driver role screens
│   └── admin/          # Admin role screens
├── navigation/         # Navigation configuration
├── services/           # Firebase and API services
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
\`\`\`

## Firebase Collections

- `users` - User profiles and roles
- `attendance` - Attendance records
- `assignments` - Pickup assignments
- `vehicles` - Vehicle information
- `messages` - Internal messaging
- `requests` - Approval requests
- `zones` - Zone configuration
- `feeder_points` - Feeder point data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
