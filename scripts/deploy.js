const hre = require("hardhat");

async function main() {
  const lottery = await hre.ethers.deployContract("Lottery");

  await lottery.waitForDeployment();

  console.log(`deployed to ${lottery.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// 0x8597D77653f3E9a99123e3da5c26b193066816c3
