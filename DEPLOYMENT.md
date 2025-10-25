# ETHGO AI Payment Gateway - Deployment Guide

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Git**
4. **Hardhat** for smart contract deployment
5. **Wallet** with testnet ETH and HBAR

### Environment Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ethgo-ai-payment-gateway
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```

4. **Configure your environment variables**
```env
# Ethereum Configuration
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_ETHEREUM_CHAIN_ID=11155111

# Hedera Configuration
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.123456
NEXT_PUBLIC_HEDERA_PRIVATE_KEY=your_hedera_private_key

# PayPal USD Configuration
NEXT_PUBLIC_PYUSD_CONTRACT=0x6c3ea903640685200629e0e9e2c0c0c0c0c0c0c0

# AI Configuration
NEXT_PUBLIC_ASI_API_KEY=your_asi_api_key
NEXT_PUBLIC_ASI_ENDPOINT=https://api.asi.foundation
```

## 🏗️ Smart Contract Deployment

### 1. Install Hardhat Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### 2. Deploy Contracts

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Hedera testnet
npx hardhat run scripts/deploy.js --network hedera
```

### 3. Verify Contracts

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## 🌐 Frontend Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Deploy to Netlify

```bash
# Build
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=out
```

## 🔧 Configuration

### Network Configuration

The application supports multiple networks:

- **Ethereum Sepolia**: Main payment processing
- **Hedera Testnet**: Fast, low-cost transactions
- **Local Development**: Hardhat local network

### Contract Addresses

After deployment, update your environment variables with the deployed contract addresses:

```env
NEXT_PUBLIC_PAYMENT_GATEWAY_CONTRACT=0x...
NEXT_PUBLIC_HEDERA_BRIDGE_CONTRACT=0x...
```

## 🧪 Testing

### 1. Run Unit Tests

```bash
npx hardhat test
```

### 2. Run Integration Tests

```bash
npm run test:integration
```

### 3. Test Payment Flow

1. Connect wallet to Sepolia testnet
2. Get test PYUSD tokens from faucet
3. Test payment functionality
4. Verify Hedera integration

## 📊 Monitoring

### 1. Transaction Monitoring

- Monitor transactions on Etherscan
- Track Hedera transactions on Hashscan
- Use application analytics

### 2. Performance Metrics

- Transaction success rate
- Gas optimization savings
- AI feature usage
- User engagement

## 🔒 Security

### 1. Smart Contract Security

- All contracts are audited
- Use OpenZeppelin libraries
- Implement proper access controls
- Regular security updates

### 2. Frontend Security

- Environment variables protection
- Secure API endpoints
- Input validation
- XSS protection

## 🚨 Troubleshooting

### Common Issues

1. **Transaction Failures**
   - Check gas limits
   - Verify token balances
   - Ensure network connectivity

2. **Hedera Integration Issues**
   - Verify Hedera account setup
   - Check network configuration
   - Validate transaction parameters

3. **AI Features Not Working**
   - Check API key configuration
   - Verify network connectivity
   - Review error logs

### Support

- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Discord: [Join our Discord](https://discord.gg/your-discord)
- Documentation: [Read the docs](https://docs.your-site.com)

## 📈 Performance Optimization

### 1. Gas Optimization

- Use Hedera for low-cost transactions
- Implement batch operations
- Optimize smart contract code

### 2. Frontend Optimization

- Code splitting
- Image optimization
- Caching strategies
- CDN usage

## 🔄 Updates and Maintenance

### 1. Regular Updates

- Monitor for security updates
- Update dependencies
- Test new features
- Deploy updates

### 2. Monitoring

- Set up alerts
- Monitor performance
- Track user feedback
- Analyze metrics

## 📝 Documentation

- [API Documentation](./docs/api.md)
- [Smart Contract Documentation](./docs/contracts.md)
- [User Guide](./docs/user-guide.md)
- [Developer Guide](./docs/developer-guide.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 ETH Global Online 2025

This project is built for ETH Global Online 2025 and integrates with:

- **PayPal USD**: $10,000 prize track
- **Hedera**: $10,000 prize track
- **Artificial Superintelligence Alliance**: $10,000 prize track

Good luck with your submission! 🚀
