// Configuration for AgentRail AI Payment Gateway
export const config = {
  // Network configurations
  networks: {
    ethereum: {
      chainId: 11155111, // Sepolia
      rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://sepolia.infura.io/v3/your-key',
      name: 'Ethereum Sepolia'
    },
    hedera: {
      network: process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet',
      accountId: process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID || '0.0.123456',
      name: 'Hedera Testnet'
    }
  },

  // Contract addresses (Sepolia testnet)
  contracts: {
    pyusd: process.env.NEXT_PUBLIC_PYUSD_CONTRACT || '0x6c3ea903640685200629e0e9e2c0c0c0c0c0c0c0',
    paymentGateway: '0x1234567890abcdef1234567890abcdef12345678', // Deploy this
    hederaBridge: '0xabcdef1234567890abcdef1234567890abcdef12' // Deploy this
  },

  // AI Configuration
  ai: {
    apiKey: process.env.NEXT_PUBLIC_ASI_API_KEY || '',
    endpoint: process.env.NEXT_PUBLIC_ASI_ENDPOINT || 'https://api.asi.foundation',
    features: {
      fraudDetection: true,
      gasOptimization: true,
      smartRouting: true,
      marketAnalysis: true
    }
  },

  // Application settings
  app: {
    name: 'AgentRail AI Payment Gateway',
    description: 'Cross-Chain AI Payment Gateway for ETH Global Online 2025',
    version: '1.0.0',
    author: 'AgentRail Team'
  },

  // Payment settings
  payment: {
    minAmount: 0.01, // Minimum payment amount
    maxAmount: 1000000, // Maximum payment amount
    defaultGasLimit: 100000,
    hederaFee: 0.0001 // HBAR fee for Hedera transactions
  },

  // UI settings
  ui: {
    theme: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    animations: {
      duration: 300,
      easing: 'ease-in-out'
    }
  }
}

export default config
