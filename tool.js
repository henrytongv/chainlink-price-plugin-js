/* 
This source code is a copy of the Chainlink plugin created by the LATAM Builders team https://ethglobal.com/showcase/price-feed-plugin-kd27q
This version is reduced and simplied for educational purposes. If you like it give thanks and credits the original authors
*/

import { ethers } from "ethers";

const AGGREGATOR_V3_INTERFACE_ABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// contract addresses per coin in testnet
// taken from https://docs.chain.link/data-feeds/price-feeds/addresses?network=hedera&networkType=testnet
const PRICE_FEEDS = {
  "BTC" : "0x058fe79cb5775d4b167920ca6036b824805a9abd",
  "ETH" : "0xb9d461e0b962af219866adfa7dd19c52bb9871b9",
  "HBAR": "0x59bc155eb6c6c415fe43255af66ecf0523c92b4a",
  "LINK": "0xeb93a53c648e3e89bc0fc327d36a37619b1cf0cd",
  "USDC": "0x2946220288dbaec91a26c772f5a1bb7b191c1a73",
  "USDT": "0x1c5275a77d74c89256801322e9a52a991c68e79b",
  "DAI" : "0xb7546c6ebfc0b6b4fe68909734d7e2c1c5a3ffdf",
}

// Use the Chainlink API to get one price Feed from a given coin
export async function getPriceFeedFromChainlink(coinId) {
  try {
    console.log(`...getPriceFeedFromChainlink invoked with coinId ${coinId}`);
    const provider = new ethers.JsonRpcProvider("https://testnet.hashio.io/api");
    const contractAddress = PRICE_FEEDS[coinId];

    // Create contract instance
    const priceFeed = new ethers.Contract(
      contractAddress,
      AGGREGATOR_V3_INTERFACE_ABI,
      provider
    );

    // Get latest price data
    const roundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();

    // Parse the data
    const price = Number(roundData.answer);
    const formattedPrice = (price / Math.pow(10, Number(decimals))).toFixed(
      Number(decimals)
    );

    console.log(`...returning information from Chainlink...`);

    // return price
    return {
          coinId,
          contractAddress,
          price: price.toString(),
          formattedPrice: `$${formattedPrice}`,
          decimals: Number(decimals),
          roundId: roundData.roundId.toString(),
          updatedAt: new Date(Number(roundData.updatedAt) * 1000).toISOString(),
        };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}