export interface Worker {
  id: string
  name: string
  employeeId: string
  status: "pending" | "present" | "absent" | "reliever" | "no_collection"
  wasteCollected?: {
    type: "wet" | "dry" | "recyclable" | "mixed" | "hazardous"
    quantity: number
    unit: "kg" | "bags"
  }
  photo?: string | null
  timestamp?: string
  relieverInfo?: {
    name: string
    employeeId?: string
    type: "registered" | "unregistered"
  }
  notes?: string
}

export interface FeederPoint {
  id: string
  name: string
  address: string
  zone: string
  ward: string
  scheduledTime: string
  status: "pending" | "in-progress" | "completed"
  totalWorkers: number
  completedWorkers: number
  estimatedWaste: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface DriverInfo {
  id: string
  name: string
  vehicleNumber: string
  zone: string
  ward: string
  route: string
}

export type WasteType = "wet" | "dry" | "recyclable" | "mixed" | "hazardous"

export interface WasteBreakdown {
  wet: number
  dry: number
  recyclable: number
  mixed: number
  hazardous: number
}
