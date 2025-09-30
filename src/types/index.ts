export interface User {
  id: string
  email: string
  name: string
  phone: string
  cpf: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  biometricEnabled: boolean
  twoFactorEnabled: boolean
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  fromUserId: string
  toUserId: string
  amount: number
  description: string
  type: 'transfer' | 'payment' | 'deposit' | 'withdrawal'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  fraudScore?: number
  location?: {
    lat: number
    lng: number
    address: string
  }
  deviceInfo?: {
    fingerprint: string
    userAgent: string
    ip: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface CreditScore {
  id: string
  userId: string
  traditionalScore: number
  communityScore: number
  behaviorScore: number
  finalScore: number
  lastUpdated: Date
  factors: {
    paymentHistory: number
    creditUtilization: number
    creditHistory: number
    communityTrust: number
    socialConnections: number
    transactionPatterns: number
  }
}

export interface CommunityConnection {
  id: string
  fromUserId: string
  toUserId: string
  trustLevel: number
  endorsementCount: number
  isVerified: boolean
  createdAt: Date
}

export interface FraudAlert {
  id: string
  userId: string
  transactionId?: string
  type: 'suspicious_transaction' | 'unusual_location' | 'device_change' | 'pattern_anomaly'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  isResolved: boolean
  createdAt: Date
  resolvedAt?: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LoginRequest {
  email: string
  password: string
  biometricData?: string
  twoFactorCode?: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  cpf: string
  password: string
  biometricData?: string
}

export interface TransferRequest {
  toUserId: string
  amount: number
  description: string
  biometricConfirmation?: string
}

export interface QITechResponse {
  success: boolean
  data: any
  message?: string
}
