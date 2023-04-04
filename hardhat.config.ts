import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades"
import "dotenv/config"

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true, // Default: false
                        runs: 200, // Default: 200,
                    },
                },
            },
        ],
    },

    networks: {
        hardhat: {
            allowUnlimitedContractSize: false,
        },
        ganache: {
            url: `http://localhost:8545`
        },
        sepolia: {
            url: process.env.SEPOLIA_NODE_URL,
            accounts: [`${process.env.WALLET_KEY}`]
        },
        goerli: {
            url: process.env.GOERLI_NODE_URL,
            accounts: [`${process.env.WALLET_KEY}`]
        }
    }

};

export default config;
