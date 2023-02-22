import {ethers} from "hardhat";
import {BadgeToken} from "../../typechain-types";
import {address} from "hardhat/internal/core/config/config-validation";

const {expect} = require("chai");


describe("BadgeToken contract", function () {
    let BadgeToken;
    let token721: BadgeToken;
    let _name = 'BadgeToken';
    let _symbol = 'Badge';
    let owner, account1: { address: any; }, otheraccount;


    beforeEach(async function () {
        BadgeToken = await ethers.getContractFactory("BadgeToken");
        [owner, account1, ...otheraccount] = await ethers.getSigners();
        token721 = await BadgeToken.deploy(_name, _symbol);
    });

    describe("Deployment", function () {

        it("Should has the correct name and symbol", async function () {
            expect(await token721.name()).to.equal(_name);
            expect(await token721.symbol()).to.equal(_symbol);
        });


        it("Should mint a token with ID 1 & 2 account1", async function () {
            const address1 = account1.address;

            await token721.mintTo(address1);
            expect(await token721.ownerOf(1)).to.equal(address1);

            await token721.mintTo(address1);
            expect(await token721.ownerOf(2)).to.equal(address1);

            expect(await token721.balanceOf(address1)).to.equal(2);

        });

    })

})