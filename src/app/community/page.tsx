'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  Star, 
  TrendingUp, 
  Award, 
  Heart, 
  Shield, 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  UserPlus,
  MessageCircle,
  ThumbsUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { creditScoreService } from '@/lib/creditScore'
import { formatCurrency, getScoreColor, getScoreLabel } from '@/lib/utils'
import { CreditScore, CommunityConnection } from '@/types'
import toast from 'react-hot-toast'

export default function CommunityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null)
  const [connections, setConnections] = useState<CommunityConnection[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Mock community data
  const mockCommunity = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      avatar: '/avatars/maria.jpg',
      score: 820,
      trustLevel: 95,
      endorsements: 12,
      isVerified: true,
      mutualConnections: 3,
      lastActive: '2 horas atrás',
      bio: 'Empreendedora digital, especialista em e-commerce',
      tags: ['Empreendedor', 'E-commerce', 'Tecnologia']
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      avatar: '/avatars/joao.jpg',
      score: 680,
      trustLevel: 78,
      endorsements: 8,
      isVerified: true,
      mutualConnections: 5,
      lastActive: '1 hora atrás',
      bio: 'Estudante de engenharia, apaixonado por inovação',
      tags: ['Estudante', 'Engenharia', 'Inovação']
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      avatar: '/avatars/ana.jpg',
      score: 750,
      trustLevel: 88,
      endorsements: 15,
      isVerified: true,
      mutualConnections: 2,
      lastActive: '30 min atrás',
      bio: 'Freelancer criativa, designer e ilustradora',
      tags: ['Design', 'Freelancer', 'Criatividade']
    },
    {
      id: '4',
      name: 'Pedro Lima',
      email: 'pedro@email.com',
      avatar: '/avatars/pedro.jpg',
      score: 720,
      trustLevel: 82,
      endorsements: 6,
      isVerified: false,
      mutualConnections: 1,
      lastActive: '3 horas atrás',
      bio: 'Consultor financeiro, especialista em investimentos',
      tags: ['Financeiro', 'Investimentos', 'Consultoria']
    },
    {
      id: '5',
      name: 'Carla Mendes',
      email: 'carla@email.com',
      avatar: '/avatars/carla.jpg',
      score: 890,
      trustLevel: 98,
      endorsements: 25,
      isVerified: true,
      mutualConnections: 7,
      lastActive: '15 min atrás',
      bio: 'CEO de startup, mentora de negócios',
      tags: ['CEO', 'Startup', 'Mentoria']
    }
  ]

  useEffect(() => {
    loadCommunityData()
  }, [])

  const loadCommunityData = async () => {
    try {
      setLoading(true)
      const scoreData = await creditScoreService.getCreditScore(user!.id)
      setCreditScore(scoreData)
    } catch (error) {
      toast.error('Erro ao carregar dados da comunidade')
    } finally {
      setLoading(false)
    }
  }

  const handleEndorse = async (userId: string) => {
    try {
      await creditScoreService.endorseUser(user!.id, userId)
      toast.success('Endosso enviado com sucesso!')
      loadCommunityData()
    } catch (error) {
      toast.error('Erro ao enviar endosso')
    }
  }

  const handleConnect = async (userId: string) => {
    try {
      await creditScoreService.addCommunityConnection(user!.id, userId, 80)
      toast.success('Solicitação de conexão enviada!')
    } catch (error) {
      toast.error('Erro ao enviar solicitação')
    }
  }

  const filteredCommunity = mockCommunity.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'verified' && person.isVerified) ||
                         (filter === 'high-score' && person.score > 750) ||
                         (filter === 'mutual' && person.mutualConnections > 0)
    
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando comunidade...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
                <Heart className="w-5 h-5 text-white" />
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
            Rede de Confiança
          </h1>
          <p className="text-gray-600">
            Conecte-se com pessoas confiáveis e construa seu score comunitário
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* My Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Meu Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(creditScore?.finalScore || 0)}`}>
                      {creditScore?.finalScore || 0}
                    </div>
                    <Badge variant="fintrust" className="mb-4">
                      {getScoreLabel(creditScore?.finalScore || 0)}
                    </Badge>
                    <Progress value={creditScore?.finalScore || 0} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
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

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Conexões</span>
                    <span className="font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Endossos</span>
                    <span className="font-bold text-green-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Verificações</span>
                    <span className="font-bold text-purple-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ranking</span>
                    <span className="font-bold text-orange-600">#42</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Primeira Conexão</p>
                      <p className="text-xs text-gray-500">Conectou-se com alguém</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Score 700+</p>
                      <p className="text-xs text-gray-500">Alcançou score alto</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Verificado</p>
                      <p className="text-xs text-gray-500">Conta verificada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Buscar pessoas, tags ou interesses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                      >
                        Todos
                      </Button>
                      <Button
                        variant={filter === 'verified' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('verified')}
                      >
                        Verificados
                      </Button>
                      <Button
                        variant={filter === 'high-score' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('high-score')}
                      >
                        Score Alto
                      </Button>
                      <Button
                        variant={filter === 'mutual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('mutual')}
                      >
                        Conexões
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCommunity.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{person.name}</h3>
                              {person.isVerified && (
                                <Badge variant="success" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{person.bio}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(person.score)}`}>
                            {person.score}
                          </div>
                          <Badge variant="fintrust" className="text-xs">
                            {getScoreLabel(person.score)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Nível de Confiança</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={person.trustLevel} className="w-20 h-2" />
                            <span className="text-sm font-medium">{person.trustLevel}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Endossos</span>
                          <span className="text-sm font-medium">{person.endorsements}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Conexões Mútuas</span>
                          <span className="text-sm font-medium">{person.mutualConnections}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Última atividade</span>
                          <span className="text-sm text-gray-500">{person.lastActive}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 mb-4">
                        {person.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEndorse(person.id)}
                          className="flex-1"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Endossar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConnect(person.id)}
                          className="flex-1"
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Conectar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCommunity.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma pessoa encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar seus filtros de busca
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
