import {ethers} from 'hardhat';
import {upgrades} from 'hardhat'
import {log} from "util";

async function main() {
    const Box = await ethers.getContractFactory("Box");
    console.log("Deploying Box...");
    // deploy Box using upgrade.deployProxy()
    const box = await upgrades.deployProxy(Box, [42], {initializer: 'store'});
    await box.deployed();

    console.log(box.address, " box(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(box.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")
}

main().catch(err => {
    console.error(err)
    process.exitCode = 1
})