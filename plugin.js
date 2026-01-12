/* 
This source code is a copy of the Chainlink plugin created by the LATAM Builders team https://ethglobal.com/showcase/price-feed-plugin-kd27q
This version is reduced and simplied for educational purposes. If you like it give thanks and credits the original authors
*/

import { z } from 'zod';
import { getPriceFeedFromChainlink } from "./tool.js";

const getPriceFeedPrompt = `
  Query the latest price from a Chainlink Price Feed oracle on Hedera Testnet.
  
  This tool connects to Chainlink's decentralized oracle network to retrieve
  real-time cryptocurrency price data. The price feeds are updated regularly
  by multiple independent node operators.

  Parameters:
  - coinId (string, required): The coinId to query. Must be one of:
    * BTC - Bitcoin to US Dollar
    * ETH - Ethereum to US Dollar  
    * HBAR - Hedera to US Dollar
    * LINK - Chainlink to US Dollar
    * USDC - USD Coin to US Dollar
    * USDT - Tether to US Dollar
    * DAI - DAI Stablecoin to US Dollar

  Returns:
  - coinId: The coinId queried
  - address: The contract address used to query the price feed
  - price: Raw price value from the oracle
  - formattedPrice: Human-readable price with currency formatting
  - decimals: Number of decimal places in the raw price
  - roundId: The round ID of the price update
  - updatedAt: Timestamp when the price was last updated

  Example usage:
  - "What's the price of Bitcoin?"
  - "Get me the current HBAR price"
  - "Show me ETH price"
  `;

const getChainlinkPriceFeedTool = (_context) => ({
    method: 'get_chainlink_price_feed_tool',
    name: 'get Chainlink price feed Tool',
    description: getPriceFeedPrompt,
    parameters: z.object({
        coinId: z.string(),
    }),
    outputParser: undefined,
    execute: async (client, context, params) => {
        const result = await getPriceFeedFromChainlink(coinId);
        return result;
    },
});
// Export the plugin
export const ChainlinkPriceFeedPlugin = {
    name: 'ChainlinkPriceFeedPlugin',
    version: '1.0.0',
    description: 'A plugin for querying Chainlink Price Feed oracles on Hedera Testnet. Provides real-time cryptocurrency price data from decentralized oracle networks.',
    tools: (context) => { return [getChainlinkPriceFeedTool(context)]; }
};
export default ChainlinkPriceFeedPlugin;