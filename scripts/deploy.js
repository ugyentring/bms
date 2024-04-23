
const hre = require("hardhat");

async function main() {
  const Smedia = await hre.ethers.getContractFactory("Smedia");
  const smedia = await Smedia.deploy();

  await smedia.deployed();

  console.log("Smedia deployed to:", smedia.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
