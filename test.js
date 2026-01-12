// Example on how to call the tool directly from command line

import { getPriceFeedFromChainlink }  from './tool.js'

async function testcall() {
  console.log('Start');
  const result = await getPriceFeedFromChainlink("BTC");
  console.log(result);
  console.log('End');
}

testcall();