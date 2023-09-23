# Uniswap V2

[![Actions Status](https://github.com/Uniswap/uniswap-v2-periphery/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-periphery/actions)
[![npm](https://img.shields.io/npm/v/@uniswap/v2-periphery?style=flat-square)](https://npmjs.com/package/@uniswap/v2-periphery)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@uniswap/v2-periphery@latest/).

## Overview
This repository contains smart contracts and scripts that facilitate the deployment of `Uniswap V2 Router` contracts. The included Hardhat scripts provide functionalities to easily deploy these routers to different Caerus networks. The repository aims to assist in initializing and configuring `Uniswap V2 Router` contracts for liquidity provision and token swaps.

## Prerequisites
- **Node.js** v12+ LTS and npm (comes with Node)
- **Hardhat**

## Installation
Clone the repository:
```
git clone https://github.com/Caerus-Chain/uniswap-v2-periphery
```
Navigate to the project folder:
```
cd uniswap-v2-periphery
```
Install dependencies:
```
npm install
```

## Set Up Configuration:
1. Review the `.example.env` file.
2. Create a `.env` file based on the example and adjust the values as needed.

For Linux or macOS:
```
cp .example.env .env
```
For Windows:
```
copy .example.env .env
```

## Compilation
Compile the smart contracts using Hardhat:
```
npx hardhat compile
```

## Quick Start Guide
### 1. Testing
Run the following command to execute the contract tests. Make sure you've written the tests in your Hardhat project's `test` directory.
```
npx hardhat test
```

### 2. Deployment:
Run the following command to compile the contracts using the Solidity compiler and deploy the `UniswapV2Router02` to your Caerus network.
```
npx hardhat run scripts/deploy.js --network caerus
```

### 3. Providing Liquidity:
After deploying the `UniswapV2Router02`, you can use the following command to execute the liquidity provision script. This will add liquidity to a specific Uniswap V2 pair using CAERUS tokens and ETH.
```
npx hardhat run scripts/provideLiquidity.js --network caerus
```

## Conclusion
If you would like to contribute to the project, please fork the repository, make your changes, and then submit a pull request. We appreciate all contributions and feedback!