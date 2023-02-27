import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("xxx", function () {
    async function deployOneYearLockFixture() {
        return {}
    }

    describe("Deployment", function () {
        it("Should set the right unlockTime", async function () {
            const {} = await loadFixture(deployOneYearLockFixture);

        });
    });
});
