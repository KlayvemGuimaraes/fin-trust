import { Wallet, Transaction, TransferRequest } from '@/types'

// Mock wallet service - in production, this would connect to your backend
class WalletService {
  private wallets: Wallet[] = []
  private transactions: Transaction[] = []

  async getWallet(userId: string): Promise<Wallet> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let wallet = this.wallets.find(w => w.userId === userId)
    if (!wallet) {
      wallet = {
        id: this.generateId(),
        userId,
        balance: 1000, // Starting balance for demo
        currency: 'BRL',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.wallets.push(wallet)
    }
    
    return wallet
  }

  async getTransactions(userId: string, limit: number = 10): Promise<Transaction[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return this.transactions
      .filter(t => t.fromUserId === userId || t.toUserId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
  }

  async transfer(request: TransferRequest, fromUserId: string): Promise<Transaction> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const fromWallet = await this.getWallet(fromUserId)
    const toWallet = await this.getWallet(request.toUserId)
    
    if (fromWallet.balance < request.amount) {
      throw new Error('Saldo insuficiente')
    }
    
    // Simulate fraud detection
    const fraudScore = this.calculateFraudScore(request, fromUserId)
    if (fraudScore > 80) {
      throw new Error('Transação bloqueada por suspeita de fraude')
    }
    
    // Update balances
    fromWallet.balance -= request.amount
    toWallet.balance += request.amount
    fromWallet.updatedAt = new Date()
    toWallet.updatedAt = new Date()
    
    // Create transaction
    const transaction: Transaction = {
      id: this.generateId(),
      fromUserId,
      toUserId: request.toUserId,
      amount: request.amount,
      description: request.description,
      type: 'transfer',
      status: 'completed',
      fraudScore,
      location: {
        lat: -23.5505,
        lng: -46.6333,
        address: 'São Paulo, SP, Brasil'
      },
      deviceInfo: {
        fingerprint: 'device_fingerprint_123',
        userAgent: navigator.userAgent,
        ip: '192.168.1.1'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.transactions.push(transaction)
    return transaction
  }

  async deposit(userId: string, amount: number): Promise<Transaction> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const wallet = await this.getWallet(userId)
    wallet.balance += amount
    wallet.updatedAt = new Date()
    
    const transaction: Transaction = {
      id: this.generateId(),
      fromUserId: 'system',
      toUserId: userId,
      amount,
      description: 'Depósito na conta',
      type: 'deposit',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.transactions.push(transaction)
    return transaction
  }

  async withdraw(userId: string, amount: number): Promise<Transaction> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const wallet = await this.getWallet(userId)
    if (wallet.balance < amount) {
      throw new Error('Saldo insuficiente')
    }
    
    wallet.balance -= amount
    wallet.updatedAt = new Date()
    
    const transaction: Transaction = {
      id: this.generateId(),
      fromUserId: userId,
      toUserId: 'system',
      amount,
      description: 'Saque da conta',
      type: 'withdrawal',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.transactions.push(transaction)
    return transaction
  }

  private calculateFraudScore(request: TransferRequest, fromUserId: string): number {
    // Simple fraud detection algorithm
    let score = 0
    
    // Amount-based scoring
    if (request.amount > 5000) score += 20
    if (request.amount > 10000) score += 30
    
    // Time-based scoring (simulate unusual hours)
    const hour = new Date().getHours()
    if (hour < 6 || hour > 22) score += 15
    
    // Random factor for demo
    score += Math.random() * 20
    
    return Math.min(score, 100)
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

export const walletService = new WalletService()
