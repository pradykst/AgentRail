// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title HederaBridge
 * @dev Bridge contract for Hedera Hashgraph integration
 * Enables fast, low-cost transactions through Hedera network
 */
contract HederaBridge is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // Events
    event HederaTransactionInitiated(
        address indexed user,
        string hederaTxId,
        uint256 amount,
        address token
    );
    
    event HederaTransactionCompleted(
        string indexed hederaTxId,
        address indexed recipient,
        uint256 amount
    );

    // State variables
    mapping(string => bool) public processedTransactions;
    mapping(string => TransactionData) public transactionData;
    
    uint256 public totalBridgedAmount;
    uint256 public totalBridgedTransactions;
    
    struct TransactionData {
        address user;
        address recipient;
        uint256 amount;
        address token;
        uint256 timestamp;
        bool completed;
    }

    /**
     * @dev Initiate a Hedera transaction
     * @param recipient The recipient address on Hedera
     * @param amount The amount to bridge
     * @param token The token contract address
     */
    function initiateHederaTransaction(
        address recipient,
        uint256 amount,
        address token
    ) external nonReentrant returns (string memory) {
        require(amount > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient");
        
        // Transfer tokens to bridge
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        
        // Generate Hedera transaction ID
        string memory hederaTxId = _generateHederaTxId(recipient, amount);
        
        // Store transaction data
        transactionData[hederaTxId] = TransactionData({
            user: msg.sender,
            recipient: recipient,
            amount: amount,
            token: token,
            timestamp: block.timestamp,
            completed: false
        });
        
        // Update statistics
        totalBridgedAmount += amount;
        totalBridgedTransactions++;
        
        emit HederaTransactionInitiated(msg.sender, hederaTxId, amount, token);
        
        return hederaTxId;
    }

    /**
     * @dev Complete a Hedera transaction (called by Hedera network)
     * @param hederaTxId The Hedera transaction ID
     * @param recipient The recipient address
     * @param amount The amount to transfer
     */
    function completeHederaTransaction(
        string memory hederaTxId,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(!processedTransactions[hederaTxId], "Transaction already processed");
        require(transactionData[hederaTxId].amount == amount, "Amount mismatch");
        
        processedTransactions[hederaTxId] = true;
        transactionData[hederaTxId].completed = true;
        
        // Transfer tokens to recipient
        IERC20(transactionData[hederaTxId].token).safeTransfer(recipient, amount);
        
        emit HederaTransactionCompleted(hederaTxId, recipient, amount);
    }

    /**
     * @dev Get transaction data by Hedera transaction ID
     */
    function getTransactionData(string memory hederaTxId) external view returns (TransactionData memory) {
        return transactionData[hederaTxId];
    }

    /**
     * @dev Check if a Hedera transaction is completed
     */
    function isTransactionCompleted(string memory hederaTxId) external view returns (bool) {
        return processedTransactions[hederaTxId];
    }

    /**
     * @dev Get bridge statistics
     */
    function getBridgeStats() external view returns (uint256, uint256) {
        return (totalBridgedAmount, totalBridgedTransactions);
    }

    /**
     * @dev Generate a mock Hedera transaction ID
     * In a real implementation, this would interact with Hedera network
     */
    function _generateHederaTxId(address recipient, uint256 amount) internal view returns (string memory) {
        return string(abi.encodePacked(
            "0.0.",
            _uint2str(uint160(recipient)),
            ".",
            _uint2str(block.timestamp),
            ".",
            _uint2str(amount)
        ));
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
