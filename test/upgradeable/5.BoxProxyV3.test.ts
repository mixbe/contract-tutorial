import {expect} from 'chai'
import {ethers, upgrades} from 'hardhat'
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {BigNumber} from "ethers";


describe("Box(proxy) V3", function () {
    async function boxFixture() {
        const Box = await ethers.getContractFactory("Box")
        const Box2 = await ethers.getContractFactory("Box2");
        const Box3 = await ethers.getContractFactory("Box3")

        // deploy proxy and init
        const box = await upgrades.deployProxy(Box, [42], {initializer: "store"});
        const boxV2 = await upgrades.upgradeProxy(box.address, Box2);
        const boxV3 = await upgrades.upgradeProxy(box.address, Box3)

        return {boxV2, boxV3}
    }


    it('should retrive value previously stored in v3', async function () {
        const {boxV3} = await loadFixture(boxFixture);
        expect(await boxV3.retrieve()).to.equal(BigNumber.from("42"));

        await boxV3.store(100);
        expect(await boxV3.retrieve()).to.equal(BigNumber.from("100"));

    });

    it('should increment value correctly v3', async function () {
        const {boxV3} = await loadFixture(boxFixture);

        await boxV3.increment();
        expect(await boxV3.retrieve()).to.equal(BigNumber.from("43"))
    });

    it('should set name correctly in V3', async function () {
        const {boxV3} = await loadFixture(boxFixture);
        const boxname = "my box v3";
        await boxV3.setName(boxname);
        expect(await boxV3.name()).to.equal(boxname);
    });

})