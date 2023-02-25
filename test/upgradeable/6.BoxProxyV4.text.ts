import {expect} from 'chai'
import {ethers, upgrades} from 'hardhat'
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {BigNumber} from "ethers";


describe("Box(proxy) V4", function () {
    async function boxFixture() {
        const Box = await ethers.getContractFactory("Box");
        const Box2 = await ethers.getContractFactory("Box2");
        const Box3 = await ethers.getContractFactory("Box3");
        const Box4 = await ethers.getContractFactory("Box4");

        // deploy proxy and init
        const box = await upgrades.deployProxy(Box, [42], {initializer: "store"});
        const boxV2 = await upgrades.upgradeProxy(box.address, Box2);
        const boxV3 = await upgrades.upgradeProxy(box.address, Box3);
        const boxV4 = await upgrades.upgradeProxy(box.address, Box4);

        return {boxV2, boxV3, boxV4}
    }


    it('should retrive value previously stored in v4', async function () {
        const {boxV3} = await loadFixture(boxFixture);
        expect(await boxV3.retrieve()).to.equal(BigNumber.from("42"));

        await boxV3.store(100);
        expect(await boxV3.retrieve()).to.equal(BigNumber.from("100"));

    });

    it('should increment value correctly v4', async function () {
        const {boxV4} = await loadFixture(boxFixture);

        await boxV4.increment();
        expect(await boxV4.retrieve()).to.equal(BigNumber.from("43"))
    });

    it('should setName and getName correctly in V4', async function () {
        // name() removed,  getName() now
        const {boxV4} = await loadFixture(boxFixture);

        expect(boxV4.name).to.be.undefined;

        const boxname = "my Box V4";
        await boxV4.setName(boxname);

        expect(await boxV4.getName()).to.equal("Name: " + boxname);
    })

})