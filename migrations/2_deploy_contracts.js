let usingOraclize = artifacts.require('./usingOraclize.sol')
let EthPrice = artifacts.require('./EthPrice.sol')

module.exports = function (deployer, network, accounts) {
    deployer.deploy(usingOraclize);
    deployer.deploy(EthPrice);
    
};



