const axios = require('axios')

const apiURL = "https://api.helius.xyz/v0/addresses"
const address = "AxFuniPo7RaDgPH6Gizf4GZmLQFc4M5ipckeeZfkrPNn" // DeGods
const resource = "nft-events"
const options = `api-key=10edc740-f7ca-4964-8eb7-f64b87c8068a&type=NFT_LISTING`
let mostRecentTxn = ""
const floorThreshold = 200; // SOL
const LAMPORTS_PER_SOL = 1000000000

const floorAlertBot = async () => {
  while(true) {
    const url = `${apiURL}/${address}/${resource}?${options}&until=${mostRecentTxn}`
    const { data } = await axios.get(url)
    if (!data.length) { continue; }
    const alertTxns = data.find(x => x.amount < floorThreshold * LAMPORTS_PER_SOL)
    sendAlerts(alertTxns); // custom alerting function
    mostRecentTxn = data[0].signature
  } 
}
floorAlertBot()