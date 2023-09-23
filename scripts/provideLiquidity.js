const hre = require("hardhat");
const ethers = hre.ethers;
const CONTRACT_ADDRS = require("../config/contractAddrs.json");

async function main() {
    const [deployer] = await ethers.getSigners();

    const caerusAddress = CONTRACT_ADDRS.CAERUS;
    const routerAddress = CONTRACT_ADDRS.UniswapV2Router02; // Make sure this is populated

    // Fetch existing contracts
    const caerus = await ethers.getContractAt("IERC20", caerusAddress);
    const router = await ethers.getContractAt("IUniswapV2Router02", routerAddress);

    // Amounts
    const amountToken = ethers.utils.parseEther("1000"); // 1000 CAERUS token
    const amountETH = ethers.utils.parseEther("1000"); // 1000 ETH

    // Slippage (Optional, you can set this to zero if needed)
    const amountTokenMin = ethers.utils.parseEther("999"); // Minimum 999 CAERUS tokens
    const amountETHMin = ethers.utils.parseEther("999"); // Minimum 999 ETH

    // Approve router contract to spend CAERUS tokens
    tx = await caerus.approve(router.address, amountToken);
    await tx.wait();
    console.log(`Approved Router to spend ${ethers.utils.formatEther(amountToken)} CAERUS`);

    // Add Liquidity
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    tx = await router.addLiquidityETH(
        caerus.address,
        amountToken,
        amountTokenMin,
        amountETHMin,
        deployer.address,
        deadline,
        { value: amountETH }
    );
    await tx.wait();
    console.log("Added liquidity successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// Approved Router to spend 1000.0 CAERUS
// Added liquidity successfully