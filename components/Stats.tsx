'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Zap, Shield } from 'lucide-react'

export function Stats() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalVolume: 0,
    activeUsers: 0,
    successRate: 0
  })

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5),
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 1000),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 2),
        successRate: Math.min(99.9, prev.successRate + Math.random() * 0.1)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalTransactions)}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Volume</p>
            <p className="text-2xl font-bold text-gray-900">${formatNumber(stats.totalVolume)}</p>
          </div>
          <Zap className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.activeUsers)}</p>
          </div>
          <Users className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Success Rate</p>
            <p className="text-2xl font-bold text-gray-900">{stats.successRate.toFixed(1)}%</p>
          </div>
          <Shield className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  )
}
