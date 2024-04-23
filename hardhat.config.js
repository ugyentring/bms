require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const SEPOLIA_PRIVATE_KEY =
  "f84f28305451e17ee99be53d485d897a4aacf7fa3871c7717e8057a951242970";

module.exports = {
  solidity: "0.8.0",

  networks: {
    SEPOLIA: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Je6-Fq9uU48mv6hwcrAT8czt-DLKR0lC",

      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
