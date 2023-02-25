import {ethers} from 'hardhat'

async function main() {
    const GLDToken = await ethers.getContractFactory("GLDToken");
    console.log("");
    const token = await GLDToken.deploy('10000000000000000000000');
    await token.deployed();
    console.log("GLDToken deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })