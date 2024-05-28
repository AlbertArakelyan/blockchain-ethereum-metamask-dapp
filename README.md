# Blockchain Ethereum Metamask dApp

![Screenshot](./client/public/screenshot.png)

<div align="center">
  <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="Ethereum">
  <img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
</div>

<p align="center" style="width: 90%; margin: 0 auto">
  First <b>Blockchain</b> app where I wrote a smart contract on <b>Solidty</b> and deployed to <b>Alchemy</b> and did some transaction with <i>Ethereum</i> by sending not only a currency, but also a warm message and GIF with it. And used <b>Hardhat</b> for deploying Smart Contract.
</p>

## 📦 Installation
Ensure you have higher than 20 `node.js` version, we used `v20.13.1`.

### 1. [Hardhat](https://hardhat.org/) set up (this step is already done)
- Create a new directory called `smart_contract` in the root of your project
```bash
mkdir smart_contract
```
- Initialize an empty `package.json`
```bash
npm init -y
```
- Intsall following package as **dev dependencies**
```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomiclabs/hardhat-ether @nomiclabs/hardhat-waffle chai ethereum-waffle ethers hardhat
```
- Run init command for initialzing **Hardhat** project
```bash
npx hardhat
```
- Answer sample questions by **Hardhat** for setting up the project.
- Start writing your **smart contract** on **Solidity**

**Note that the initialized project structure and future deployment commands might differ.*

*For example for deployments `iginition/modules` directory is used, but we created `scripts/deploy.js` directory and file for deployment, also we run other commands for deploying*.

*For more information check [Hardhat documentation](https://hardhat.org/docs).*

- For testing the contract and scripts run
```bash
npx hardhat test
```

**Don't forget to install **Solidity extension** on your IDE or editor for having properly hgihglighted Solidity syntax.*

### 2. [Hardhat](https://hardhat.org/) deployement (these steps are already done)
**Please notice that we did a bit differently rather than the documentation says. You can check in **smart_contract** [README.md](./smart_contract/README.md) file.*
- Create a new `scripts` directory in your `smart_contract` directory and `deploy.js` file in it
```bash
mkdir scripts
touch deploy.js
```
- Copy the code from [smart_contract/scripts/deploy.js](./smart_contract/scripts/deploy.js) and paste into your file.
- After havong a Smart Cintract and depoyment script we are ready to deploy. But for this there are some criteria.
  - Have a MetaMask wallet (which can be installed in [chrome webstore](https://chromewebstore.google.com/)).
  - And have some ethereum balnce on it (test ethereum will aslo work). How to gain test ethereum you can check [here](#).
  - Also account on [Alchemy](https://www.alchemy.com/), whikch is platform for deploying Smart Contracts.
- After doing all mentioned above need to create an application in [Alchemy](https://www.alchemy.com/), which you can do easyly in you [dashbaord page](https://dashboard.alchemy.com/apps) right after registration. *Notice you need to select a test ethereum network for your application if you are developing it. At this moment most popular test network is [Seploia](https://sepolia.etherscan.io/)*.
- After creatiaon you will receive `Http` and `API` keys whcih you need to use in your `hardhat.config.js` file instead of `process.env` placeholders. In this file you need to set configs for your network where you are going to deploy. Check [`hardhat.config.js`](./smart_contract/hardhat.config.js) file.

**Please notice that `@nomiclabs/hardhat-waffle` module is abit old for deplyoing Smart Contract tests, `@nomicfoundation/hardhat-toolbox` can be used instead. Just I am not sure how exactly, you can try and write in discussions if you are feeling lucky with that :)*

- And finally you need you MetaMask **private key** which you can find in you MetaMask account details. 
- So now we are ready to run our deploy script
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
**Notice instead of `--network seploia` can be any another network, but it this moment Sepolia is most actual one.*

- As an output we receive the address of our contract in Alchemy, which is a some hex number like `0x4ef34....4a3f`. This address will be used in our **React app** in future, means on client side.