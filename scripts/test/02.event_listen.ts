import {ethers} from "hardhat";
import {formatEther, parseEther} from "ethers/lib/utils";

async function main() {

    const [owner, account1] = await ethers.getSigners();

    // deploy and get contract instance
    const Token = await ethers.getContractFactory("GLDToken");
    console.log("");
    const token = await Token.deploy(ethers.utils.parseEther("1000"));
    await token.deployed();
    console.log("GLDToken deployed to:", token.address);

    await token.deployed();
    console.log("BadgeToken deployed to: ", token.address)

    console.log("balanceOf ", await token.balanceOf(owner.address).then(r => formatEther(r)))

    // 2.  transfer token and response
    let response = await token.transfer(account1.address, parseEther('100'));
    await token.transfer(account1.address, parseEther('100'))
    await token.transfer(account1.address, parseEther('100'))
    await token.transfer(account1.address, parseEther('100'))
    await token.transfer(account1.address, parseEther('100'))
    console.log(response);

    //  3. get transaction receipt
    let receipt = await response.wait();
    console.log(receipt.events);

    let e = receipt.events[0];
    console.log("getBlock: ", await e.getBlock());
    console.log("getTransaction: ", await e.getTransaction())
    console.log("getTransactionReceipt: ", await e.getTransactionReceipt())


    // 4. smart contract method analysis
    console.log("estimate gas: ", await token.estimateGas.transfer(account1.address, parseEther('100')));
    console.log("callStatic: ", await token.callStatic.transfer(account1.address, parseEther('100')));


    // 5. retrieve all the events
    let filterFrom = token.filters.Transfer(owner.address);
    let events = await token.queryFilter(filterFrom, -10, "latest");
    console.log("events length: ", events.length)

    // 6. Get Transfer evetn args

    // create event transfer: transfer to account0
    let filterTo = token.filters.Transfer(null, owner.address);
    events = await token.queryFilter(filterTo, -10, "latest")
    console.log("events event: ", events.length)
    console.log("event args: ", events[0].args)

    // 7. Set up a listener
    token.on(filterFrom, (from, to, amount, eventName) => {
        console.log(from, to, amount, eventName)
    })

    // 8. Run transfer in another hadhat console
    response = await token.transfer(account1.address, parseEther('100.0'))


    //

}

main().then(() => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
})