'use client'

import { useState, useEffect } from 'react'
import { Brain, Zap, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface AIAnalysis {
  riskScore: number
  recommendedRoute: 'ethereum' | 'hedera'
  gasOptimization: number
  fraudDetection: boolean
  marketConditions: 'favorable' | 'neutral' | 'unfavorable'
  aiInsights: string[]
}

export function AIIntegration() {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<'routing' | 'fraud' | 'optimization' | 'insights'>('routing')

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock AI analysis results
    const mockAnalysis: AIAnalysis = {
      riskScore: Math.floor(Math.random() * 30) + 10, // 10-40 (low risk)
      recommendedRoute: Math.random() > 0.5 ? 'hedera' : 'ethereum',
      gasOptimization: Math.floor(Math.random() * 40) + 20, // 20-60% savings
      fraudDetection: Math.random() > 0.1, // 90% safe
      marketConditions: ['favorable', 'neutral', 'unfavorable'][Math.floor(Math.random() * 3)] as any,
      aiInsights: [
        'Current gas prices are 15% below average',
        'Hedera network showing optimal performance',
        'PYUSD liquidity is high, good for large transactions',
        'Market volatility is low, safe for transfers',
        'Recommended transaction time: within next 2 hours'
      ]
    }
    
    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-green-600 bg-green-50'
    if (score < 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getMarketColor = (condition: string) => {
    switch (condition) {
      case 'favorable':
        return 'text-green-600 bg-green-50'
      case 'neutral':
        return 'text-yellow-600 bg-yellow-50'
      case 'unfavorable':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Features</h2>
        <p className="text-gray-600">
          Leveraging Artificial Superintelligence Alliance for intelligent payment routing, 
          fraud detection, and optimization
        </p>
      </div>

      {/* AI Analysis Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Real-time AI Analysis</h3>
          <button
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Risk Score</span>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.riskScore)}`}>
                {analysis.riskScore}/100
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Recommended Route</span>
              </div>
              <div className="text-lg font-semibold text-gray-900 capitalize">
                {analysis.recommendedRoute}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Gas Optimization</span>
              </div>
              <div className="text-lg font-semibold text-green-600">
                {analysis.gasOptimization}% savings
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Market Conditions</span>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getMarketColor(analysis.marketConditions)}`}>
                {analysis.marketConditions}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'routing', label: 'Smart Routing', icon: Zap },
            { id: 'fraud', label: 'Fraud Detection', icon: Shield },
            { id: 'optimization', label: 'Gas Optimization', icon: TrendingUp },
            { id: 'insights', label: 'AI Insights', icon: Brain }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedFeature(id as any)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFeature === id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Feature Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {selectedFeature === 'routing' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Routing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Ethereum Route</p>
                      <p className="text-sm text-gray-600">Direct PYUSD transfer</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">$2.50</p>
                      <p className="text-sm text-gray-500">~30s</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div>
                      <p className="font-medium text-gray-900">Hedera Route</p>
                      <p className="text-sm text-gray-600">AI-optimized path</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">$0.10</p>
                      <p className="text-sm text-gray-500">~3s</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">AI Recommendation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on current network conditions, Hedera offers 96% cost savings 
                    with faster settlement times.
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Recommended by AI
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedFeature === 'fraud' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fraud Detection</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-medium text-green-800">Address Verification</span>
                    </div>
                    <p className="text-sm text-green-700">Recipient address is verified and safe</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-medium text-green-800">Amount Analysis</span>
                    </div>
                    <p className="text-sm text-green-700">Transaction amount is within normal range</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-medium text-green-800">Pattern Recognition</span>
                    </div>
                    <p className="text-sm text-green-700">No suspicious patterns detected</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">AI Security Score: 95/100</h4>
                  <p className="text-sm text-blue-700">
                    This transaction has been analyzed by our AI system and shows no signs of fraud. 
                    All security checks have passed successfully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedFeature === 'optimization' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gas Optimization</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Current Gas Prices</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Ethereum</span>
                        <span className="font-medium">25 Gwei</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Hedera</span>
                        <span className="font-medium">0.0001 HBAR</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">AI Recommendations</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Optimal timing:</strong> Gas prices are 15% below average
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Network choice:</strong> Hedera offers 99% cost reduction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Estimated Savings</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">$2.40</p>
                      <p className="text-sm text-gray-600">Cost Savings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">96%</p>
                      <p className="text-sm text-gray-600">Reduction</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">27s</p>
                      <p className="text-sm text-gray-600">Time Saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedFeature === 'insights' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                {analysis?.aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Market Intelligence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">PYUSD Liquidity</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">High liquidity available</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Network Congestion</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Moderate congestion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
