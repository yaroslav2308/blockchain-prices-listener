const ethers = require("ethers");
const abiUsdt = require("./abis/usdtAbi.json");
const abiDai = require("./abis/daiAbi.json");
require("dotenv").config();

async function main() {
    const addressUsdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    const addressDai = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const provider = new ethers.providers.WebSocketProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
    );

    let latestBlock = await provider.getBlockNumber()

    console.log(latestBlock)
    const contractUsdt = new ethers.Contract(addressUsdt, abiUsdt, provider)
    const contractDai = new ethers.Contract(addressDai, abiDai, provider)

    contractUsdt.on("Transfer", (from, to, value, event) => {
        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value, 6),
        }
        console.log(JSON.stringify(info, null, 3));
        console.log("##################USDT##################")
    })

    contractDai.on("Transfer", (src, dst, wad, event) => {
        let info = {
            from: src,
            to: dst,
            value: ethers.utils.formatUnits(wad, 6),
        }
        console.log(JSON.stringify(info, null, 3));
        console.log("##################DAI##################")
    })
}

main();
