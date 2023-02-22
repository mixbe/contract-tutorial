// We import Chai to use its asserting functions here.
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {ethers} from "hardhat";
import {GLDToken} from "../../typechain-types";

const {expect} = require("chai");


describe("GLDToken contract", function () {

    //  async function deployOneYearLockFixture() {

    async function deployGldTokenFixture() {
        let totalSupply = '10000000000000000000000'; // 10000 * 1e18
        let Token;
        let hardhatToken: GLDToken;

        Token = await ethers.getContractFactory("GLDToken");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const token = await Token.deploy(totalSupply);

        return {token, owner, addr1, addr2, totalSupply};
    }

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.

    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {

        it("Should assign the total supply of tokens to the owner", async function () {
            const {token, owner} = await loadFixture(deployGldTokenFixture);

            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });

    });

    describe("Transactions", function () {

        it("Should transfer tokens between accounts", async function () {
            const {token, owner, addr1, addr2, totalSupply} = await loadFixture(deployGldTokenFixture);

            expect(await token.balanceOf(owner.address)).to.equal(totalSupply)
            expect(await token.totalSupply()).to.equal(totalSupply)

            // Transfer 50 tokens from owner to addr1
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const {token, owner, addr1} = await loadFixture(deployGldTokenFixture);

            const initialOwnerBalance = await token.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                token.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await token.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

    });
});