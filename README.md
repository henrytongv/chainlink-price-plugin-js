# Hedera Agent Kit - Chainlink price Plugin

A plugin for [Hedera Agent Kit JS](https://github.com/hashgraph/hedera-agent-kit-js) that provides integration with Chainlink to get price feeds

The plugin in this repository is a reduced and simplified version (for educational purposes) of the original repository "Chainlink plugin" created by the LATAM Builders team during ETH Buenos Aires 2025

If you like it give thanks and credits the original authors:

- [Daniela Malqui, Strategy & PM](https://www.linkedin.com/in/danielamalqui)
- [Matias Celiz, Frontend Developer](https://github.com/Celiz)
- [Brian Paiba, Backend Developer](https://github.com/BMPaiba)
- Carla Alejo, UX-UI

You can read more about them and the plugin (including an example on how to use it as part of a full stack project) as their [plugin presentation page](https://ethglobal.com/showcase/price-feed-plugin-kd27q)

> [!NOTE]
> For demostration purposes this plugin is hardcoded to connect to tesnet only

## Overview

This plugin enables `AI agents` to interact with the Chainlink feed price contracts

## Installation in the example index.js agent

1.- Install the plugin

```bash
npm install chainlink-pricefeed-plugin
```

2.- Import the plugin code in your index.js (Hedera Agent)

```js
import { ChainlinkPriceFeedPlugin } from 'chainlink-pricefeed-plugin/plugin.js';
```

3.- Add this new plugin, in the plugins section of the agent

```js
const hederaAgentToolkit = new HederaLangchainToolkit({
client,
configuration: {
    tools: [],
    plugins: [ChainlinkPriceFeedPlugin], // <---- Add the plugin here
```

6.- Use a prompt to ask for a price feed, for example like this:

```js
const response = await agent.invoke(
{ messages: [{ role: 'user', content: "What's the price of Bitcoin?" }] },
{ configurable: { thread_id: '1' } }
);
```

4.- Now you can run the example agent and you should get your current HBAR balance converted to USD currency

```bash
node index.js
```

## Tools

### Get price feed from Chainlink
Get price feed for a given coin from Chainlink

#### JS Function
```js
// Use the Chainlink API to get one price Feed from a given coin
export async function getPriceFeedFromChainlink(coinId) {...}
```

#### Input Parameters

| Value   | Type     | Description |
|---------|----------|-------------|
| coinId  | `string` | Identification of the coin we need the price feed for. Examples: "BTC", "ETH", "HBAR", ... |

#### Output Values

| Value   | Type     | Description |
|---------|----------|-------------|
| coinId  | `string` | The coinId queried |
| address  | `string` | The contract address used to query the price feed |
| price  | `string` | Raw price value from the oracle |
| formattedPrice  | `string` | Human-readable price with currency formatting |
| decimals  | `number` | Number of decimal places in the raw price |
| roundId  | `string` | The round ID of the price update |
| updatedAt  | `string` | Timestamp when the price was last updated |

#### Example Prompt

```
"What's the price of BTC?"
```

## Optional: Plugin distribution, only needed to publish the npm package

```bash
npm login
npm publish
```