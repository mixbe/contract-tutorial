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
            forking: {
                url: "https://mainnet.infura.io/v3/" + process.env.WEB3_INFURA_PROJECT_ID,
            }
        },
        ganache: {
            url: `http://localhost:8545`
        },
    }

};

export default config;
