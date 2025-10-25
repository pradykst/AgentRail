export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">AgentRail AI Payment Gateway</h3>
            <p className="text-gray-400 mb-4">
              Revolutionary cross-chain payment gateway combining PayPal USD, 
              Hedera Hashgraph, and AI-powered features for seamless blockchain transactions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-gray-400">
              <li>PayPal USD</li>
              <li>Hedera Hashgraph</li>
              <li>Artificial Superintelligence Alliance</li>
            </ul>
          </div>

          {/* ETH Global */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ETH Global Online 2025</h4>
            <p className="text-gray-400 text-sm">
              Built for ETH Global Online 2025 hackathon
            </p>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                🏆 Hackathon Project
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AgentRail. Built for ETH Global Online 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
