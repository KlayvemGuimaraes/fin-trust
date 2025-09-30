'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { User } from '@/types'
import { authService } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, biometricData?: string, twoFactorCode?: string) => Promise<void>
  register: (userData: { name: string; email: string; phone: string; cpf: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  enableBiometric: () => Promise<void>
  enableTwoFactor: () => Promise<{ qrCode: string; secret: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, biometricData?: string, twoFactorCode?: string) => {
    try {
      const { user, token } = await authService.login({
        email,
        password,
        biometricData,
        twoFactorCode
      })
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: { name: string; email: string; phone: string; cpf: string; password: string }) => {
    try {
      const { user, token } = await authService.register(userData)
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const enableBiometric = async () => {
    try {
      await authService.enableBiometric()
      if (user) {
        setUser({ ...user, biometricEnabled: true })
      }
    } catch (error) {
      throw error
    }
  }

  const enableTwoFactor = async () => {
    try {
      const result = await authService.enableTwoFactor()
      if (user) {
        setUser({ ...user, twoFactorEnabled: true })
      }
      return result
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      enableBiometric,
      enableTwoFactor
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
