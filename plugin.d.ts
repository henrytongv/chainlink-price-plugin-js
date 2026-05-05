import type { z } from "zod";

export interface Tool {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<z.ZodRawShape>;
  execute: (client: unknown, context: unknown, params: unknown) => Promise<unknown>;
  outputParser?: (rawOutput: string) => { raw: unknown; humanMessage: string };
}

export interface Plugin {
  name: string;
  version?: string;
  description?: string;
  tools: (context: unknown) => Tool[];
}

export const ChainlinkPriceFeedPlugin: Plugin;

export const chainlinkPriceFeedPluginToolNames: {
  readonly GET_CHAINLINK_PRICE_FEED_TOOL: "get_chainlink_price_feed_tool";
};

declare const _default: {
  ChainlinkPriceFeedPlugin: typeof ChainlinkPriceFeedPlugin;
  chainlinkPriceFeedPluginToolNames: typeof chainlinkPriceFeedPluginToolNames;
};
export default _default;
