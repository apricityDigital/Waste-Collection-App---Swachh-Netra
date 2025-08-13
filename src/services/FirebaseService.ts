import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { db } from "../../App"

interface Location {
  latitude: number
  longitude: number
}

interface TripData {
  vehicleNumber: string
  startLocation: Location
}

interface EndTripData {
  endLocation: Location
}

interface PunchData {
  photo: string
  location: Location
  vehicleNumber: string
  name: string
}

interface WorkerAttendance {
  workerId: string
  status: "present" | "absent" | "reliever" | "no_collection"
  relieverName?: string
  wasteCollected?: number
  wasteType?: string
  proof?: string
}

export class FirebaseService {
  private ensureFirestore() {
    if (!db) {
      throw new Error("Firestore is not initialized. Please check your Firebase configuration.")
    }
    return db
  }

  // Driver Authentication and Profile
  async getDriverProfile(driverId: string) {
    try {
      const firestore = this.ensureFirestore()
      const driverDoc = await getDoc(doc(firestore, "drivers", driverId))

      if (driverDoc.exists()) {
        return { id: driverDoc.id, ...driverDoc.data() }
      }
      return null
    } catch (error) {
      console.error("Error getting driver profile:", error)
      throw error
    }
  }

  async updateDriverProfile(driverId: string, profileData: any) {
    try {
      const firestore = this.ensureFirestore()
      await updateDoc(doc(firestore, "drivers", driverId), {
        ...profileData,
        updatedAt: Timestamp.now(),
      })
      return true
    } catch (error) {
      console.error("Error updating driver profile:", error)
      throw error
    }
  }

  // Driver Punch In/Out System
  async punchIn(driverId: string, punchData: PunchData) {
    try {
      const firestore = this.ensureFirestore()
      const attendanceData = {
        driverId,
        type: "punch_in",
        timestamp: Timestamp.now(),
        photo: punchData.photo,
        location: punchData.location,
        vehicleNumber: punchData.vehicleNumber,
        name: punchData.name,
        date: new Date().toISOString().split("T")[0],
      }

      await addDoc(collection(firestore, "driver_attendance"), attendanceData)

      // Update driver status
      await updateDoc(doc(firestore, "drivers", driverId), {
        status: "active",
        lastPunchIn: Timestamp.now(),
        currentVehicle: punchData.vehicleNumber,
      })

      return attendanceData
    } catch (error) {
      console.error("Error punching in:", error)
      throw error
    }
  }

  async punchOut(driverId: string, punchData: PunchData) {
    try {
      const firestore = this.ensureFirestore()
      const attendanceData = {
        driverId,
        type: "punch_out",
        timestamp: Timestamp.now(),
        photo: punchData.photo,
        location: punchData.location,
        vehicleNumber: punchData.vehicleNumber,
        name: punchData.name,
        date: new Date().toISOString().split("T")[0],
      }

      await addDoc(collection(firestore, "driver_attendance"), attendanceData)

      // Update driver status
      await updateDoc(doc(firestore, "drivers", driverId), {
        status: "inactive",
        lastPunchOut: Timestamp.now(),
      })

      return attendanceData
    } catch (error) {
      console.error("Error punching out:", error)
      throw error
    }
  }

