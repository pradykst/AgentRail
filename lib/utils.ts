import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format address for display
export function formatAddress(address: string, length: number = 6): string {
  if (!address) return ''
  if (address.length <= length * 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

// Format transaction hash
export function formatTxHash(hash: string, length: number = 8): string {
  if (!hash) return ''
  if (hash.length <= length * 2) return hash
  return `${hash.slice(0, length)}...${hash.slice(-length)}`
}

// Format currency amount
export function formatCurrency(amount: number | string, decimals: number = 2): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Get time ago string
export function getTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Validate amount
export function isValidAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Debounce function
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

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}

// Get explorer URL
export function getExplorerUrl(txHash: string, network: 'ethereum' | 'hedera' = 'ethereum'): string {
  if (network === 'ethereum') {
    return `https://sepolia.etherscan.io/tx/${txHash}`
  }
  if (network === 'hedera') {
    return `https://hashscan.io/testnet/transaction/${txHash}`
  }
  return ''
}

// Calculate gas savings
export function calculateGasSavings(ethereumGas: number, hederaGas: number): number {
  if (ethereumGas === 0) return 0
  return ((ethereumGas - hederaGas) / ethereumGas) * 100
}

// Get risk level from score
export function getRiskLevel(score: number): { level: string; color: string } {
  if (score < 20) return { level: 'Low', color: 'green' }
  if (score < 40) return { level: 'Medium', color: 'yellow' }
  return { level: 'High', color: 'red' }
}

// Format AI insights
export function formatAIInsights(insights: string[]): string[] {
  return insights.map(insight => {
    // Add emoji based on insight type
    if (insight.toLowerCase().includes('gas')) return `⛽ ${insight}`
    if (insight.toLowerCase().includes('security') || insight.toLowerCase().includes('fraud')) return `🛡️ ${insight}`
    if (insight.toLowerCase().includes('optimization') || insight.toLowerCase().includes('savings')) return `💰 ${insight}`
    if (insight.toLowerCase().includes('network') || insight.toLowerCase().includes('congestion')) return `🌐 ${insight}`
    return `🤖 ${insight}`
  })
}
