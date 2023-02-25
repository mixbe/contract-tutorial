import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";


describe("Box", function () {
    async function boxFixture() {

        const Box = await ethers.getContractFactory("Box");
        const box = await Box.deploy();
        await box.deployed();
        return {box};
    }

    it('should retrieve value previously stored', async function () {
        const {box} = await loadFixture(boxFixture);

        await box.store(42);
        expect(await box.retrieve()).to.equal(42);

        await box.store(100);
        expect(await box.retrieve()).to.equal(100);
    });

})