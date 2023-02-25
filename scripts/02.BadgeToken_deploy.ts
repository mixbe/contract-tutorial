import {ethers} from 'hardhat'

async function main() {
    const BadgeToken = await ethers.getContractFactory("BadgeToken");
    console.log("Deploying BadgeToken ERC721 token....");
    const token = await BadgeToken.deploy('BadgeToken', 'Badge');

    await token.deployed();
    console.log("BadgeToken deployed to: ", token.address)


}


main().then(() => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
})