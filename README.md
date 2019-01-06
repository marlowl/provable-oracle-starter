# Ethereum Oraclize starter

Front-end is generated with [vue-cli](https://github.com/vuejs/vue-cli) version 3.2.1

Basic Ethereum Oracle example including Oraclize, Truffle, Coinbase API, Web3

# Demo
Get the current ETH/USD price from the Coinbase API through an Ethereum Oracle 

![](demo.gif)

# Project setup

### Install dependencies
```
npm install
```

### Install truffle
```
npm install -g truffle 
```
### Run truffle in develop mode
```
truffle develop
```
### Run the ethereum-bridge in a seperate terminal
```
npm run bridge
```
### Compile the contract
```
truffle compile
```
### Migrate the contract
```
truffle migrate --development --reset
```
### Get the contract address from the ethereum-bridge terminal
Output should be something like this
```
    "contract_myid": "0x9fa87c542cab950bd129f3d2d13cba6199741bd1984351c04e83c54620dfee1b",
    "contract_address": "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
```

### Copy your contract address into HelloWorld.vue
```
let myContract = new web3.eth.Contract(
  MyContract.abi,
  //Your contract address
  "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
);
```

### Start the project
```
npm run serve
```
