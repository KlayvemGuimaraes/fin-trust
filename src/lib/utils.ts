import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function calculateScore(
  traditionalScore: number,
  communityScore: number,
  behaviorScore: number
): number {
  const weights = {
    traditional: 0.4,
    community: 0.35,
    behavior: 0.25,
  }
  
  return Math.round(
    traditionalScore * weights.traditional +
    communityScore * weights.community +
    behaviorScore * weights.behavior
  )
}

export function getScoreColor(score: number): string {
  if (score >= 800) return 'text-green-600'
  if (score >= 600) return 'text-yellow-600'
  if (score >= 400) return 'text-orange-600'
  return 'text-red-600'
}

export function getScoreLabel(score: number): string {
  if (score >= 800) return 'Excelente'
  if (score >= 600) return 'Bom'
  if (score >= 400) return 'Regular'
  return 'Baixo'
}
