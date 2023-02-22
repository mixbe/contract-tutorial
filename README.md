## Creating a new Hardhat project

```shell
mkdir hardhat-tutorial
cd hardhat-tutorial
yarn init
yarn add --dev hardhat
npx hardhat
```

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys
that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## run

```shell
npx hardhat compile

npx hardhat test
# or
 yarn hardhat test
# or test one of tests
yarn hardhat test test/Token.js

# default is hardhat network
yarn hardhat run scripts/deploy.js

# select other networks
yarn hardhat run scripts/deploy.js --network ganache
yarn hardhat run scripts/1.deploy_box.ts --network ganache

yarn hardhat test test/Token_v2.js test/xxxxx
```

# reference

1. [hardhat tutorial](https://hardhat.org/tutorial)
2. [Web3 Tutorial: write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916)
3. [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)

# blog

* token
    * [A Concise Hardhat Tutorial: Part 2 - ERC20 Token](https://dev.to/yakult/a-concise-hardhat-tutorial-part-2-writing-erc20-2jpm)
    * [A Concise Hardhat Tutorial: Part 3 - ERC721 NFT](https://dev.to/yakult/a-concise-hardhat-tutorial-part-2-writing-erc721-nft-5gm6)
