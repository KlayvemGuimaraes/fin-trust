import { QITechResponse } from '@/types'

// QI Tech API integration service
class QITechApiService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_QI_TECH_API_URL || 'https://api.qitech.com.br'
    this.apiKey = process.env.NEXT_PUBLIC_QI_TECH_API_KEY || ''
  }

  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<QITechResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Key': this.apiKey,
      }

      const config: RequestInit = {
        method,
        headers,
      }

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data)
      }

      const response = await fetch(url, config)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Erro na API QI Tech')
      }

      return {
        success: true,
        data: result.data || result,
        message: result.message
      }
    } catch (error: any) {
      return {
        success: false,
        data: undefined as T,
        message: error.message || 'Erro de conexão com QI Tech'
      }
    }
  }

  // Identity verification
  async verifyIdentity(cpf: string, name: string, birthDate: string): Promise<QITechResponse<any>> {
    return this.makeRequest('/identity/verify', 'POST', {
      cpf,
      name,
      birthDate
    })
  }

  // Credit score from traditional sources
  async getTraditionalCreditScore(cpf: string): Promise<QITechResponse<{
    score: number
    source: string
    lastUpdated: string
    factors: Array<{
      name: string
      value: number
      weight: number
    }>
  }>> {
    return this.makeRequest('/credit-score/traditional', 'POST', { cpf })
  }

  // Bank account verification
  async verifyBankAccount(
    bankCode: string, 
    agency: string, 
    account: string, 
    accountType: string
  ): Promise<QITechResponse<{
    verified: boolean
    bankName: string
    accountHolder: string
  }>> {
    return this.makeRequest('/bank-account/verify', 'POST', {
      bankCode,
      agency,
      account,
      accountType
    })
  }

  // Document validation
  async validateDocument(documentType: string, documentData: string): Promise<QITechResponse<{
    valid: boolean
    extractedData: any
    confidence: number
  }>> {
    return this.makeRequest('/documents/validate', 'POST', {
      documentType,
      documentData
    })
  }

  // Risk assessment
  async assessRisk(userData: {
    cpf: string
    income: number
    employmentStatus: string
    address: string
  }): Promise<QITechResponse<{
    riskLevel: 'low' | 'medium' | 'high'
    riskScore: number
    factors: Array<{
      name: string
      impact: number
      description: string
    }>
  }>> {
    return this.makeRequest('/risk/assess', 'POST', userData)
  }

  // Transaction monitoring
  async monitorTransaction(transactionData: {
    amount: number
    type: string
    userId: string
    location?: {
      lat: number
      lng: number
    }
    deviceInfo?: any
  }): Promise<QITechResponse<{
    approved: boolean
    riskScore: number
    reasons: string[]
    requiresAdditionalVerification: boolean
  }>> {
    return this.makeRequest('/transactions/monitor', 'POST', transactionData)
  }

  // KYC (Know Your Customer) process
  async performKYC(userData: {
    cpf: string
    name: string
    email: string
    phone: string
    address: string
    documents: Array<{
      type: string
      data: string
    }>
  }): Promise<QITechResponse<{
    kycStatus: 'pending' | 'approved' | 'rejected'
    verificationLevel: number
    requiredDocuments: string[]
    nextSteps: string[]
  }>> {
    return this.makeRequest('/kyc/process', 'POST', userData)
  }

  // Credit limit calculation
  async calculateCreditLimit(userData: {
    cpf: string
    income: number
    expenses: number
    creditHistory: any
  }): Promise<QITechResponse<{
    suggestedLimit: number
    maxLimit: number
    factors: Array<{
      name: string
      impact: number
      description: string
    }>
  }>> {
    return this.makeRequest('/credit/limit-calculation', 'POST', userData)
  }

  // Fraud detection
  async detectFraud(transactionData: {
    userId: string
    amount: number
    type: string
    location?: any
    deviceInfo?: any
    historicalData?: any
  }): Promise<QITechResponse<{
    isFraud: boolean
    confidence: number
    riskFactors: Array<{
      name: string
      score: number
      description: string
    }>
    recommendation: 'approve' | 'review' | 'block'
  }>> {
    return this.makeRequest('/fraud/detect', 'POST', transactionData)
  }

  // Compliance check
  async checkCompliance(userData: {
    cpf: string
    name: string
    address: string
  }): Promise<QITechResponse<{
    compliant: boolean
    sanctions: any[]
    pep: boolean
    adverseMedia: any[]
  }>> {
    return this.makeRequest('/compliance/check', 'POST', userData)
  }

  // Get user financial profile
  async getFinancialProfile(cpf: string): Promise<QITechResponse<{
    creditScore: number
    income: number
    expenses: number
    assets: number
    liabilities: number
    paymentHistory: Array<{
      date: string
      amount: number
      status: string
    }>
  }>> {
    return this.makeRequest('/profile/financial', 'POST', { cpf })
  }

  // Mock methods for demo (when API key is not available)
  private async mockRequest<T>(data: any, delay: number = 1000): Promise<QITechResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Simulate API response
    return {
      success: true,
      data: data,
      message: 'Mock response for demo'
    }
  }

  // Mock identity verification
  async mockVerifyIdentity(cpf: string, name: string, birthDate: string): Promise<QITechResponse<any>> {
    return this.mockRequest({
      verified: true,
      confidence: 0.95,
      source: 'CPF Database',
      lastVerified: new Date().toISOString()
    })
  }

  // Mock credit score
  async mockGetTraditionalCreditScore(cpf: string): Promise<QITechResponse<any>> {
    return this.mockRequest({
      score: 650 + Math.random() * 200,
      source: 'SPC/Serasa',
      lastUpdated: new Date().toISOString(),
      factors: [
        { name: 'Payment History', value: 0.8, weight: 0.35 },
        { name: 'Credit Utilization', value: 0.6, weight: 0.30 },
        { name: 'Credit History Length', value: 0.7, weight: 0.15 },
        { name: 'Recent Inquiries', value: 0.9, weight: 0.10 },
        { name: 'Credit Mix', value: 0.5, weight: 0.10 }
      ]
    })
  }

  // Mock fraud detection
  async mockDetectFraud(transactionData: any): Promise<QITechResponse<any>> {
    const riskScore = Math.random() * 100
    return this.mockRequest({
      isFraud: riskScore > 80,
      confidence: riskScore / 100,
      riskFactors: [
        { name: 'Transaction Amount', score: transactionData.amount > 5000 ? 70 : 20, description: 'Amount analysis' },
        { name: 'Time Pattern', score: 30, description: 'Time-based analysis' },
        { name: 'Location', score: 25, description: 'Geographic analysis' },
        { name: 'Device', score: 15, description: 'Device fingerprinting' }
      ],
      recommendation: riskScore > 80 ? 'block' : riskScore > 50 ? 'review' : 'approve'
    })
  }
}

export const qiTechApiService = new QITechApiService()
