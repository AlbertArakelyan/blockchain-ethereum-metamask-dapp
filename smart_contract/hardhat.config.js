require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_APP_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  }
};