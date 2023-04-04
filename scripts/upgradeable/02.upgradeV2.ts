import {ethers} from 'hardhat';
import {upgrades} from 'hardhat'
import {log} from "util";

async function main() {
    const Box = await ethers.getContractFactory("Box");
    console.log("Deploying Box...");
    // deploy Box using upgrade.deployProxy()
    const box = await upgrades.deployProxy(Box, [42], {initializer: 'store'});

    console.log(box.address, " box(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(box.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")

    ////////////////////////////////

    const BoxV2 = await ethers.getContractFactory("Box2");
    console.log("upgrade to BoxV2...");
    const boxV2 = await upgrades.upgradeProxy(box.address, BoxV2);
    console.log(boxV2.address, " BoxV2 address(should be the same)")

    console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " getAdminAddress")

}

main().catch(err => {
    console.error(err)
    process.exitCode = 1
})