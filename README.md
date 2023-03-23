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

## Test
```shell

yarn hardhat  test ./test/xxxxx.test.ts --network hardhat

```

# reference

1. [hardhat tutorial](https://hardhat.org/tutorial)
2. [Web3 Tutorial: write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916)
3. [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)

# blog
## contract
* 1. token
  * [A Concise Hardhat Tutorial: Part 2 - ERC20 Token](https://dev.to/yakult/a-concise-hardhat-tutorial-part-2-writing-erc20-2jpm)
  * [A Concise Hardhat Tutorial: Part 3 - ERC721 NFT](https://dev.to/yakult/a-concise-hardhat-tutorial-part-2-writing-erc721-nft-5gm6)
* 2. upgradeable smart contract
  * [write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916)
* 3. [OpenZeppelin /workshops](https://github.com/OpenZeppelin/workshops)


## defi
1. [defi by example](https://www.youtube.com/watch?v=qB2Ulx201wY&list=PLO5VPQH6OWdX-Rh7RonjZhOd9pb9zOnHW)
2. [GitHub of defi by example](https://github.com/stakewithus/defi-by-example)
3. [Public Bug Report: Uniswap's SwapRouter doesn't refund unspent ETH in partial swaps](https://jeiwan.net/posts/public-bug-report-uniswap-swaprouter/)



# money-legos
1. [studydefi/money-legos](https://github.com/studydefi/money-legos)
2. 

## [Web3 learn](https://learnweb3.io/courses/c446d19f-a25d-42c6-b3e4-4311c5040587/lessons#)
1 - Learn how to create Merkle Trees for large airdrops (1-2 hours)
2 - Learn how Ethereum nodes store data and executes smart contracts (1-2 hours)
3 - Borrow a loan worth millions in crypto without paying a single cent using Aave Flash Loans (2-4 hours)
4 - Learn about the Re-Entrancy attack - that cost $60 million (1-2 hours)
5 - Read private data from smart contracts (not really private after all) (1-2 hours)
6 - Learn about delegatecall attacks - where one contract can change data in another (2-3 hours)
7 - Why you should never generate random numbers on-chain without an oracle (1-2 hours)
8 - How to prevent users from accessing a smart contract (1-2 hours)
9 - Why not to use tx.origin to determine the sender of a transaction (1-2 hours)
10 - Detect legit-looking contracts which are actually malicious (1-2 hours)
11 - Build smart contracts that can be upgraded over time (2-3 hours)
12 - Optimize your smart contracts to build the cheapest transactions possible (30-60 minutes)
13 - Pay for someone else's transactions gas fee using meta transactions (1-2 hours)
14 - How can miners make the blockchain play in their favor through slight adjustments (1-2 hours)
15 - Bribe miners to have them play by your rules (1-2 hours)


## 