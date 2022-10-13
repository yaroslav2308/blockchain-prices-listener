# Blockchain listener

It is blockchain listener written in JavaScript to check if price of pairs (ETH/USD, LINK/ETH, USDT/ETH) has changed. It uses decentralised services (Oracle) to check price changes.

## Preparation
First of all you have to create your own blockchain archive node using [Alchemy](https://www.alchemy.com/). And then save key from Alchemy node.

## Installation
Use `git clone` command to install project locally
```bash
git clone https://github.com/yaroslav2308/blockchain-prices-listener
cd blockchain-prices-listener
```
Initialize Node project
```bash
npm init -y
```
Install dependencies (ethers and dotenv)
```bash
npm install ethers dotenv
```
Create `.env` file and paste code below (key from Alchemy)
```
ALCHEMY_KEY=[your_key]
```

## Running
Run listener 
```bash
node listenerToPriceChanges.js
```
You have to see number of latest block (it must be different from mine)
```bash
Number of latest block: 15741690
```
Now script is listening blockchain for events from contracts, which represents prices changes. After a while you'll see log with price change information:
```json
##################| ETH / USD |##################
{
    "current": "1294.32",
    "roundId": "35192",
    "updatedAt": "1665694535",
    "data": {
        "blockNumber": 15741710,
        "blockHash": "0x0013e30137417ed11e8a766a0bebc08a025c4df478fda310da8480db0537b3df",
        "transactionIndex": 66,
        "removed": false,
        "address": "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6",
        "data": "0x0000000000000000000000000000000000000000000000000000000063487b47",
        "topics": [
            "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
            "0x0000000000000000000000000000000000000000000000000000001e22bf9600",
            "0x0000000000000000000000000000000000000000000000000000000000008978"
        ],
        "transactionHash": "0xe4004e64e9d3d29a6fe4d53e1cab7df1ab55932ba43a285a02f0be97d00abba5",
        "logIndex": 177,
        "event": "AnswerUpdated",
        "eventSignature": "AnswerUpdated(int256,uint256,uint256)",
        "args": [
            {
                "type": "BigNumber",
                "hex": "0x1e22bf9600"
            },
            {
                "type": "BigNumber",
                "hex": "0x8978"
            },
            {
                "type": "BigNumber",
                "hex": "0x63487b47"
            }
        ]
    }
}
##################| ETH / USD |##################
```
That's it!

## Additional
Because oracles update prices rarely, waiting time might take up to few hours. So if you want to make sure that everything is working fine, you could run `listenerUsdtDai.js` which is listening for USDT and DAI transactions
```bash
node listenerUsdtDai.js
```
After number of latest block information you have to see USDT and DAI transactions information 
```json
{
   "from": "0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43",
   "to": "0x74c22a172A2654Fdbc6d9df95C5f8a8F08fbC7B1",
   "value": "640777071655654320.585848"
}
##################DAI##################
```
