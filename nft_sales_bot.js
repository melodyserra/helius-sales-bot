// const axios = require('axios')
// import axios from 'axios'

const apiURL = "https://api.helius.xyz/v0/addresses"
const address = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K" // Magic Eden
const resource = "nft-events"
const options = `api-key=10edc740-f7ca-4964-8eb7-f64b87c8068a&type=NFT_SALE`
let mostRecentTxn = ""

const salesBot = async () => {
  let idx = 0;
  while(true) {
    const url = `${apiURL}/${address}/${resource}?${options}&until=${mostRecentTxn}`
    const response = await fetch(url)
    const data = await response.json()
    // fetch perhaps, axios may be server side
    if (!data.length) { continue; }
    let rows = '';
    for (let i = data.length - 1; i >= 0; i--) {
      // console.log(data[i]);
      rows = rows + `
<tr>
  <th scope="row">${idx + i}</th>
  <td class="from">${data[i].seller}</td>
  <td class="to">${data[i].buyer}</td>
  <td class="price">${data[i].amount}</td>
  <td class="on">${data[i].source}</td>
</tr>`;
      console.log(rows);
    }
    idx += data.length;
    $("#my-table-body").prepend(rows);
    mostRecentTxn = data[0].signature
  } 
}
salesBot()