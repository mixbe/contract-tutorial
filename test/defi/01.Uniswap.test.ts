import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {ethers} from "hardhat";
import {expect} from "chai";
import {BigNumber} from "ethers";

const {DAI, WBTC, WBTC_WHALE} = require("../config");

describe("Test UniSwap", function () {
    const WHALE = WBTC_WHALE;
    const AMOUNT_IN = 100000000;
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = WBTC;
    const TOKEN_OUT = DAI;

    async function deployOneYearLockFixture() {

        const [owner] = await ethers.getSigners();

        const TestUniSwap = await ethers.getContractFactory("TestUniswap");
        let testUniswap = await TestUniSwap.deploy();
        await testUniswap.deployed();

        let tokenIn = await ethers.getContractAt("ERC20", TOKEN_IN);
        let tokenOut = await ethers.getContractAt("ERC20", TOKEN_OUT);

        const WHALE_WBTC = await ethers.getImpersonatedSigner(WBTC_WHALE);

        await tokenIn.connect(WHALE_WBTC).approve(testUniswap.address, AMOUNT_IN);

        return {owner, WHALE_WBTC, testUniswap, tokenIn, tokenOut}
    }

    describe("swap", function () {
        it("Should pass", async function () {
            const {owner, WHALE_WBTC, testUniswap, tokenIn, tokenOut} = await loadFixture(deployOneYearLockFixture);

            expect(await tokenIn.balanceOf(WHALE_WBTC.address)).gt(BigNumber.from(AMOUNT_IN));

            await testUniswap.connect(WHALE_WBTC).swap(tokenIn.address, tokenOut.address, AMOUNT_IN, AMOUNT_OUT_MIN, owner.address);

            console.log(`in ${AMOUNT_IN}`);
            console.log(`out ${await tokenOut.balanceOf(owner.address)}`);
        });
    });
});
