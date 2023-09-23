const hre = require("hardhat");

const CONTRACT_ADDRS = require("../config/contractAddrs.json");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const factoryAddress = CONTRACT_ADDRS.UniswapV2Factory;
  const wethAddress = CONTRACT_ADDRS.WETH;

  console.log("Deploying Uniswap V2 Router with the account:", deployer.address);

  const UniswapV2Router02 = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.deploy(factoryAddress, wethAddress);

  await router.deployed();

  console.log("UniswapV2Router02 deployed to:", router.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
