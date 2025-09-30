'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Lock,
  Fingerprint,
  Smartphone,
  Globe,
  Clock,
  MapPin,
  ArrowLeft,
  Heart,
  TrendingUp,
  Activity,
  Zap,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { fraudDetectionService } from '@/lib/fraudDetection'
import { formatDateTime } from '@/lib/utils'
import { FraudAlert } from '@/types'
import toast from 'react-hot-toast'

export default function SecurityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [alerts, setAlerts] = useState<FraudAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [showSensitiveData, setShowSensitiveData] = useState(false)

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      setLoading(true)
      const userAlerts = await fraudDetectionService.detectAnomalies(user!.id)
      setAlerts(userAlerts)
    } catch (error) {
      toast.error('Erro ao carregar dados de segurança')
    } finally {
      setLoading(false)
    }
  }

  const handleResolveAlert = async (alertId: string) => {
    try {
      await fraudDetectionService.resolveAlert(alertId)
      toast.success('Alerta resolvido com sucesso!')
      loadSecurityData()
    } catch (error) {
      toast.error('Erro ao resolver alerta')
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'high': return AlertTriangle
      case 'medium': return Eye
      case 'low': return CheckCircle
      default: return Shield
    }
  }

  // Mock security data
  const securityStats = {
    totalAlerts: 3,
    resolvedAlerts: 2,
    activeAlerts: 1,
    blockedTransactions: 5,
    riskScore: 15,
    lastScan: new Date()
  }

  const recentActivity = [
    {
      id: '1',
      type: 'login',
      description: 'Login realizado via biometria',
      location: 'São Paulo, SP',
      device: 'iPhone 14 Pro',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: '2',
      type: 'transaction',
      description: 'Transferência de R$ 250,00 para Maria Silva',
      location: 'São Paulo, SP',
      device: 'iPhone 14 Pro',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: '3',
      type: 'fraud_detection',
      description: 'Tentativa de transação suspeita bloqueada',
      location: 'Rio de Janeiro, RJ',
      device: 'Chrome Browser',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'blocked'
    },
    {
      id: '4',
      type: 'password_change',
      description: 'Senha alterada com sucesso',
      location: 'São Paulo, SP',
      device: 'iPhone 14 Pro',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'success'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando dados de segurança...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinTrust
              </span>
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
            Centro de Segurança
          </h1>
          <p className="text-gray-600">
            Monitore a segurança da sua conta e proteja-se contra fraudes
          </p>
        </motion.div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Score de Risco</p>
                    <p className="text-2xl font-bold">{securityStats.riskScore}%</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Alertas Ativos</p>
                    <p className="text-2xl font-bold">{securityStats.activeAlerts}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-blue-200" />
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
                    <p className="text-purple-100 text-sm">Bloqueios</p>
                    <p className="text-2xl font-bold">{securityStats.blockedTransactions}</p>
                  </div>
                  <Lock className="w-8 h-8 text-purple-200" />
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
                    <p className="text-orange-100 text-sm">Resolvidos</p>
                    <p className="text-2xl font-bold">{securityStats.resolvedAlerts}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Settings */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Fingerprint className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Biometria</span>
                    </div>
                    <Badge variant={user?.biometricEnabled ? "success" : "secondary"}>
                      {user?.biometricEnabled ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">2FA</span>
                    </div>
                    <Badge variant={user?.twoFactorEnabled ? "success" : "secondary"}>
                      {user?.twoFactorEnabled ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Monitoramento</span>
                    </div>
                    <Badge variant="success">Ativo</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium">Antifraude IA</span>
                    </div>
                    <Badge variant="success">Ativo</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Avaliação de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {securityStats.riskScore}%
                    </div>
                    <Badge variant="success" className="mb-4">
                      Baixo Risco
                    </Badge>
                    <Progress value={securityStats.riskScore} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comportamento</span>
                      <Badge variant="success" className="text-xs">Normal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Dispositivos</span>
                      <Badge variant="success" className="text-xs">Conhecidos</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Localização</span>
                      <Badge variant="success" className="text-xs">Habitual</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Padrões</span>
                      <Badge variant="success" className="text-xs">Regulares</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                    Alertas de Segurança
                  </CardTitle>
                  <CardDescription>
                    Monitore atividades suspeitas em sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.length > 0 ? (
                      alerts.map((alert, index) => {
                        const SeverityIcon = getSeverityIcon(alert.severity)
                        return (
                          <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                                <SeverityIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{alert.description}</p>
                                <p className="text-sm text-gray-500">
                                  {formatDateTime(alert.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {alert.severity}
                              </Badge>
                              {!alert.isResolved && (
                                <Button
                                  size="sm"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  Resolver
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum alerta ativo</p>
                        <p className="text-sm">Sua conta está segura</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Atividade Recente
                  </CardTitle>
                  <CardDescription>
                    Últimas atividades em sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.status === 'success' 
                              ? 'bg-green-100 text-green-600'
                              : activity.status === 'blocked'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {activity.type === 'login' && <Smartphone className="w-5 h-5" />}
                            {activity.type === 'transaction' && <Globe className="w-5 h-5" />}
                            {activity.type === 'fraud_detection' && <Shield className="w-5 h-5" />}
                            {activity.type === 'password_change' && <Lock className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Smartphone className="w-3 h-3" />
                                <span>{activity.device}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDateTime(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={activity.status === 'success' ? 'success' : activity.status === 'blocked' ? 'danger' : 'secondary'}
                          className="text-xs"
                        >
                          {activity.status === 'success' ? 'Sucesso' : activity.status === 'blocked' ? 'Bloqueado' : 'Pendente'}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
