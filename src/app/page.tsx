'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  Users, 
  Zap, 
  Star, 
  CheckCircle, 
  Smartphone,
  CreditCard,
  TrendingUp,
  Lock,
  Globe,
  Heart,
  DollarSign,
  Coins,
  Banknote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Antifraude Inteligente",
      description: "IA avançada detecta fraudes em tempo real usando análise comportamental e geolocalização.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Score Comunitário",
      description: "Sistema inovador que combina dados tradicionais com rede de confiança social.",
      color: "text-purple-600"
    },
    {
      icon: Zap,
      title: "Transferências P2P",
      description: "Pagamentos instantâneos entre usuários com segurança e transparência total.",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Inclusão Financeira",
      description: "Democratiza o acesso ao crédito para milhões de brasileiros subavaliados.",
      color: "text-purple-600"
    }
  ]

  const personaStory = {
    name: "Maria Silva",
    role: "Microempreendedora",
    location: "São Paulo, SP",
    avatar: "MS",
    story: "Maria sempre sonhou em ter sua própria loja de roupas, mas sem histórico bancário, nunca conseguiu um empréstimo. Com o FinTrust, ela construiu sua rede de confiança através de indicações de clientes satisfeitos e hoje tem uma loja online que fatura R$ 15.000/mês.",
    score: 720,
    achievements: ["Primeira loja online", "Rede de 50+ clientes", "Score 700+"]
  }


  const steps = [
    {
      number: "01",
      title: "Cadastro Rápido",
      description: "Crie sua conta em menos de 2 minutos com verificação biométrica"
    },
    {
      number: "02", 
      title: "Score Inicial",
      description: "Receba seu score baseado em dados tradicionais e indicações de confiança"
    },
    {
      number: "03",
      title: "Transações Seguras",
      description: "Faça pagamentos P2P com proteção antifraude em tempo real"
    },
    {
      number: "04",
      title: "Evolução Contínua",
      description: "Seu score melhora com cada transação segura e indicação recebida"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-200">
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Como Funciona</a>
              <Button variant="outline" size="sm" onClick={() => router.push('/login')}>Entrar</Button>
              <Button variant="gradient" size="sm" onClick={() => router.push('/register')}>Começar Agora</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="fintrust" className="mb-6 text-sm px-4 py-2">
              🚀 Hackathon QI Tech 2024
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Revolucione o
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                {" "}Sistema Financeiro
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Carteira digital P2P com score comunitário antifraude. 
              Democratize o acesso ao crédito e proteja-se contra fraudes com IA avançada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="gradient" size="xl" className="group" onClick={() => router.push('/register')}>
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => router.push('/dashboard')}>
                Ver Demonstração
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <DollarSign className="w-8 h-8 text-purple-600" />
                        <Badge variant="purple">Ativo</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-purple-800">Carteira Digital</h3>
                      <p className="text-sm text-purple-600">R$ 2.847,50</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-300 bg-purple-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Coins className="w-8 h-8 text-purple-700" />
                        <Badge variant="purple">Score: 750</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-purple-800">Score Comunitário</h3>
                      <p className="text-sm text-purple-600">+15 esta semana</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-400 bg-purple-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Banknote className="w-8 h-8 text-purple-800" />
                        <Badge variant="secondary">P2P</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-purple-800">Transferência</h3>
                      <p className="text-sm text-purple-600">R$ 1.250,00</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Persona Story Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Histórias de
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Transformação
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como o FinTrust está mudando vidas reais através da inclusão financeira
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-200"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {personaStory.avatar}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{personaStory.name}</h3>
                  <p className="text-purple-600 font-medium">{personaStory.role}</p>
                  <p className="text-gray-500 text-sm">{personaStory.location}</p>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 text-purple-500 fill-current" />
                  <span className="text-lg font-semibold text-gray-900">Score: {personaStory.score}</span>
                </div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                  "{personaStory.story}"
                </blockquote>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {personaStory.achievements.map((achievement, index) => (
                    <Badge key={index} variant="purple-light" className="text-sm">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tecnologia que
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Transforma
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos IA avançada, blockchain e análise comportamental para criar 
              o sistema financeiro mais seguro e inclusivo do Brasil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Em 4 passos simples, você tem acesso a um sistema financeiro 
              completo, seguro e inclusivo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Revolucionar
              <br />
              Seu Sistema Financeiro?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Junte-se a mais de 2.5 milhões de usuários que já transformaram 
              sua vida financeira com o FinTrust.
            </p>
            <div className="flex justify-center items-center">
              <Button variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold min-w-[200px] transition-all duration-300 hover:scale-105 hover:shadow-lg" onClick={() => router.push('/dashboard')}>
                <Globe className="mr-2 w-5 h-5" />
                Acessar Web
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinTrust</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolucionando o sistema financeiro brasileiro com tecnologia 
                de ponta, inclusão social e segurança máxima.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all duration-300">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all duration-300">
                  <Shield className="w-4 h-4 text-purple-400" />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-500 transition-all duration-300">
                  <Users className="w-4 h-4 text-purple-400" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Carteira Digital</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Score Comunitário</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Antifraude</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Transferências P2P</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinTrust. Todos os direitos reservados. Hackathon QI Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
