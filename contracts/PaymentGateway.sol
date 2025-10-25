// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title PaymentGateway
 * @dev Cross-chain payment gateway integrating PayPal USD, Hedera, and AI features
 * Built for ETH Global Online 2025
 */
contract PaymentGateway is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // Events
    event PaymentProcessed(
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string hederaTxId,
        bool aiOptimized
    );
    
    event HederaTransactionCreated(
        address indexed user,
        string hederaTxId,
        uint256 amount
    );

    // State variables
    IERC20 public immutable pyusdToken;
    address public hederaBridge;
    address public aiOracle;
    
    mapping(address => uint256) public userBalances;
    mapping(string => bool) public processedHederaTxs;
    
    uint256 public totalVolume;
    uint256 public totalTransactions;
    
    // AI optimization parameters
    struct AIOptimization {
        bool enabled;
        uint256 gasOptimization;
        bool fraudDetection;
        string recommendedRoute;
    }
    
    mapping(address => AIOptimization) public userAIOptimizations;

    constructor(address _pyusdToken, address _hederaBridge, address _aiOracle) {
        pyusdToken = IERC20(_pyusdToken);
        hederaBridge = _hederaBridge;
        aiOracle = _aiOracle;
    }

    /**
     * @dev Process a payment with AI optimization
     * @param recipient The recipient address
     * @param amount The amount to transfer
     * @param useHedera Whether to use Hedera for optimization
     * @param aiOptimized Whether to use AI optimization
     */
    function processPayment(
        address recipient,
        uint256 amount,
        bool useHedera,
        bool aiOptimized
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient");
        require(recipient != msg.sender, "Cannot send to self");
        
        // Check PYUSD balance
        require(pyusdToken.balanceOf(msg.sender) >= amount, "Insufficient PYUSD balance");
        
        // AI fraud detection
        if (aiOptimized) {
            require(_performFraudDetection(msg.sender, recipient, amount), "Fraud detection failed");
        }
        
        // Transfer PYUSD
        pyusdToken.safeTransferFrom(msg.sender, address(this), amount);
        
        string memory hederaTxId = "";
        
        if (useHedera) {
            // Create Hedera transaction
            hederaTxId = _createHederaTransaction(recipient, amount);
            emit HederaTransactionCreated(msg.sender, hederaTxId, amount);
        } else {
            // Direct transfer
            pyusdToken.safeTransfer(recipient, amount);
        }
        
        // Update statistics
        totalVolume += amount;
        totalTransactions++;
        
        emit PaymentProcessed(msg.sender, recipient, amount, hederaTxId, aiOptimized);
    }

    /**
     * @dev Create a Hedera transaction for cross-chain optimization
     */
    function _createHederaTransaction(address recipient, uint256 amount) internal returns (string memory) {
        // In a real implementation, this would interact with Hedera network
        // For demo purposes, we generate a mock transaction ID
        string memory txId = string(abi.encodePacked(
            "0.0.",
            _uint2str(uint160(recipient)),
            ".",
            _uint2str(block.timestamp)
        ));
        
        processedHederaTxs[txId] = true;
        return txId;
    }

    /**
     * @dev Perform AI-powered fraud detection
     */
    function _performFraudDetection(
        address sender,
        address recipient,
        uint256 amount
    ) internal view returns (bool) {
        // In a real implementation, this would call the AI Oracle
        // For demo purposes, we perform basic checks
        
        // Check if recipient is a known contract
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(recipient)
        }
        
        // Basic amount validation
        if (amount > 1000000 * 10**6) { // 1M PYUSD limit
            return false;
        }
        
        // Check for suspicious patterns (simplified)
        if (sender == recipient) {
            return false;
        }
        
        return true;
    }

    /**
     * @dev Get AI optimization recommendations for a user
     */
    function getAIOptimization(address user) external view returns (AIOptimization memory) {
        return userAIOptimizations[user];
    }

    /**
     * @dev Set AI optimization for a user
     */
    function setAIOptimization(
        bool enabled,
        uint256 gasOptimization,
        bool fraudDetection,
        string memory recommendedRoute
    ) external {
        userAIOptimizations[msg.sender] = AIOptimization({
            enabled: enabled,
            gasOptimization: gasOptimization,
            fraudDetection: fraudDetection,
            recommendedRoute: recommendedRoute
        });
    }

    /**
     * @dev Get payment statistics
     */
    function getStats() external view returns (uint256, uint256) {
        return (totalVolume, totalTransactions);
    }

    /**
     * @dev Emergency withdrawal function (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }

    /**
     * @dev Update Hedera bridge address
     */
    function updateHederaBridge(address _newBridge) external onlyOwner {
        hederaBridge = _newBridge;
    }

    /**
     * @dev Update AI Oracle address
     */
    function updateAIOracle(address _newOracle) external onlyOwner {
        aiOracle = _newOracle;
    }

    /**
     * @dev Helper function to convert uint to string
     */
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
