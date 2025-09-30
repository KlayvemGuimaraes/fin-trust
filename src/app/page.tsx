'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function HomePage() {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
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
      color: "text-orange-600"
    }
  ]

  const stats = [
    { label: "Usuários Ativos", value: "2.5M+", icon: Users },
    { label: "Transações Seguras", value: "R$ 15B+", icon: Shield },
    { label: "Score Médio", value: "750+", icon: TrendingUp },
    { label: "Fraudes Bloqueadas", value: "99.8%", icon: Lock }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empreendedora",
      avatar: "/avatars/maria.jpg",
      content: "O FinTrust me deu acesso ao crédito que nunca tive. Minha loja online cresceu 300% em 6 meses!",
      score: 820
    },
    {
      name: "João Santos",
      role: "Estudante",
      avatar: "/avatars/joao.jpg", 
      content: "Como estudante sem histórico bancário, o score comunitário foi fundamental para conseguir meu primeiro empréstimo.",
      score: 680
    },
    {
      name: "Ana Costa",
      role: "Freelancer",
      avatar: "/avatars/ana.jpg",
      content: "A segurança é impressionante. Já bloquearam 3 tentativas de fraude na minha conta automaticamente.",
      score: 750
    }
  ]

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
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Depoimentos</a>
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Histórias de
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Sucesso
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como o FinTrust está transformando vidas e negócios em todo o Brasil.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src={testimonials[currentTestimonial].avatar} />
                    <AvatarFallback>{testimonials[currentTestimonial].name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        Score: {testimonials[currentTestimonial].score}
                      </span>
                    </div>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
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
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-purple-600" onClick={() => router.push('/dashboard')}>
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
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <CreditCard className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Shield className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Users className="w-4 h-4" />
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
