import { User, LoginRequest, RegisterRequest } from '@/types'

// Mock authentication service - in production, this would connect to your backend
class AuthService {
  private users: User[] = []
  private currentUser: User | null = null

  async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = this.users.find(u => u.email === credentials.email)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // In production, verify password hash and biometric data
    if (credentials.biometricData && !user.biometricEnabled) {
      throw new Error('Biometria não configurada')
    }

    if (user.twoFactorEnabled && !credentials.twoFactorCode) {
      throw new Error('Código 2FA necessário')
    }

    this.currentUser = user
    const token = this.generateToken(user)
    
    return { user, token }
  }

  async register(userData: RegisterRequest): Promise<{ user: User; token: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const existingUser = this.users.find(u => u.email === userData.email || u.cpf === userData.cpf)
    if (existingUser) {
      throw new Error('Usuário já existe')
    }

    const user: User = {
      id: this.generateId(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      cpf: userData.cpf,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      biometricEnabled: !!userData.biometricData,
      twoFactorEnabled: false,
    }

    this.users.push(user)
    this.currentUser = user
    const token = this.generateToken(user)
    
    return { user, token }
  }

  async logout(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem('auth_token')
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    const token = localStorage.getItem('auth_token')
    if (!token) {
      return null
    }

    // In production, verify token with backend
    try {
      const user = this.parseToken(token)
      this.currentUser = user
      return user
    } catch {
      localStorage.removeItem('auth_token')
      return null
    }
  }

  async enableBiometric(): Promise<void> {
    if (!this.currentUser) {
      throw new Error('Usuário não autenticado')
    }

    // Simulate biometric enrollment
    await new Promise(resolve => setTimeout(resolve, 500))
    
    this.currentUser.biometricEnabled = true
    this.currentUser.updatedAt = new Date()
  }

  async enableTwoFactor(): Promise<{ qrCode: string; secret: string }> {
    if (!this.currentUser) {
      throw new Error('Usuário não autenticado')
    }

    // Simulate 2FA setup
    await new Promise(resolve => setTimeout(resolve, 500))
    
    this.currentUser.twoFactorEnabled = true
    this.currentUser.updatedAt = new Date()
    
    return {
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      secret: 'JBSWY3DPEHPK3PXP'
    }
  }

  private generateToken(user: User): string {
    // In production, use JWT with proper signing
    const payload = {
      userId: user.id,
      email: user.email,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }
    
    const token = btoa(JSON.stringify(payload))
    localStorage.setItem('auth_token', token)
    return token
  }

  private parseToken(token: string): User {
    try {
      const payload = JSON.parse(atob(token))
      if (payload.exp < Date.now()) {
        throw new Error('Token expirado')
      }
      
      // In production, fetch user from database
      const user = this.users.find(u => u.id === payload.userId)
      if (!user) {
        throw new Error('Usuário não encontrado')
      }
      
      return user
    } catch {
      throw new Error('Token inválido')
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

export const authService = new AuthService()