  async getDriverPunchStatus(driverId: string) {
    try {
      const firestore = this.ensureFirestore()
      const today = new Date().toISOString().split("T")[0]

      const q = query(
        collection(firestore, "driver_attendance"),
        where("driverId", "==", driverId),
        where("date", "==", today),
        orderBy("timestamp", "desc"),
        limit(1),
      )

      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const lastPunch = querySnapshot.docs[0].data()
        return {
          isPunchedIn: lastPunch.type === "punch_in",
          lastPunch: lastPunch,
        }
      }

      return { isPunchedIn: false, lastPunch: null }
    } catch (error) {
      console.error("Error getting punch status:", error)
      return { isPunchedIn: false, lastPunch: null }
    }
  }

  // Trip Management
  async startDriverTrip(driverId: string, tripData: TripData) {
    try {
      const firestore = this.ensureFirestore()
      const trip = {
        driverId,
        vehicleNumber: tripData.vehicleNumber,
        startLocation: tripData.startLocation,
        startTime: Timestamp.now(),
        status: "in_progress",
        totalDistance: 0,
        duration: 0,
        feederPointsVisited: 0,
        totalWasteCollected: 0,
        date: new Date().toISOString().split("T")[0],
      }

      const tripRef = await addDoc(collection(firestore, "driver_trips"), trip)

      // Update driver status
      await updateDoc(doc(firestore, "drivers", driverId), {
        currentTripId: tripRef.id,
        status: "on_trip",
      })

      return { id: tripRef.id, ...trip }
    } catch (error) {
      console.error("Error starting trip:", error)
      throw error
    }
  }

  async endDriverTrip(tripId: string, endData: EndTripData) {
    try {
      const firestore = this.ensureFirestore()
      const tripRef = doc(firestore, "driver_trips", tripId)
      const tripDoc = await getDoc(tripRef)

      if (!tripDoc.exists()) {
        throw new Error("Trip not found")
      }

      const tripData = tripDoc.data()
      const endTime = Timestamp.now()
      const duration = Math.floor((endTime.toMillis() - tripData.startTime.toMillis()) / (1000 * 60)) // minutes

      await updateDoc(tripRef, {
        endLocation: endData.endLocation,
        endTime,
        duration,
        status: "completed",
      })

      // Update driver status
      await updateDoc(doc(firestore, "drivers", tripData.driverId), {
        currentTripId: null,
        status: "active",
        lastTripCompleted: endTime,
      })

      return true
    } catch (error) {
      console.error("Error ending trip:", error)
      throw error
    }
  }

  async getCurrentDriverTrip(driverId: string) {
    try {
      const firestore = this.ensureFirestore()
      const q = query(
        collection(firestore, "driver_trips"),
        where("driverId", "==", driverId),
        where("status", "==", "in_progress"),
        limit(1),
      )

      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const tripDoc = querySnapshot.docs[0]
        return { id: tripDoc.id, ...tripDoc.data() }
      }

      return null
    } catch (error) {
      console.error("Error getting current trip:", error)
      return null
    }
  }

  // Feeder Point Management
  async getDriverFeederPoints(driverId: string) {
    try {
      const firestore = this.ensureFirestore()
      const q = query(
        collection(firestore, "driver_assignments"),
        where("driverId", "==", driverId),
        where("status", "==", "active"),
      )

      const querySnapshot = await getDocs(q)
      const assignments = []

      for (const doc of querySnapshot.docs) {
        const assignment = { id: doc.id, ...doc.data() }

        // Get feeder point details
        const feederPointDoc = await getDoc(doc(firestore, "feeder_points", assignment.feederPointId))
        if (feederPointDoc.exists()) {
          assignment.feederPoint = { id: feederPointDoc.id, ...feederPointDoc.data() }
        }

        // Get assigned workers count
        const workersQuery = query(
          collection(firestore, "worker_assignments"),
          where("feederPointId", "==", assignment.feederPointId),
          where("status", "==", "active"),
        )
        const workersSnapshot = await getDocs(workersQuery)
        assignment.totalWorkers = workersSnapshot.size

        assignments.push(assignment)
      }

      return assignments
    } catch (error) {
      console.error("Error getting driver feeder points:", error)
      return []
    }
  }

  async getFeederPointWorkers(feederPointId: string) {
    try {
      const firestore = this.ensureFirestore()
      const q = query(
        collection(firestore, "worker_assignments"),
        where("feederPointId", "==", feederPointId),
        where("status", "==", "active"),
      )

      const querySnapshot = await getDocs(q)
      const workers = []

      for (const doc of querySnapshot.docs) {
        const assignment = { id: doc.id, ...doc.data() }

        // Get worker details
        const workerDoc = await getDoc(doc(firestore, "workers", assignment.workerId))
        if (workerDoc.exists()) {
          assignment.worker = { id: workerDoc.id, ...workerDoc.data() }
        }

        workers.push(assignment)
      }

      return workers
    } catch (error) {
      console.error("Error getting feeder point workers:", error)
      return []
    }
  }

  // Worker Attendance Management
  async markWorkerAttendance(feederPointId: string, driverId: string, attendanceData: WorkerAttendance[]) {
    try {
      const firestore = this.ensureFirestore()
      const batch = writeBatch(firestore)
      const today = new Date().toISOString().split("T")[0]

      for (const attendance of attendanceData) {
        const attendanceRecord = {
          workerId: attendance.workerId,
          feederPointId,
          driverId,
          status: attendance.status,
          relieverName: attendance.relieverName || null,
          wasteCollected: attendance.wasteCollected || 0,
          wasteType: attendance.wasteType || null,
          proof: attendance.proof || null,
          timestamp: Timestamp.now(),
          date: today,
        }

        const attendanceRef = doc(collection(firestore, "worker_attendance"))
        batch.set(attendanceRef, attendanceRecord)
      }

      await batch.commit()
      return true
    } catch (error) {
      console.error("Error marking worker attendance:", error)
      throw error
    }
  }

  async getWorkerAttendanceHistory(workerId: string, days = 7) {
    try {
      const firestore = this.ensureFirestore()
      const endDate = new Date()
      const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)

      const q = query(
        collection(firestore, "worker_attendance"),
        where("workerId", "==", workerId),
        where("timestamp", ">=", Timestamp.fromDate(startDate)),
        where("timestamp", "<=", Timestamp.fromDate(endDate)),
        orderBy("timestamp", "desc"),
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting worker attendance history:", error)
      return []
    }
  }

  // Waste Collection Management
  async recordWasteCollection(feederPointId: string, driverId: string, wasteData: any) {
    try {
      const firestore = this.ensureFirestore()
      const wasteRecord = {
        feederPointId,
        driverId,
        ...wasteData,
        timestamp: Timestamp.now(),
        date: new Date().toISOString().split("T")[0],
      }

      await addDoc(collection(firestore, "waste_collections"), wasteRecord)
      return wasteRecord
    } catch (error) {
      console.error("Error recording waste collection:", error)
      throw error
    }
  }

  async getWasteCollectionSummary(driverId: string, date?: string) {
    try {
      const firestore = this.ensureFirestore()
      const targetDate = date || new Date().toISOString().split("T")[0]

      const q = query(
        collection(firestore, "waste_collections"),
        where("driverId", "==", driverId),
        where("date", "==", targetDate),
      )

      const querySnapshot = await getDocs(q)
      let totalWaste = 0
      const wasteByType: Record<string, number> = {}

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data()
        totalWaste += data.totalWeight || 0

        if (data.wasteBreakdown) {
          Object.entries(data.wasteBreakdown).forEach(([type, weight]) => {
            wasteByType[type] = (wasteByType[type] || 0) + (weight as number)
          })
        }
      })

      return {
        totalWaste,
        wasteByType,
        collections: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      }
    } catch (error) {
      console.error("Error getting waste collection summary:", error)
      return { totalWaste: 0, wasteByType: {}, collections: [] }
    }
  }

  // Driver Statistics and Reports
  async getDriverDailySummary(driverId: string, date?: string) {
    try {
      const firestore = this.ensureFirestore()
      const targetDate = date || new Date().toISOString().split("T")[0]

      // Get trips for the day
      const tripsQuery = query(
        collection(firestore, "driver_trips"),
        where("driverId", "==", driverId),
        where("date", "==", targetDate),
      )
      const tripsSnapshot = await getDocs(tripsQuery)

      // Get waste collections for the day
      const wasteQuery = query(
        collection(firestore, "waste_collections"),
        where("driverId", "==", driverId),
        where("date", "==", targetDate),
      )
      const wasteSnapshot = await getDocs(wasteQuery)

      let totalDistance = 0
      let totalDuration = 0
      let totalFeederPoints = 0
      let totalWasteCollected = 0

      tripsSnapshot.docs.forEach((doc) => {
        const trip = doc.data()
        totalDistance += trip.totalDistance || 0
        totalDuration += trip.duration || 0
        totalFeederPoints += trip.feederPointsVisited || 0
      })

      wasteSnapshot.docs.forEach((doc) => {
        const waste = doc.data()
        totalWasteCollected += waste.totalWeight || 0
      })

      return {
        totalTrips: tripsSnapshot.size,
        totalDistance,
        totalDuration,
        totalFeederPoints,
        totalWasteCollected,
        date: targetDate,
      }
    } catch (error) {
      console.error("Error getting driver daily summary:", error)
      return {
        totalTrips: 0,
        totalDistance: 0,
        totalDuration: 0,
        totalFeederPoints: 0,
        totalWasteCollected: 0,
        date: date || new Date().toISOString().split("T")[0],
      }
    }
  }

  async getDriverPerformanceStats(driverId: string, days = 30) {
    try {
      const firestore = this.ensureFirestore()
      const endDate = new Date()
      const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)

      const q = query(
        collection(firestore, "driver_trips"),
        where("driverId", "==", driverId),
        where("startTime", ">=", Timestamp.fromDate(startDate)),
        where("startTime", "<=", Timestamp.fromDate(endDate)),
      )

      const querySnapshot = await getDocs(q)
      const trips = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      const stats = {
        totalTrips: trips.length,
        completedTrips: trips.filter((trip) => trip.status === "completed").length,
        totalDistance: trips.reduce((sum, trip) => sum + (trip.totalDistance || 0), 0),
        totalDuration: trips.reduce((sum, trip) => sum + (trip.duration || 0), 0),
        averageTripsPerDay: trips.length / days,
        punctualityScore: this.calculatePunctualityScore(trips),
      }

      return stats
    } catch (error) {
      console.error("Error getting driver performance stats:", error)
      return {
        totalTrips: 0,
        completedTrips: 0,
        totalDistance: 0,
        totalDuration: 0,
        averageTripsPerDay: 0,
        punctualityScore: 0,
      }
    }
  }

  private calculatePunctualityScore(trips: any[]): number {
    if (trips.length === 0) return 0

    const onTimeTrips = trips.filter((trip) => {
      // Simple punctuality calculation - can be enhanced based on requirements
      return trip.status === "completed" && trip.duration <= 480 // 8 hours
    })

    return Math.round((onTimeTrips.length / trips.length) * 100)
  }

  // Utility Methods
  async testConnection() {
    try {
      const firestore = this.ensureFirestore()
      const testDoc = doc(firestore, "test", "connection-test")
      await setDoc(testDoc, {
        timestamp: Timestamp.now(),
        message: "Connection test successful",
      })
      return { success: true, message: "Firebase connection successful" }
    } catch (error) {
      console.error("Firebase connection test failed:", error)
      return { success: false, message: error.message }
    }
  }
}

// Create and export a singleton instance
export const firebaseService = new FirebaseService()
