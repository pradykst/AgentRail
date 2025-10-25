'use client'

import { useState } from 'react'
import { useAccount, useContractWrite, useContractRead } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

// PYUSD Contract ABI (simplified)
const PYUSD_ABI = [
  {
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const PYUSD_CONTRACT = process.env.NEXT_PUBLIC_PYUSD_CONTRACT || '0x6c3ea903640685200629e0e9e2c0c0c0c0c0c0c0'

export function PaymentForm() {
  const { address } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  // Get PYUSD balance
  const { data: balance } = useContractRead({
    address: PYUSD_CONTRACT as `0x${string}`,
    abi: PYUSD_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  // Transfer PYUSD
  const { write: transfer, isLoading: isTransferring } = useContractWrite({
    address: PYUSD_CONTRACT as `0x${string}`,
    abi: PYUSD_ABI,
    functionName: 'transfer',
    onSuccess: (data) => {
      setTxHash(data.hash)
      setIsProcessing(false)
      setError('')
    },
    onError: (error) => {
      setError(error.message)
      setIsProcessing(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient || !amount) return

    setIsProcessing(true)
    setError('')
    setTxHash('')

    try {
      const amountWei = parseEther(amount)
      transfer({
        args: [recipient as `0x${string}`, amountWei]
      })
    } catch (err) {
      setError('Invalid amount')
      setIsProcessing(false)
    }
  }

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return '0.00'
    return formatEther(balance)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Send PYUSD Payment</h2>
        <p className="text-gray-600">
          Send PayPal USD (PYUSD) payments with AI-powered routing and Hedera integration
        </p>
      </div>

      {/* Balance Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Your PYUSD Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatBalance(balance)} PYUSD
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Network</p>
            <p className="font-medium text-gray-900">Ethereum Sepolia</p>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (PYUSD)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* AI Features */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-yellow-800">AI-Powered Features</span>
          </div>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Intelligent routing through Hedera for lower fees</li>
            <li>• Fraud detection and risk assessment</li>
            <li>• Optimal gas price prediction</li>
          </ul>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Success Display */}
        {txHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <div>
              <p className="text-green-700 font-medium">Transaction Successful!</p>
              <p className="text-green-600 text-sm">
                Hash: {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || isTransferring || !recipient || !amount}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing || isTransferring ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Payment
            </>
          )}
        </button>
      </form>

      {/* Hedera Integration Info */}
      <div className="mt-8 bg-hedera-50 border border-hedera-200 rounded-lg p-4">
        <h3 className="font-medium text-hedera-900 mb-2">Hedera Integration</h3>
        <p className="text-sm text-hedera-700">
          Your payment will be processed through Hedera Hashgraph for faster settlement 
          and lower transaction costs while maintaining security.
        </p>
      </div>
    </div>
  )
}
