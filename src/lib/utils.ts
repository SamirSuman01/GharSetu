import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in Indian Rupees (Crores)
export function formatCurrency(amount: number): string {
  // Convert to Crores (1 Crore = 10,000,000)
  const crores = amount / 10000000

  // For amounts >= 1 Crore, show in Crores format
  if (crores >= 1) {
    return `₹${crores.toFixed(crores % 1 === 0 ? 0 : 2)} Cr`
  }

  // For smaller amounts, show in Lakhs (1 Lakh = 100,000)
  const lakhs = amount / 100000
  return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)} L`
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
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
