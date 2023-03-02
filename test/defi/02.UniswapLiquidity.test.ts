import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";

const {DAI_WHALE, WETH, DAI} = require("../config");

describe("Test uniswap liquidity", function () {

    async function deployOneYearLockFixture() {
        const [owner] = await ethers.getSigners();

        const TestUniswapLiquidity = await ethers.getContractFactory("TestUniswapLiquidity");
        var testUniswapLiquidity = await TestUniswapLiquidity.deploy();
        await testUniswapLiquidity.deployed();


        const TOKEN_B_WHALE = await ethers.getImpersonatedSigner(DAI_WHALE);

        console.log(await owner.getBalance());


        // send ETH to cover tx fee
        await owner.sendTransaction({
            to: DAI_WHALE, value: ethers.utils.parseEther("1"), gasLimit: 30000000
        });

        let tokenA = await ethers.getContractAt("ERC20", WETH);
        let tokenB = await ethers.getContractAt("ERC20", DAI);

        await owner.sendTransaction({
            to: tokenA.address, value: ethers.utils.parseEther("1"), gasLimit: 30000000
        });


        return {testUniswapLiquidity, owner, TOKEN_B_WHALE, tokenA, tokenB}
    }

    describe("test liquidity", function () {
        it("add liquidity and remove liquidity ", async function () {
            const {testUniswapLiquidity, owner, TOKEN_B_WHALE, tokenA, tokenB} = await loadFixture(deployOneYearLockFixture);

            console.log(await tokenA.balanceOf(owner.address));
            console.log(await tokenB.balanceOf(TOKEN_B_WHALE.address));


            var amount = ethers.utils.parseEther("1");

            await tokenB.connect(TOKEN_B_WHALE).transfer(owner.address, amount);

            console.log(await tokenA.balanceOf(owner.address));
            console.log(await tokenB.balanceOf(owner.address));

            await tokenA.approve(testUniswapLiquidity.address, amount);
            await tokenB.approve(testUniswapLiquidity.address, amount);

            await testUniswapLiquidity.addLiquidity(tokenA.address, tokenB.address, amount, amount);
            await testUniswapLiquidity.removeLiquidity(tokenA.address, tokenB.address);
        });
    });
});
