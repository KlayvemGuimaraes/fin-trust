'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Send, 
  User, 
  DollarSign, 
  MessageSquare, 
  Fingerprint,
  Shield,
  AlertTriangle,
  CheckCircle,
  Heart,
  QrCode,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'
import { walletService } from '@/lib/wallet'
import { formatCurrency } from '@/lib/utils'
import { TransferRequest } from '@/types'
import toast from 'react-hot-toast'

export default function TransferPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  const [step, setStep] = useState(1)
  const [transferData, setTransferData] = useState({
    toUserId: '',
    amount: '',
    description: ''
  })
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [biometricRequired, setBiometricRequired] = useState(false)
  const [fraudCheck, setFraudCheck] = useState<any>(null)

  // Mock users for demo
  const mockUsers = [
    { id: '1', name: 'Maria Silva', email: 'maria@email.com', avatar: '/avatars/maria.jpg', score: 820 },
    { id: '2', name: 'João Santos', email: 'joao@email.com', avatar: '/avatars/joao.jpg', score: 680 },
    { id: '3', name: 'Ana Costa', email: 'ana@email.com', avatar: '/avatars/ana.jpg', score: 750 },
    { id: '4', name: 'Pedro Lima', email: 'pedro@email.com', avatar: '/avatars/pedro.jpg', score: 720 },
  ]

  const handleUserSelect = (user: any) => {
    setSelectedUser(user)
    setTransferData(prev => ({ ...prev, toUserId: user.id }))
    setStep(2)
  }

  const handleAmountChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    setTransferData(prev => ({ ...prev, amount: numericValue }))
  }

  const handleNextStep = () => {
    if (step === 2) {
      if (!transferData.amount || parseFloat(transferData.amount) <= 0) {
        toast.error('Digite um valor válido')
        return
      }
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    }
  }

  const handleTransfer = async () => {
    if (!user || !selectedUser) return
    
    setLoading(true)
    
    try {
      // Simulate fraud check
      const fraudScore = Math.random() * 100
      setFraudCheck({
        score: fraudScore,
        risk: fraudScore > 70 ? 'high' : fraudScore > 40 ? 'medium' : 'low',
        factors: [
          { name: 'Valor da transação', score: parseFloat(transferData.amount) > 1000 ? 80 : 20 },
          { name: 'Horário', score: new Date().getHours() < 6 || new Date().getHours() > 22 ? 60 : 10 },
          { name: 'Histórico do usuário', score: selectedUser.score > 700 ? 10 : 50 },
          { name: 'Padrão de uso', score: 30 }
        ]
      })

      if (fraudScore > 80) {
        setBiometricRequired(true)
        setStep(5)
        return
      }

      const request: TransferRequest = {
        toUserId: transferData.toUserId,
        amount: parseFloat(transferData.amount),
        description: transferData.description || 'Transferência P2P'
      }

      await walletService.transfer(request, user.id)
      toast.success('Transferência realizada com sucesso!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar transferência')
    } finally {
      setLoading(false)
    }
  }

  const handleBiometricConfirm = async () => {
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const request: TransferRequest = {
        toUserId: transferData.toUserId,
        amount: parseFloat(transferData.amount),
        description: transferData.description || 'Transferência P2P'
      }

      await walletService.transfer(request, user!.id)
      toast.success('Transferência realizada com sucesso!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error('Erro na autenticação biométrica')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinTrust
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center space-x-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select User */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Para quem você quer transferir?
                </CardTitle>
                <CardDescription>
                  Selecione um usuário da sua rede de confiança
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar por nome ou email..."
                      className="pl-10 h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {mockUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-blue-200"
                          onClick={() => handleUserSelect(user)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-12 h-12">
                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="fintrust" className="mb-1">
                                  Score: {user.score}
                                </Badge>
                                <p className="text-xs text-gray-500">Alta confiança</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Enter Amount */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Qual o valor?
                </CardTitle>
                <CardDescription>
                  Transferindo para {selectedUser?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-4">
                    R$ {transferData.amount || '0,00'}
                  </div>
                  <Input
                    type="text"
                    placeholder="0,00"
                    value={transferData.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-center text-2xl h-16"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[50, 100, 200, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setTransferData(prev => ({ ...prev, amount: amount.toString() }))}
                      className="h-12"
                    >
                      R$ {amount}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button onClick={handleNextStep}>
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Add Description */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                  Adicione uma descrição
                </CardTitle>
                <CardDescription>
                  Opcional - ajude o destinatário a identificar a transferência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Transferindo para:</span>
                    <span className="font-medium">{selectedUser?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor:</span>
                    <span className="font-bold text-lg">{formatCurrency(parseFloat(transferData.amount))}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Descrição (opcional)
                  </label>
                  <Input
                    placeholder="Ex: Pagamento do almoço, Dividir conta..."
                    value={transferData.description}
                    onChange={(e) => setTransferData(prev => ({ ...prev, description: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button onClick={handleNextStep}>
                    Revisar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Confirme a transferência
                </CardTitle>
                <CardDescription>
                  Revise os detalhes antes de confirmar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatCurrency(parseFloat(transferData.amount))}
                    </div>
                    <p className="text-gray-600">Transferindo para</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{selectedUser?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{selectedUser?.name}</p>
                      <p className="text-sm text-gray-500">{selectedUser?.email}</p>
                    </div>
                  </div>
                  
                  {transferData.description && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">"{transferData.description}"</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taxa de transferência</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tempo de processamento</span>
                    <span className="font-medium">Instantâneo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Proteção antifraude</span>
                    <Badge variant="success">
                      <Shield className="w-3 h-3 mr-1" />
                      Ativa
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleTransfer}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {loading ? 'Processando...' : 'Confirmar Transferência'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Biometric Confirmation */}
        {step === 5 && fraudCheck && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fingerprint className="w-5 h-5 mr-2 text-orange-600" />
                  Confirmação Biométrica Necessária
                </CardTitle>
                <CardDescription>
                  Detectamos atividade suspeita. Confirme sua identidade para continuar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Análise de Risco</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Score de risco: {fraudCheck.score.toFixed(0)}% - {fraudCheck.risk === 'high' ? 'Alto' : 'Médio'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Fatores de risco detectados:</h4>
                  {fraudCheck.factors.map((factor: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{factor.name}</span>
                      <Badge variant={factor.score > 50 ? "danger" : "success"} className="text-xs">
                        {factor.score}%
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Toque no sensor biométrico para confirmar sua identidade
                  </p>
                  <Button 
                    onClick={handleBiometricConfirm}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {loading ? 'Verificando...' : 'Confirmar com Biometria'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
