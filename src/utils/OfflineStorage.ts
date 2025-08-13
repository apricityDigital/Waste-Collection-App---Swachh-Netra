import AsyncStorage from "@react-native-async-storage/async-storage"

export class OfflineStorage {
  private static readonly KEYS = {
    ATTENDANCE: "offline_attendance",
    QR_SCANS: "offline_qr_scans",
    PHOTOS: "offline_photos",
    WORKER_ATTENDANCE: "offline_worker_attendance",
    WASTE_LOGS: "offline_waste_logs",
  }

  // Store data offline
  static async storeData(key: string, data: any) {
    try {
      const existingData = await this.getData(key)
      const updatedData = [...existingData, { ...data, timestamp: Date.now() }]
      await AsyncStorage.setItem(key, JSON.stringify(updatedData))
    } catch (error) {
      console.error("Error storing offline data:", error)
    }
  }

  // Get stored data
  static async getData(key: string) {
    try {
      const data = await AsyncStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error getting offline data:", error)
      return []
    }
  }

  // Clear specific data
  static async clearData(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error("Error clearing offline data:", error)
    }
  }

  // Sync offline data when online
  static async syncOfflineData() {
    try {
      const attendanceData = await this.getData(this.KEYS.ATTENDANCE)
      const qrScans = await this.getData(this.KEYS.QR_SCANS)
      const workerAttendance = await this.getData(this.KEYS.WORKER_ATTENDANCE)
      const wasteLogs = await this.getData(this.KEYS.WASTE_LOGS)

      // Sync attendance data
      for (const attendance of attendanceData) {
        // Upload to Firebase
        // await FirebaseService.markAttendance(attendance);
      }

      // Sync other data types...

      // Clear synced data
      await this.clearData(this.KEYS.ATTENDANCE)
      await this.clearData(this.KEYS.QR_SCANS)
      await this.clearData(this.KEYS.WORKER_ATTENDANCE)
      await this.clearData(this.KEYS.WASTE_LOGS)

      return true
    } catch (error) {
      console.error("Error syncing offline data:", error)
      return false
    }
  }

  // Check if device is online
  static async isOnline() {
    // This would typically use NetInfo
    return true // Simplified for demo
  }
}
