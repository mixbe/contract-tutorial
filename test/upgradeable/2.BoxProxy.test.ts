import {expect} from 'chai'
import {ethers, upgrades} from 'hardhat'
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {BigNumber} from "ethers";


describe("Box(proxy)", function () {
    async function boxFixture() {
        const Box = await ethers.getContractFactory("Box");

        const box = await upgrades.deployProxy(Box, [42], {initializer: "store"});
        return {box}
    }


    it('should retrive value previously stored', async function () {
        const {box} = await loadFixture(boxFixture);
        expect(await box.retrieve()).to.equal(BigNumber.from("42"));

        await box.store(100);
        expect(await box.retrieve()).to.equal(BigNumber.from("100"));

    });
})