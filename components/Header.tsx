'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Wallet, Zap, Brain } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgentRail</h1>
                <p className="text-xs text-gray-500">AI Payment Gateway</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#partners" className="text-gray-600 hover:text-gray-900 transition-colors">
              Partners
            </a>
          </nav>

          {/* Connect Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <Brain className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
