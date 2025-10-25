const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentGateway", function () {
  let paymentGateway;
  let pyusdToken;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy mock PYUSD token
    const MockPYUSD = await ethers.getContractFactory("MockPYUSD");
    pyusdToken = await MockPYUSD.deploy();
    await pyusdToken.deployed();

    // Deploy PaymentGateway
    const PaymentGateway = await ethers.getContractFactory("PaymentGateway");
    paymentGateway = await PaymentGateway.deploy(
      pyusdToken.address,
      ethers.constants.AddressZero, // Hedera bridge placeholder
      ethers.constants.AddressZero  // AI oracle placeholder
    );
    await paymentGateway.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct PYUSD token address", async function () {
      expect(await paymentGateway.pyusdToken()).to.equal(pyusdToken.address);
    });

    it("Should set the correct owner", async function () {
      expect(await paymentGateway.owner()).to.equal(owner.address);
    });
  });

  describe("Payment Processing", function () {
    beforeEach(async function () {
      // Mint PYUSD tokens to user1
      await pyusdToken.mint(user1.address, ethers.utils.parseEther("1000"));
      
      // Approve PaymentGateway to spend PYUSD
      await pyusdToken.connect(user1).approve(paymentGateway.address, ethers.utils.parseEther("100"));
    });

    it("Should process a payment successfully", async function () {
      const amount = ethers.utils.parseEther("10");
      
      await expect(
        paymentGateway.connect(user1).processPayment(
          user2.address,
          amount,
          false, // useHedera
          false  // aiOptimized
        )
      ).to.emit(paymentGateway, "PaymentProcessed");

      expect(await pyusdToken.balanceOf(user2.address)).to.equal(amount);
    });

    it("Should fail with insufficient balance", async function () {
      const amount = ethers.utils.parseEther("2000"); // More than user1 has
      
      await expect(
        paymentGateway.connect(user1).processPayment(
          user2.address,
          amount,
          false,
          false
        )
      ).to.be.revertedWith("Insufficient PYUSD balance");
    });

    it("Should fail with zero amount", async function () {
      await expect(
        paymentGateway.connect(user1).processPayment(
          user2.address,
          0,
          false,
          false
        )
      ).to.be.revertedWith("Amount must be greater than 0");
    });
  });

  describe("AI Optimization", function () {
    it("Should allow users to set AI optimization preferences", async function () {
      await paymentGateway.connect(user1).setAIOptimization(
        true,  // enabled
        25,    // gasOptimization
        true,  // fraudDetection
        "hedera" // recommendedRoute
      );

      const optimization = await paymentGateway.getAIOptimization(user1.address);
      expect(optimization.enabled).to.be.true;
      expect(optimization.gasOptimization).to.equal(25);
      expect(optimization.fraudDetection).to.be.true;
      expect(optimization.recommendedRoute).to.equal("hedera");
    });
  });

  describe("Statistics", function () {
    it("Should track total volume and transactions", async function () {
      const amount = ethers.utils.parseEther("10");
      
      // Mint and approve tokens
      await pyusdToken.mint(user1.address, ethers.utils.parseEther("100"));
      await pyusdToken.connect(user1).approve(paymentGateway.address, amount);
      
      // Process payment
      await paymentGateway.connect(user1).processPayment(
        user2.address,
        amount,
        false,
        false
      );

      const [totalVolume, totalTransactions] = await paymentGateway.getStats();
      expect(totalVolume).to.equal(amount);
      expect(totalTransactions).to.equal(1);
    });
  });
});

// Mock PYUSD token for testing
contract("MockPYUSD", function () {
  // This would be implemented as a separate contract file
  // For now, we'll assume it exists with standard ERC20 functions
});
