'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Shield, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  Send,
  QrCode,
  Star,
  AlertTriangle,
  CheckCircle,
  Heart,
  Zap,
  DollarSign,
  Coins,
  Banknote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'
import { walletService } from '@/lib/wallet'
import { creditScoreService } from '@/lib/creditScore'
import { formatCurrency, getScoreColor, getScoreLabel } from '@/lib/utils'
import { Wallet as WalletType, Transaction, CreditScore } from '@/types'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [wallet, setWallet] = useState<WalletType | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [walletData, transactionsData, creditScoreData] = await Promise.all([
        walletService.getWallet(user!.id),
        walletService.getTransactions(user!.id),
        creditScoreService.getCreditScore(user!.id)
      ])
      
      setWallet(walletData)
      setTransactions(transactionsData)
      setCreditScore(creditScoreData)
    } catch (error) {
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTransfer = () => {
    router.push('/transfer')
  }

  const handleDeposit = async () => {
    try {
      await walletService.deposit(user!.id, 500)
      toast.success('Depósito realizado com sucesso!')
      loadDashboardData()
    } catch (error) {
      toast.error('Erro ao realizar depósito')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                FinTrust
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="purple" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Seguro
              </Badge>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo da sua conta FinTrust
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Saldo Atual</p>
                    <p className="text-2xl font-bold">{formatCurrency(wallet?.balance || 0)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Score FinTrust</p>
                    <p className="text-2xl font-bold">{creditScore?.finalScore || 0}</p>
                  </div>
                  <Coins className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-700 to-purple-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Conexões</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-800 to-purple-900 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Transações</p>
                    <p className="text-2xl font-bold">{transactions.length}</p>
                  </div>
                  <Banknote className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Ações Rápidas
                  </CardTitle>
                  <CardDescription>
                    Transfira dinheiro, deposite ou escaneie QR codes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200"
                      onClick={handleQuickTransfer}
                    >
                      <Send className="w-6 h-6 text-purple-600" />
                      <span className="text-sm font-medium">Transferir</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200"
                      onClick={handleDeposit}
                    >
                      <ArrowDownLeft className="w-6 h-6 text-green-600" />
                      <span className="text-sm font-medium">Depositar</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200"
                      onClick={() => router.push('/transfer')}
                    >
                      <QrCode className="w-6 h-6 text-purple-600" />
                      <span className="text-sm font-medium">QR Code</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200"
                      onClick={() => router.push('/community')}
                    >
                      <Plus className="w-6 h-6 text-orange-600" />
                      <span className="text-sm font-medium">Mais</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowUpRight className="w-5 h-5 mr-2 text-gray-600" />
                      Transações Recentes
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/transfer')}>
                      Ver todas
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'transfer' && transaction.fromUserId === user?.id
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {transaction.type === 'transfer' && transaction.fromUserId === user?.id ? (
                              <ArrowUpRight className="w-5 h-5" />
                            ) : (
                              <ArrowDownLeft className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.createdAt.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'transfer' && transaction.fromUserId === user?.id
                              ? 'text-red-600'
                              : 'text-green-600'
                          }`}>
                            {transaction.type === 'transfer' && transaction.fromUserId === user?.id ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <div className="flex items-center space-x-1">
                            {transaction.fraudScore && transaction.fraudScore > 50 ? (
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              {transaction.status === 'completed' ? 'Concluída' : transaction.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {transactions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhuma transação ainda</p>
                        <p className="text-sm">Suas transações aparecerão aqui</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Credit Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Score FinTrust
                  </CardTitle>
                  <CardDescription>
                    Seu score comunitário antifraude
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(creditScore?.finalScore || 0)}`}>
                      {creditScore?.finalScore || 0}
                    </div>
                    <Badge variant="fintrust" className="mb-4">
                      {getScoreLabel(creditScore?.finalScore || 0)}
                    </Badge>
                    <Progress value={creditScore?.finalScore || 0} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tradicional</span>
                      <span className="font-medium">{creditScore?.traditionalScore || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comunitário</span>
                      <span className="font-medium">{creditScore?.communityScore || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comportamental</span>
                      <span className="font-medium">{creditScore?.behaviorScore || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Biometria</span>
                    <Badge variant={user?.biometricEnabled ? "success" : "secondary"}>
                      {user?.biometricEnabled ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">2FA</span>
                    <Badge variant={user?.twoFactorEnabled ? "success" : "secondary"}>
                      {user?.twoFactorEnabled ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Verificação</span>
                    <Badge variant={user?.isVerified ? "success" : "warning"}>
                      {user?.isVerified ? "Verificado" : "Pendente"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Connections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    Rede de Confiança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Usuário {i}</p>
                          <p className="text-xs text-gray-500">Score: {750 + i * 10}</p>
                        </div>
                        <Badge variant="success" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          {90 + i}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => router.push('/community')}>
                    Ver todos
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
