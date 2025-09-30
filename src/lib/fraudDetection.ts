import { Transaction, FraudAlert } from '@/types'

// Mock fraud detection service - in production, this would use ML models
class FraudDetectionService {
  private alerts: FraudAlert[] = []

  async analyzeTransaction(transaction: Transaction): Promise<{
    riskScore: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    factors: Array<{ name: string; score: number; description: string }>
    recommendation: 'approve' | 'review' | 'block'
  }> {
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const factors = this.calculateRiskFactors(transaction)
    const riskScore = this.calculateRiskScore(factors)
    const riskLevel = this.getRiskLevel(riskScore)
    const recommendation = this.getRecommendation(riskScore, factors)
    
    return {
      riskScore,
      riskLevel,
      factors,
      recommendation
    }
  }

  async detectAnomalies(userId: string): Promise<FraudAlert[]> {
    // Simulate anomaly detection
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const userAlerts = this.alerts.filter(alert => alert.userId === userId)
    return userAlerts
  }

  async createAlert(alert: Omit<FraudAlert, 'id' | 'createdAt'>): Promise<FraudAlert> {
    const newAlert: FraudAlert = {
      id: this.generateId(),
      ...alert,
      createdAt: new Date()
    }
    
    this.alerts.push(newAlert)
    return newAlert
  }

  async resolveAlert(alertId: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.isResolved = true
      alert.resolvedAt = new Date()
    }
  }

  private calculateRiskFactors(transaction: Transaction): Array<{ name: string; score: number; description: string }> {
    const factors = []
    
    // Amount-based risk
    if (transaction.amount > 10000) {
      factors.push({
        name: 'Valor Alto',
        score: 80,
        description: 'Transação acima de R$ 10.000'
      })
    } else if (transaction.amount > 5000) {
      factors.push({
        name: 'Valor Moderado',
        score: 40,
        description: 'Transação acima de R$ 5.000'
      })
    } else {
      factors.push({
        name: 'Valor Baixo',
        score: 10,
        description: 'Transação abaixo de R$ 5.000'
      })
    }
    
    // Time-based risk
    const hour = new Date().getHours()
    if (hour >= 0 && hour <= 6) {
      factors.push({
        name: 'Horário Suspeito',
        score: 60,
        description: 'Transação em horário noturno (00:00-06:00)'
      })
    } else if (hour >= 22 || hour <= 8) {
      factors.push({
        name: 'Horário Atípico',
        score: 30,
        description: 'Transação fora do horário comercial'
      })
    } else {
      factors.push({
        name: 'Horário Normal',
        score: 5,
        description: 'Transação em horário comercial'
      })
    }
    
    // Location-based risk (simulated)
    if (transaction.location) {
      // Simulate location risk based on coordinates
      const isUnusualLocation = Math.random() > 0.8
      if (isUnusualLocation) {
        factors.push({
          name: 'Localização Atípica',
          score: 70,
          description: 'Transação de localização não usual'
        })
      } else {
        factors.push({
          name: 'Localização Conhecida',
          score: 15,
          description: 'Transação de localização conhecida'
        })
      }
    }
    
    // Device-based risk
    if (transaction.deviceInfo) {
      const isNewDevice = Math.random() > 0.7
      if (isNewDevice) {
        factors.push({
          name: 'Dispositivo Novo',
          score: 50,
          description: 'Transação de dispositivo não reconhecido'
        })
      } else {
        factors.push({
          name: 'Dispositivo Conhecido',
          score: 10,
          description: 'Transação de dispositivo reconhecido'
        })
      }
    }
    
    // Pattern-based risk
    const isUnusualPattern = Math.random() > 0.6
    if (isUnusualPattern) {
      factors.push({
        name: 'Padrão Atípico',
        score: 45,
        description: 'Comportamento de transação atípico'
      })
    } else {
      factors.push({
        name: 'Padrão Normal',
        score: 20,
        description: 'Comportamento de transação normal'
      })
    }
    
    return factors
  }

  private calculateRiskScore(factors: Array<{ name: string; score: number; description: string }>): number {
    // Weighted average of risk factors
    const weights = {
      'Valor Alto': 0.3,
      'Valor Moderado': 0.2,
      'Valor Baixo': 0.1,
      'Horário Suspeito': 0.2,
      'Horário Atípico': 0.1,
      'Horário Normal': 0.05,
      'Localização Atípica': 0.25,
      'Localização Conhecida': 0.1,
      'Dispositivo Novo': 0.2,
      'Dispositivo Conhecido': 0.05,
      'Padrão Atípico': 0.15,
      'Padrão Normal': 0.1
    }
    
    let totalScore = 0
    let totalWeight = 0
    
    factors.forEach(factor => {
      const weight = weights[factor.name as keyof typeof weights] || 0.1
      totalScore += factor.score * weight
      totalWeight += weight
    })
    
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0
  }

  private getRiskLevel(riskScore: number): 'low' | 'medium' | 'high' | 'critical' {
    if (riskScore >= 80) return 'critical'
    if (riskScore >= 60) return 'high'
    if (riskScore >= 30) return 'medium'
    return 'low'
  }

  private getRecommendation(
    riskScore: number, 
    factors: Array<{ name: string; score: number; description: string }>
  ): 'approve' | 'review' | 'block' {
    if (riskScore >= 80) return 'block'
    if (riskScore >= 50) return 'review'
    return 'approve'
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  // Real-time monitoring methods
  async startRealTimeMonitoring(userId: string): Promise<void> {
    // In production, this would set up WebSocket connections
    // and real-time ML model inference
    console.log(`Starting real-time fraud monitoring for user ${userId}`)
  }

  async stopRealTimeMonitoring(userId: string): Promise<void> {
    console.log(`Stopping real-time fraud monitoring for user ${userId}`)
  }

  // Batch analysis for historical data
  async analyzeBatchTransactions(transactions: Transaction[]): Promise<{
    suspiciousTransactions: Transaction[]
    riskSummary: {
      totalTransactions: number
      suspiciousCount: number
      averageRiskScore: number
    }
  }> {
    const suspiciousTransactions = []
    let totalRiskScore = 0
    
    for (const transaction of transactions) {
      const analysis = await this.analyzeTransaction(transaction)
      totalRiskScore += analysis.riskScore
      
      if (analysis.recommendation === 'block' || analysis.recommendation === 'review') {
        suspiciousTransactions.push(transaction)
      }
    }
    
    return {
      suspiciousTransactions,
      riskSummary: {
        totalTransactions: transactions.length,
        suspiciousCount: suspiciousTransactions.length,
        averageRiskScore: transactions.length > 0 ? totalRiskScore / transactions.length : 0
      }
    }
  }
}

export const fraudDetectionService = new FraudDetectionService()
