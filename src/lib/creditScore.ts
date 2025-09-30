import { CreditScore, CommunityConnection } from '@/types'

// Mock credit score service - in production, this would connect to your backend
class CreditScoreService {
  private creditScores: CreditScore[] = []
  private communityConnections: CommunityConnection[] = []

  async getCreditScore(userId: string): Promise<CreditScore> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let creditScore = this.creditScores.find(cs => cs.userId === userId)
    if (!creditScore) {
      creditScore = await this.calculateInitialScore(userId)
      this.creditScores.push(creditScore)
    }
    
    return creditScore
  }

  async updateScore(userId: string, transactionData: any): Promise<CreditScore> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const creditScore = await this.getCreditScore(userId)
    
    // Update factors based on transaction
    if (transactionData.type === 'transfer' && transactionData.status === 'completed') {
      creditScore.factors.paymentHistory = Math.min(creditScore.factors.paymentHistory + 5, 100)
      creditScore.factors.transactionPatterns = Math.min(creditScore.factors.transactionPatterns + 3, 100)
    }
    
    // Recalculate scores
    creditScore.traditionalScore = this.calculateTraditionalScore(creditScore.factors)
    creditScore.communityScore = this.calculateCommunityScore(userId, creditScore.factors)
    creditScore.behaviorScore = this.calculateBehaviorScore(creditScore.factors)
    creditScore.finalScore = this.calculateFinalScore(creditScore)
    creditScore.lastUpdated = new Date()
    
    return creditScore
  }

  async addCommunityConnection(fromUserId: string, toUserId: string, trustLevel: number): Promise<CommunityConnection> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const connection: CommunityConnection = {
      id: this.generateId(),
      fromUserId,
      toUserId,
      trustLevel,
      endorsementCount: 0,
      isVerified: false,
      createdAt: new Date()
    }
    
    this.communityConnections.push(connection)
    
    // Update community scores for both users
    await this.updateScore(fromUserId, { type: 'community_connection' })
    await this.updateScore(toUserId, { type: 'community_connection' })
    
    return connection
  }

  async endorseUser(fromUserId: string, toUserId: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const connection = this.communityConnections.find(
      c => c.fromUserId === fromUserId && c.toUserId === toUserId
    )
    
    if (connection) {
      connection.endorsementCount += 1
      connection.trustLevel = Math.min(connection.trustLevel + 5, 100)
    }
    
    // Update scores
    await this.updateScore(toUserId, { type: 'endorsement' })
  }

  private async calculateInitialScore(userId: string): Promise<CreditScore> {
    // Simulate initial score calculation
    const factors = {
      paymentHistory: 50 + Math.random() * 30,
      creditUtilization: 60 + Math.random() * 25,
      creditHistory: 40 + Math.random() * 40,
      communityTrust: 30 + Math.random() * 20,
      socialConnections: 20 + Math.random() * 30,
      transactionPatterns: 50 + Math.random() * 30
    }
    
    const traditionalScore = this.calculateTraditionalScore(factors)
    const communityScore = this.calculateCommunityScore(userId, factors)
    const behaviorScore = this.calculateBehaviorScore(factors)
    
    return {
      id: this.generateId(),
      userId,
      traditionalScore,
      communityScore,
      behaviorScore,
      finalScore: this.calculateFinalScore({
        traditionalScore,
        communityScore,
        behaviorScore,
        factors
      }),
      lastUpdated: new Date(),
      factors
    }
  }

  private calculateTraditionalScore(factors: any): number {
    const weights = {
      paymentHistory: 0.35,
      creditUtilization: 0.30,
      creditHistory: 0.35
    }
    
    return Math.round(
      factors.paymentHistory * weights.paymentHistory +
      factors.creditUtilization * weights.creditUtilization +
      factors.creditHistory * weights.creditHistory
    )
  }

  private calculateCommunityScore(userId: string, factors: any): number {
    const connections = this.communityConnections.filter(c => c.toUserId === userId)
    const avgTrust = connections.length > 0 
      ? connections.reduce((sum, c) => sum + c.trustLevel, 0) / connections.length 
      : 0
    
    return Math.round(
      (factors.communityTrust * 0.4) +
      (factors.socialConnections * 0.3) +
      (avgTrust * 0.3)
    )
  }

  private calculateBehaviorScore(factors: any): number {
    return Math.round(
      (factors.transactionPatterns * 0.6) +
      (factors.paymentHistory * 0.4)
    )
  }

  private calculateFinalScore(creditScore: any): number {
    const weights = {
      traditional: 0.4,
      community: 0.35,
      behavior: 0.25
    }
    
    return Math.round(
      creditScore.traditionalScore * weights.traditional +
      creditScore.communityScore * weights.community +
      creditScore.behaviorScore * weights.behavior
    )
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

export const creditScoreService = new CreditScoreService()
