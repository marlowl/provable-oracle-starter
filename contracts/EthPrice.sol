pragma solidity ^0.4.24;

import "./oraclize/usingOraclize.sol";

contract EthPrice is usingOraclize {

    string public ethPriceUsd;

    event LogInfo(string description);
    event LogNewEthPrice(string price);
    event LogNewOraclizeQuery(string description);

    function EthPrice() {
        update(); 
    }

    function __callback(bytes32 myid, string result) {
        require(msg.sender == oraclize_cbAddress(), 'Caller is not Oraclize!');
        emit LogNewEthPrice(result);
        ethPriceUsd = result;
    }

    function update() payable public {
        if(oraclize_getPrice("URL") > address(this).balance){
            emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
           emit LogInfo("Oraclize query was sent, standing by for the answer.."); 
           emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
           oraclize_query("URL", "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount");
        }

    }

}