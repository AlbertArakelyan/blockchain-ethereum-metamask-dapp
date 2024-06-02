require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/FMEYmN2VlmkNLuchihASOx0q73DucqGn',
      accounts: ['3e72fbdfb9351393db52f4f2d293ff8605a596375f92859cb343297352e7865b'],
    },
  }
};