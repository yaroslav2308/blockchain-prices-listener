const ethers = require("ethers");

// abis for agregators to call functions and handle events
const abiEhtUsd = require("./abis/agregatorEthUsdAbi.json");
const abiLinkUsdtEth = require("./abis/agregatorLinkUsdtEthAbi.json")

require("dotenv").config();

async function main() {
    // agregator addresses
    const addressEthUsdOracleAgregator = "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6";
    const addressLinktEthOracleAgregator = "0xbba12740DE905707251525477bAD74985DeC46D2";
    const addressUsdtEthOracleAgregator = "0x7De0d6fce0C128395C488cb4Df667cdbfb35d7DE";

    // provider setting
    const provider = new ethers.providers.WebSocketProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
    );

    // getting latest block number
    let latestBlock = await provider.getBlockNumber()
    console.log(latestBlock)
    
    // creating instances of agregator contracts
    const contractEthUsdAgregator = new ethers.Contract(addressEthUsdOracleAgregator, abiEhtUsd, provider)
    const contractLinkEthAgregator = new ethers.Contract(addressLinktEthOracleAgregator, abiLinkUsdtEth, provider)
    const contractUsdtEthAgregator = new ethers.Contract(addressUsdtEthOracleAgregator, abiLinkUsdtEth, provider)
    
    // listener to 'AnswerUpdated' event of ETH / USD agregator
    contractEthUsdAgregator.on("AnswerUpdated", (current, roundId, updatedAt, event) => {
        let info = {
            current: ethers.utils.formatUnits(current, 8),
            roundId: roundId.toString(),
            updatedAt: updatedAt.toString(),
            data: event
        }
        console.log("##################| ETH / USD |##################")
        console.log(JSON.stringify(info, null, 4));
        console.log("##################| ETH / USD |##################")
    });
    
    // listener to 'AnswerUpdated' event of LINK / ETH agregator 
    contractLinkEthAgregator.on("AnswerUpdated", (current, roundId, updatedAt, event) => {
        let info = {
            current: ethers.utils.formatUnits(current, 18),
            roundId: roundId.toString(),
            updatedAt: updatedAt.toString(),
            data: event
        }
        console.log("##################| LINK / ETH |##################")
        console.log(JSON.stringify(info, null, 4));
        console.log("##################| LINK / ETH |##################")
    });

    // listener to 'AnswerUpdated' event of USDT / ETH agregator
    contractUsdtEthAgregator.on("AnswerUpdated", (current, roundId, updatedAt, event) => {
        let info = {
            current: ethers.utils.formatUnits(current, 18),
            roundId: roundId.toString(),
            updatedAt: updatedAt.toString(),
            data: event
        }
        console.log("##################| USDT / ETH |##################")
        console.log(JSON.stringify(info, null, 4));
        console.log("##################| USDT / ETH |##################")
    });
}

main();
