const { waitForEvent, PREFIX } = require('./utils')
    , EthPrice = artifacts.require('EthPrice.sol')

contract('Solidity Contract Tests', () => {
    describe(`ETH Price Tests`, async () => {
        let price

        it('Should have logged a new Oraclize query', async () => {
            const { contract } = await EthPrice.deployed()
                , { args: { description } } = await waitForEvent(contract.LogNewOraclizeQuery({}, { fromBlock: 0, toBlock: 'latest' }))
            assert.equal(description, 'Oraclize query was sent, standing by for the answer..', 'Oraclize query incorrectly logged!')
        })

        it('Callback should have logged a new Ethereum price event', async () => {
            const { contract } = await EthPrice.deployed()
                , viewsLog = await waitForEvent(contract.LogNewEthPrice({}, { fromBlock: 0, toBlock: 'latest' }))
            price = viewsLog.args.price
            assert.equal(viewsLog.event, 'LogNewEthPrice', 'Wrong event emitted for YouTube views event!')
        })

        it('Should revert on second query attempt due to lack of funds', async () => {
            const contract = await EthPrice.deployed()
                , expErr = 'revert'
            try {
                await contract.update()
                assert.fail('Update transaction should not have succeeded!')
            } catch (e) {
                assert.isTrue(e.message.startsWith(`${PREFIX}${expErr}`), `Expected ${expErr} but got ${e.message} instead!`)
            }
        })
    })
})