require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/pz7YIPn0BD3oPxcmwyVIBGeelgeEM7WW",
      accounts: [
        "2669ce15f01dba9b4251411f4f76ed2b30ead2f0b6fed9367b1332ad6669ff9d",
      ],
    },
  },
};
