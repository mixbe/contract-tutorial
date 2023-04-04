import {time, loadFixture, getStorageAt} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("Test EVM Memory", function () {
    async function deployOneYearLockFixture() {
        const SlotHelp = await ethers.getContractFactory("SlotHelp")
        const slotHelp = await SlotHelp.deploy();
        await slotHelp.deployed();
        return {slotHelp}
    }

    describe("Test Memory Solt", function () {
        it("Test Storage V1", async function () {
            const Storage = await ethers.getContractFactory("Storage");
            const storage = await Storage.deploy();
            await storage.deployed();
            await storage.foo();

            expect(await getStorageAt(storage.address, 0)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000001');
            expect(await getStorageAt(storage.address, 1)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000002');
            expect(await getStorageAt(storage.address, 2)).to.equal('0x000000000000000000000000000000000000000000000000000000000000007b');
        });

        it("Test Storage V2", async function () {
            const StorageV2 = await ethers.getContractFactory("StorageV2");
            const storageV2 = await StorageV2.deploy();
            await storageV2.deployed();
            await storageV2.foo();

            expect(await getStorageAt(storageV2.address, 0)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000201');
            expect(await getStorageAt(storageV2.address, 1)).to.equal('0x000000000000000000000000000000000000000000000000000000000000007b');
            expect(await getStorageAt(storageV2.address, 2)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000000');
        });


        it("Test Storage V3", async function () {
            const StorageV3 = await ethers.getContractFactory("StorageV3");
            const storageV3 = await StorageV3.deploy();
            await storageV3.deployed();
            await storageV3.foo();

            expect(await getStorageAt(storageV3.address, 0)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000001');
            expect(await getStorageAt(storageV3.address, 1)).to.equal('0x000000000000000000000000000000000000000000000000000000000000007b');
            expect(await getStorageAt(storageV3.address, 2)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000002');
        });

        it("Test Storage V4", async function () {
            const StorageV4 = await ethers.getContractFactory("StorageV4");
            const storageV4 = await StorageV4.deploy();
            await storageV4.deployed();
            await storageV4.foo();

            // 0x33 , 62 = 31 * 2
            expect(await getStorageAt(storageV4.address, 0)).to.equal('0x616263616263616263616263616263616263616263616263616263616263613e');
            // 0x41, 65 = 32 * 2 + 1
            expect(await getStorageAt(storageV4.address, 1)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000041');
            expect(await getStorageAt(storageV4.address, 2)).to.equal('0x0000000000000000000000000000000000000000000000000000000000000000');

            // keccak256(abi.encode(1))
            let solt_hash = await storageV4.getEncode(1)
            //console.log(solt_hash)
            expect(await getStorageAt(storageV4.address, solt_hash)).to.equal('0x6162636162636162636162636162636162636162636162636162636162636162');
        });

        it("Test Storage V5", async function () {
            const {slotHelp} = await loadFixture(deployOneYearLockFixture);


            const StorageV5 = await ethers.getContractFactory("StorageV5");
            const storageV5 = await StorageV5.deploy();
            await storageV5.deployed();

            // init maping
            await storageV5.setValue("aa", 123);
            await storageV5.setValue("bb", 456);

            // 123
            expect(await getStorageAt(storageV5.address, await slotHelp.mappingValueSlotString(0, "aa"))).to.equal('0x000000000000000000000000000000000000000000000000000000000000007b')
            // 456
            expect(await getStorageAt(storageV5.address, await slotHelp.mappingValueSlotString(0, "bb"))).to.equal('0x00000000000000000000000000000000000000000000000000000000000001c8')

            // init array
            await storageV5.push(1)
            await storageV5.push(2)
            await storageV5.push(3)
            await storageV5.push(4)

            console.log(await getStorageAt(storageV5.address, 1))
        });

    });
});
