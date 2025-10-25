const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying AgentRail AI Payment Gateway contracts...");

  // Get the contract factories
  const PaymentGateway = await ethers.getContractFactory("PaymentGateway");
  const HederaBridge = await ethers.getContractFactory("HederaBridge");

  // PYUSD contract address on Sepolia (you'll need to get the actual address)
  const PYUSD_ADDRESS = process.env.PYUSD_CONTRACT || "0x6c3ea903640685200629e0e9e2c0c0c0c0c0c0c0";
  const HEDERA_BRIDGE_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
  const AI_ORACLE_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

  console.log("📋 Deployment parameters:");
  console.log(`PYUSD Contract: ${PYUSD_ADDRESS}`);
  console.log(`Hedera Bridge: ${HEDERA_BRIDGE_ADDRESS}`);
  console.log(`AI Oracle: ${AI_ORACLE_ADDRESS}`);

  // Deploy HederaBridge first
  console.log("\n🌉 Deploying HederaBridge...");
  const hederaBridge = await HederaBridge.deploy();
  await hederaBridge.deployed();
  console.log(`✅ HederaBridge deployed to: ${hederaBridge.address}`);

  // Deploy PaymentGateway
  console.log("\n💳 Deploying PaymentGateway...");
  const paymentGateway = await PaymentGateway.deploy(
    PYUSD_ADDRESS,
    hederaBridge.address,
    AI_ORACLE_ADDRESS
  );
  await paymentGateway.deployed();
  console.log(`✅ PaymentGateway deployed to: ${paymentGateway.address}`);

  // Update HederaBridge address in PaymentGateway
  console.log("\n🔗 Updating HederaBridge reference...");
  await paymentGateway.updateHederaBridge(hederaBridge.address);
  console.log("✅ HederaBridge reference updated");

  // Verify contracts
  console.log("\n🔍 Verifying contracts...");
  try {
    await hre.run("verify:verify", {
      address: hederaBridge.address,
      constructorArguments: [],
    });
    console.log("✅ HederaBridge verified");
  } catch (error) {
    console.log("⚠️ HederaBridge verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: paymentGateway.address,
      constructorArguments: [PYUSD_ADDRESS, hederaBridge.address, AI_ORACLE_ADDRESS],
    });
    console.log("✅ PaymentGateway verified");
  } catch (error) {
    console.log("⚠️ PaymentGateway verification failed:", error.message);
  }

  // Output deployment summary
  console.log("\n🎉 Deployment completed successfully!");
  console.log("=" * 50);
  console.log("📋 Contract Addresses:");
  console.log(`HederaBridge: ${hederaBridge.address}`);
  console.log(`PaymentGateway: ${paymentGateway.address}`);
  console.log("=" * 50);
  console.log("\n📝 Next steps:");
  console.log("1. Update your .env file with the contract addresses");
  console.log("2. Fund the contracts with test tokens if needed");
  console.log("3. Test the payment functionality");
  console.log("4. Deploy to mainnet when ready");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      HederaBridge: hederaBridge.address,
      PaymentGateway: paymentGateway.address,
      PYUSD: PYUSD_ADDRESS
    },
    transactionHashes: {
      HederaBridge: hederaBridge.deployTransaction.hash,
      PaymentGateway: paymentGateway.deployTransaction.hash
    }
  };

  const fs = require('fs');
  fs.writeFileSync(
    `deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log(`\n💾 Deployment info saved to deployments/${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
