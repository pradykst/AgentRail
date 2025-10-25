'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { PaymentForm } from '@/components/PaymentForm'
import { TransactionHistory } from '@/components/TransactionHistory'
import { AIIntegration } from '@/components/AIIntegration'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Stats } from '@/components/Stats'

export default function Home() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('payment')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ETHGO AI Payment Gateway
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionary cross-chain payment gateway combining PayPal USD, Hedera Hashgraph, 
            and AI-powered features for seamless blockchain transactions.
          </p>
          
          {!isConnected && (
            <div className="mb-8">
              <ConnectButton />
            </div>
          )}
        </div>

        {/* Stats Section */}
        <Stats />

        {/* Main Content */}
        {isConnected ? (
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === 'payment'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  💳 Payment
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📊 History
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🤖 AI Features
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'payment' && <PaymentForm />}
              {activeTab === 'history' && <TransactionHistory />}
              {activeTab === 'ai' && <AIIntegration />}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Connect your wallet to start using the ETHGO AI Payment Gateway
              </p>
              <ConnectButton />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
