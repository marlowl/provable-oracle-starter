const contracts = [
  artifacts.require('./EthPrice.sol'),
  artifacts.require('./usingOraclize.sol')
]

module.exports = deployer => 
  contracts.map(contract => 
      deployer.deploy(contract))