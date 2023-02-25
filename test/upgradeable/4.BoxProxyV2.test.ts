import {expect} from 'chai'
import {ethers, upgrades} from 'hardhat'
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {BigNumber} from "ethers";


describe("Box(proxy) V2", function () {
    async function boxFixture() {
        const Box = await ethers.getContractFactory("Box")
        const Box2 = await ethers.getContractFactory("Box2");

        // deploy proxy and init
        const box = await upgrades.deployProxy(Box, [42], {initializer: "store"});

        console.log(box.address, " box/proxy")
        console.log(await upgrades.erc1967.getImplementationAddress(box.address), " getImplementationAddress")
        console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")

        const boxV2 = await upgrades.upgradeProxy(box.address, Box2);
        console.log(boxV2.address, " box/proxy after upgrade")
        console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address), " getImplementationAddress after upgrade")
        console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " getAdminAddress after upgrade")

        return {boxV2}
    }


    it('should retrive value previously stored', async function () {
        const {boxV2} = await loadFixture(boxFixture);
        expect(await boxV2.retrieve()).to.equal(BigNumber.from("42"));

        await boxV2.store(100);
        expect(await boxV2.retrieve()).to.equal(BigNumber.from("100"));

    });

    it('should increment value correctly ', async function () {
        const {boxV2} = await loadFixture(boxFixture);

        await boxV2.increment();
        expect(await boxV2.retrieve()).to.equal(BigNumber.from("43"))
    });

})