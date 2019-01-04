pragma solidity ^0.4.24;

import "./oraclize/usingOraclize.sol";

contract EthPrice is usingOraclize {

    uint public ethPriceUsd;

    event LogNewEthPrice(string price);
    event LogNewOraclizeQuery(string description);

    function EthPrice() {
        update(); // first check at contract creation
    }

    function __callback(bytes32 myid, string result) {
        require(msg.sender == oraclize_cbAddress(), 'Caller is not Oraclize!');
        emit LogNewEthPrice(result);
        ethPriceUsd = parseInt(result, 2);
        // ...Do something with the USD Diesel price...
    }

    function update() payable {
        emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        oraclize_query("URL", "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount");
    }

}