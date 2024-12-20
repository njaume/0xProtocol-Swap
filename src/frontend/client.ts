import {
    createWalletClient,
    createPublicClient,
    custom,
    http,
    publicActions,
} from "viem";
import { polygon } from "viem/chains";

export const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
});

export const walletClient = typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
          chain: polygon,
          transport: custom(window.ethereum),
      }).extend(publicActions)
    : null; // or handle it differently for SSR