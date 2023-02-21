

## Creating a new Hardhat project
```shell
mkdir hardhat-tutorial
cd hardhat-tutorial
yarn init
yarn add --dev hardhat
npx hardhat
```

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
