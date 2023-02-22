import {ethers} from "hardhat";

async function main() {
    const BadgeToken = await ethers.getContractFactory("BadgeToken");
    console.log("Deploying BadgeToken ERC721 token....");
    const token721 = await BadgeToken.deploy('BadgeToken', 'Badge');

    await token721.deployed();
    console.log("BadgeToken deployed to: ", token721.address)

    const accounts = await ethers.getSigners();
    const owner = accounts[0].address;
    const toAddress = accounts[1].address;

    console.log(await token721.symbol())


    // mint nft tokenid 1
    await token721.mintTo(toAddress);
    // mint nft tokenid 2
    await token721.mintTo(toAddress);
    // mint nft tokenid 3
    await token721.mintTo(toAddress);

    console.log("balanceof : ", await token721.balanceOf(toAddress));


    console.log("tokenURI: ", await token721.tokenURI(3));

}


main().then(() => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
})