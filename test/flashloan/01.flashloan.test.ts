import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "ethers";

describe("Flash Swap Test", function () {
    const USDCHolder = "0xd81023C07B23f2b1BA544769C22A6C9c1bBd017e";
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const borrowAmount = 1000000000; // 1000

    async function deployOneYearLockFixture() {
        const [owner] = await ethers.getSigners();

        const TestFlashSwapFactory = await ethers.getContractFactory("Flashswap");
        const testFlashSwap = await TestFlashSwapFactory.deploy();
        await testFlashSwap.deployed();

        const USDC_WHALE = await ethers.getImpersonatedSigner(USDCHolder);
        // send ETH to cover tx fee
        await owner.sendTransaction({to: USDC_WHALE.address, value: ethers.utils.parseEther("1"), gasLimit: 30000000});


        const USDCContract = await ethers.getContractAt("ERC20", USDCAddress);
        const USDCHolderBalance = await USDCContract.balanceOf(USDC_WHALE.address)
        console.log(`USDC Holder Balance: ${USDCHolderBalance}`)

        return {testFlashSwap, USDC_WHALE, USDCContract}
    }

    describe("Flash swap", function () {
        it("Flash swap test", async function () {
            const {testFlashSwap, USDC_WHALE, USDCContract} = await loadFixture(deployOneYearLockFixture);

            const fee = Math.round(((borrowAmount * 3) / 997)) + 1;
            await USDCContract.connect(USDC_WHALE).transfer(testFlashSwap.address, fee)
            await testFlashSwap.testFlashSwap(USDCContract.address, borrowAmount)
            const TestFlashSwapContractBalance = await USDCContract.balanceOf(testFlashSwap.address)
            expect(TestFlashSwapContractBalance.eq(BigNumber.from("0"))).to.be.true;
        });
    });
});
