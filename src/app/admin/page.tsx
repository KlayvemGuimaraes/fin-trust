'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Activity,
  Eye,
  Settings,
  Heart,
  ArrowLeft,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      // Simulate loading admin data
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      toast.error('Erro ao carregar dados administrativos')
    } finally {
      setLoading(false)
    }
  }

  // Mock admin data
  const adminStats = {
    totalUsers: 2547891,
    activeUsers: 1892345,
    totalTransactions: 15678923,
    totalVolume: 8945678901.23,
    fraudBlocked: 12456,
    avgScore: 742,
    systemUptime: 99.8,
    apiCalls: 2345678
  }

  const recentAlerts = [
    {
      id: '1',
      type: 'fraud_detection',
      severity: 'high',
      description: 'Múltiplas tentativas de transação suspeita detectadas',
      user: 'user_12345',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'investigating'
    },
    {
      id: '2',
      type: 'system_error',
      severity: 'medium',
      description: 'Erro na API de verificação de identidade',
      user: 'system',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'resolved'
    },
    {
      id: '3',
      type: 'performance',
      severity: 'low',
      description: 'Latência elevada no sistema de antifraude',
      user: 'system',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'monitoring'
    }
  ]

  const topUsers = [
    { id: '1', name: 'Maria Silva', score: 920, transactions: 156, volume: 125000 },
    { id: '2', name: 'João Santos', score: 890, transactions: 134, volume: 98000 },
    { id: '3', name: 'Ana Costa', score: 875, transactions: 98, volume: 87000 },
    { id: '4', name: 'Pedro Lima', score: 860, transactions: 112, volume: 76000 },
    { id: '5', name: 'Carla Mendes', score: 850, transactions: 89, volume: 65000 }
  ]

  const fraudStats = {
    totalDetected: 12456,
    blocked: 11890,
    falsePositives: 566,
    accuracy: 95.5,
    avgResponseTime: 0.8
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FinTrust Admin
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex gap-2">
                <Button
                  variant={selectedTimeframe === '24h' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('24h')}
                >
                  24h
                </Button>
                <Button
                  variant={selectedTimeframe === '7d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('7d')}
                >
                  7d
                </Button>
                <Button
                  variant={selectedTimeframe === '30d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('30d')}
                >
                  30d
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Visão geral do sistema FinTrust e métricas de performance
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Usuários Ativos</p>
                    <p className="text-2xl font-bold">{adminStats.activeUsers.toLocaleString()}</p>
                    <p className="text-blue-200 text-xs">+12% vs mês anterior</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Volume Total</p>
                    <p className="text-2xl font-bold">{formatCurrency(adminStats.totalVolume)}</p>
                    <p className="text-green-200 text-xs">+8% vs mês anterior</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Transações</p>
                    <p className="text-2xl font-bold">{adminStats.totalTransactions.toLocaleString()}</p>
                    <p className="text-purple-200 text-xs">+15% vs mês anterior</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Score Médio</p>
                    <p className="text-2xl font-bold">{adminStats.avgScore}</p>
                    <p className="text-orange-200 text-xs">+5 pontos vs mês anterior</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Health */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Métricas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Uptime do Sistema</span>
                          <span className="text-sm font-bold text-green-600">{adminStats.systemUptime}%</span>
                        </div>
                        <Progress value={adminStats.systemUptime} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">API Calls/min</span>
                          <span className="text-sm font-bold text-blue-600">{Math.round(adminStats.apiCalls / 1440)}</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Latência Média</span>
                          <span className="text-sm font-bold text-purple-600">120ms</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Taxa de Sucesso</span>
                          <span className="text-sm font-bold text-green-600">99.2%</span>
                        </div>
                        <Progress value={99.2} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Throughput</span>
                          <span className="text-sm font-bold text-orange-600">1.2k TPS</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                          <span className="text-sm font-bold text-red-600">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Top Usuários
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.transactions} transações</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{user.score}</p>
                          <p className="text-sm text-gray-500">{formatCurrency(user.volume)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fraud Detection Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-600" />
                    Detecção de Fraude
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {fraudStats.accuracy}%
                    </div>
                    <Badge variant="success" className="mb-4">
                      Precisão
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Detectadas</span>
                      <span className="font-medium">{fraudStats.totalDetected.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bloqueadas</span>
                      <span className="font-medium text-green-600">{fraudStats.blocked.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Falsos Positivos</span>
                      <span className="font-medium text-orange-600">{fraudStats.falsePositives.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tempo Resposta</span>
                      <span className="font-medium">{fraudStats.avgResponseTime}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                    Alertas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDateTime(alert.timestamp)}
                            </p>
                          </div>
                          <Badge 
                            variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'secondary'}
                            className="text-xs ml-2"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{alert.user}</span>
                          <Badge 
                            variant={alert.status === 'resolved' ? 'success' : alert.status === 'investigating' ? 'warning' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.status === 'resolved' ? 'Resolvido' : alert.status === 'investigating' ? 'Investigando' : 'Monitorando'}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-600" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/security')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Logs do Sistema
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/security')}>
                    <Shield className="w-4 h-4 mr-2" />
                    Configurar Antifraude
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/community')}>
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Usuários
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/dashboard')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatórios
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
