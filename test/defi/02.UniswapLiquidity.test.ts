import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "ethers";

const {DAI_WHALE, WETH, DAI} = require("../config");

describe("Test uniswap liquidity", function () {

    async function deployOneYearLockFixture() {
        const [owner1, owner2, owner] = await ethers.getSigners();

        const TestUniswapLiquidity = await ethers.getContractFactory("TestUniswapLiquidity");

        var testUniswapLiquidity = await TestUniswapLiquidity.deploy();
        await testUniswapLiquidity.deployed();

        const TOKEN_B_WHALE = await ethers.getImpersonatedSigner(DAI_WHALE);

        // send ETH to cover tx fee
        await owner.sendTransaction({to: DAI_WHALE, value: ethers.utils.parseEther("1"), gasLimit: 30000000});

        let weth = await ethers.getContractAt("ERC20", WETH);
        let dai = await ethers.getContractAt("ERC20", DAI);

        // send ETH to weth contract to get WETH
        await owner.sendTransaction({to: weth.address, value: ethers.utils.parseEther("1"), gasLimit: 30000000});

        return {testUniswapLiquidity, owner, TOKEN_B_WHALE, weth, dai}
    }

    describe("test liquidity", function () {
        it("add liquidity and remove liquidity ", async function () {
            const {testUniswapLiquidity, owner, TOKEN_B_WHALE, weth, dai} = await loadFixture(deployOneYearLockFixture);

            var amount = ethers.utils.parseEther("1");
            // send 1 dai to owner address
            await dai.connect(TOKEN_B_WHALE).transfer(owner.address, amount);

            console.log(`owner tokenA balance before ${await weth.balanceOf(owner.address)}`);
            console.log(`owner tokenB balance before ${await dai.balanceOf(owner.address)}`);

            await weth.connect(owner).approve(testUniswapLiquidity.address, amount);
            await dai.connect(owner).approve(testUniswapLiquidity.address, amount);

            // add liquidity
            await testUniswapLiquidity.connect(owner).addLiquidity(weth.address, dai.address, amount, amount);

            console.log(`owner tokenA balance after ${await weth.balanceOf(owner.address)}`);
            console.log(`owner tokenB balance after ${await dai.balanceOf(owner.address)}`);

            // get amount
            let [amount1, amount2] = await testUniswapLiquidity.connect(owner).getAmount(weth.address, dai.address);
            console.log(`reserve amount ${BigNumber.from(amount1)}`);
            console.log(`reserve amount ${BigNumber.from(amount2)}`);

            // remove liquidity
            await testUniswapLiquidity.connect(owner).removeLiquidity(weth.address, dai.address);

            console.log(`owner tokenA balance now ${await weth.balanceOf(owner.address)}`);
            console.log(`owner tokenB balance now ${await dai.balanceOf(owner.address)}`);

        });
    });
});
