import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "ethers";


describe("Box V2", function () {
    async function boxFixture() {

        const BoxV2 = await ethers.getContractFactory("Box2");
        const boxV2 = await BoxV2.deploy();
        await boxV2.deployed();
        return {boxV2};
    }

    it('should retrieve value previously stored', async function () {
        const {boxV2} = await loadFixture(boxFixture);

        await boxV2.store(42);
        expect(await boxV2.retrieve()).to.equal(42);

        await boxV2.store(100);
        expect(await boxV2.retrieve()).to.equal(100);
    });

    it('should increment value correctly', async function () {
        const {boxV2} = await loadFixture(boxFixture);
        await boxV2.increment();

        expect(await boxV2.retrieve()).to.equal(BigNumber.from('1'));
    });

})