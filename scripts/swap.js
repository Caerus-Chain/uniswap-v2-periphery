const hre = require("hardhat");
const ethers = hre.ethers;
const CONTRACT_ADDRS = require("../config/contractAddrs.json");

async function main() {
    const [deployer] = await ethers.getSigners();
    const caerusAddress = CONTRACT_ADDRS.CAERUS;
    const routerAddress = CONTRACT_ADDRS.UniswapV2Router02;

    // Fetch existing contracts
    const caerus = await ethers.getContractAt("IERC20", caerusAddress);
    const router = await ethers.getContractAt("IUniswapV2Router02", routerAddress);

    // Amounts
    const amountIn = ethers.utils.parseEther("0.1"); // 0.1 CAERUS
    const amountOutMin = ethers.utils.parseEther("0.01"); // 0.01 ETH

    // Approve Router to spend CAERUS tokens
    tx = await caerus.approve(router.address, amountIn);
    await tx.wait();
    console.log(`Approved Router to spend ${ethers.utils.formatEther(amountIn)} CAERUS`);

    // Path (CAERUS -> WETH)
    const path = [caerusAddress, await router.WETH()];

    // Swap CAERUS for ETH
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
    tx = await router.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        deployer.address,
        deadline
    );
    await tx.wait();
    console.log("Successfully swapped CAERUS for ETH");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// Approved Router to spend 0.1 CAERUS
// Successfully swapped CAERUS for ETH