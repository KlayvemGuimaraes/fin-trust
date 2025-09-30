'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Fingerprint, Shield, ArrowLeft, Heart, CheckCircle, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  const { register } = useAuth()
  const router = useRouter()

  const steps = [
    { number: 1, title: 'Dados Pessoais', description: 'Informações básicas' },
    { number: 2, title: 'Segurança', description: 'Senha e biometria' },
    { number: 3, title: 'Verificação', description: 'Confirmação final' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast.error('Preencha todos os campos obrigatórios')
      return false
    }
    
    if (formData.password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return false
    }
    
    return true
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
        toast.error('Preencha todos os campos obrigatórios')
        return
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleRegister = async () => {
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        password: formData.password
      })
      toast.success('Conta criada com sucesso!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  const enableBiometric = async () => {
    try {
      // Simulate biometric enrollment
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBiometricEnabled(true)
      toast.success('Biometria configurada com sucesso!')
    } catch (error) {
      toast.error('Erro ao configurar biometria')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              FinTrust
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
          <p className="text-gray-600">Junte-se à revolução financeira</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-center">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Data */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Nome Completo *
                      </label>
                      <Input
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Telefone *
                      </label>
                      <Input
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        CPF *
                      </label>
                      <Input
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                        className="h-12"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Security */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Senha *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Confirmar Senha *
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Digite a senha novamente"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Biometric Setup */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Fingerprint className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Configurar Biometria
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Adicione uma camada extra de segurança com autenticação biométrica
                    </p>
                    <Button
                      variant="outline"
                      onClick={enableBiometric}
                      disabled={biometricEnabled}
                      className="w-full"
                    >
                      {biometricEnabled ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          Biometria Configurada
                        </>
                      ) : (
                        <>
                          <Fingerprint className="w-4 h-4 mr-2" />
                          Configurar Biometria
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Quase Pronto!
                    </h3>
                    <p className="text-gray-600">
                      Revise suas informações e confirme a criação da conta
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nome:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telefone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPF:</span>
                      <span className="font-medium">{formData.cpf}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biometria:</span>
                      <Badge variant={biometricEnabled ? "success" : "secondary"}>
                        {biometricEnabled ? "Configurada" : "Não configurada"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Badge variant="success" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      SSL Seguro
                    </Badge>
                    <Badge variant="fintrust" className="text-xs">
                      <Fingerprint className="w-3 h-3 mr-1" />
                      Biometria
                    </Badge>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Anterior
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={handleNextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Fazer login
            </a>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-700 mt-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar ao início
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
