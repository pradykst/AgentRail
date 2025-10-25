'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ExternalLink, Clock, CheckCircle, XCircle, Loader } from 'lucide-react'

interface Transaction {
  id: string
  hash: string
  type: 'send' | 'receive'
  amount: string
  recipient?: string
  sender?: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  network: 'ethereum' | 'hedera'
  aiOptimized: boolean
}

export function TransactionHistory() {
  const { address } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'failed'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading transaction history
    const loadTransactions = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          hash: '0x1234567890abcdef1234567890abcdef12345678',
          type: 'send',
          amount: '100.50',
          recipient: '0xabcdef1234567890abcdef1234567890abcdef12',
          timestamp: Date.now() - 3600000,
          status: 'confirmed',
          network: 'ethereum',
          aiOptimized: true
        },
        {
          id: '2',
          hash: '0xabcdef1234567890abcdef1234567890abcdef12',
          type: 'receive',
          amount: '250.00',
          sender: '0x1234567890abcdef1234567890abcdef12345678',
          timestamp: Date.now() - 7200000,
          status: 'confirmed',
          network: 'hedera',
          aiOptimized: false
        },
        {
          id: '3',
          hash: '0x9876543210fedcba9876543210fedcba98765432',
          type: 'send',
          amount: '75.25',
          recipient: '0xfedcba9876543210fedcba9876543210fedcba98',
          timestamp: Date.now() - 300000,
          status: 'pending',
          network: 'ethereum',
          aiOptimized: true
        }
      ]
      
      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    if (address) {
      loadTransactions()
    }
  }, [address])

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true
    return tx.status === filter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Loader className="w-5 h-5 text-yellow-500 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTime = (timestamp: number) => {
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

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!address) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please connect your wallet to view transaction history</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Transaction History</h2>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'pending', 'confirmed', 'failed'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(tx.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount} PYUSD
                      </span>
                      {tx.aiOptimized && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          🤖 AI Optimized
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {tx.type === 'send' ? 'To' : 'From'}: {formatAddress(tx.recipient || tx.sender || '')}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {tx.network}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{formatTime(tx.timestamp)}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Transaction Hash:</span>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <span>{formatAddress(tx.hash)}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Analytics */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {transactions.filter(tx => tx.aiOptimized).length}
            </p>
            <p className="text-sm text-gray-600">AI Optimized</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((transactions.filter(tx => tx.aiOptimized).length / transactions.length) * 100) || 0}%
            </p>
            <p className="text-sm text-gray-600">Optimization Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              ${transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Volume</p>
          </div>
        </div>
      </div>
    </div>
  )
}
