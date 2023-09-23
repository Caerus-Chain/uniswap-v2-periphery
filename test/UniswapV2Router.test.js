const { ethers } = require("hardhat");
const { expect } = require("chai");

const CONTRACT_ADDRS = require("../config/contractAddrs.json");

describe("Uniswap V2 Liquidity and Swap Test", function () {
  let weth, caerus, factory, router;
  let owner;

  const ownerAddress = "0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea";

  before(async function () {
    owner = await ethers.getImpersonatedSigner(ownerAddress);

    weth = await ethers.getContractAt("IERC20", CONTRACT_ADDRS.WETH);
    caerus = await ethers.getContractAt("IERC20", CONTRACT_ADDRS.CAERUS);
    factory = await ethers.getContractAt("IUniswapV2Factory", CONTRACT_ADDRS.UniswapV2Factory);

    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
    router = await UniswapV2Router02.deploy(factory.address, weth.address);
    await router.deployed();
  });

  it("Should provide liquidity", async function () {
    // Approve Router to spend CAERUS
    await caerus.connect(owner).approve(router.address, ethers.utils.parseEther("10"));

    const amountA = ethers.utils.parseEther("1");
    const amountB = ethers.utils.parseEther("1");
    const amountAMin = 0;
    const amountBMin = 0;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    // Provide liquidity
    await router.connect(owner).addLiquidityETH(
      caerus.address,
      amountA,
      amountAMin,
      amountBMin,
      owner.address,
      deadline,
      { value: amountB }
    )
  });

  it("Should swap exact tokens for tokens", async function () {
    // Approve Router to spend CAERUS
    await caerus.connect(owner).approve(router.address, ethers.utils.parseEther("10"));

    const amountIn = ethers.utils.parseEther("0.1");
    const amountOutMin = 0; // slippage
    const path = [caerus.address, weth.address];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    // Perform the swap
    await expect(
      router.connect(owner).swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        owner.address,
        deadline
      )
    ).to.emit(caerus, "Transfer");
  });
});
