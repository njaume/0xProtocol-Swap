import { Address } from "viem";

export const MAX_ALLOWANCE =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const POLYGON_EXCHANGE_PROXY =
  "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";
export const ETHEREUM_EXCHANGE_PROXY =
  "0xdef1c0ded9bec7f1a1670819833240f027b25eff";
export const ARBITRUM_EXCHANGE_PROXY =
  "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

interface Token {
  name: string;
  address: Address;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  isStable?: boolean;
}

export const MAINNET_TOKENS: Token[] = [
  {
    chainId: 1,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg",
  },
  {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
    isStable: true,
  },
  {
    chainId: 1,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
    isStable: true,
  },
  {
    chainId: 1,
    name: "FLOKI",
    symbol: "FLOKI",
    decimals: 9,
    address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/c37119334a24f9933f373c6cc028a5bdbad2ecb4/blockchains/ethereum/assets/0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E/logo.png",
  },
];

export const MAINNET_TOKENS_BY_SYMBOL: Record<string, Token> = {
  weth: {
    chainId: 1,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg",
  },
  usdc: {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  dai: {
    chainId: 1,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  floki: {
    chainId: 1,
    name: "FLOKI",
    symbol: "FLOKI",
    decimals: 9,
    address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/c37119334a24f9933f373c6cc028a5bdbad2ecb4/blockchains/ethereum/assets/0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E/logo.png",
  },
};

export const POLYGON_TOKENS: Token[] = [
  {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/matic.svg",
  },
  {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
];

export const MAINNET_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    chainId: 1,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg",
  },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  "0x6b175474e89094c44da98b954eedeac495271d0f": {
    chainId: 1,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": {
    chainId: 1,
    name: "FLOKI",
    symbol: "FLOKI",
    decimals: 9,
    address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/c37119334a24f9933f373c6cc028a5bdbad2ecb4/blockchains/ethereum/assets/0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E/logo.png",
  },
};

export const POLYGON_TOKENS_BY_SYMBOL: Record<string, Token> = {
  wmatic: {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/matic.svg",
  },
  usdc: {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};

export const POLYGON_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270": {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/matic.svg",
  },
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};

export const ETHEREUM_TOKENS: Token[] = [
  {
    chainId: 1,
    name: "Balancer",
    symbol: "BAL",
    decimals: 18,
    address: "0xba100000625a3754423978a60c9317c58a424e3d",
    logoURI:
      "https://raw.githubusercontent.com/balancer/brand-assets/main/logo/circle-container/logo-balancer-black-128x128.svg",
  },
  {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
];

export const ETHEREUM_TOKENS_BY_SYMBOL: Record<string, Token> = {
  bal: {
    chainId: 1,
    name: "Balancer",
    symbol: "BAL",
    decimals: 18,
    address: "0xba100000625a3754423978a60c9317c58a424e3d",
    logoURI:
      "https://raw.githubusercontent.com/balancer/brand-assets/main/logo/circle-container/logo-balancer-black-128x128.svg",
  },
  usdc: {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};

export const ETHEREUM_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0xba100000625a3754423978a60c9317c58a424e3d": {
    chainId: 1,
    name: "Balancer",
    symbol: "BAL",
    decimals: 18,
    address: "0xba100000625a3754423978a60c9317c58a424e3d",
    logoURI:
      "https://raw.githubusercontent.com/balancer/brand-assets/main/logo/circle-container/logo-balancer-black-128x128.svg",
  },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    chainId: 1,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};

export const ARBITRUM_TOKENS: Token[] = [
  {
    chainId: 42161,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    logoURI:
      "https://raw.githubusercontent.com/OffchainLabs/arbitrum-classic/master/docs/assets/arbitrum_logo.svg",
  },
  {
    chainId: 42161,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
];

export const ARBITRUM_TOKENS_BY_SYMBOL: Record<string, Token> = {
  weth: {
    chainId: 42161,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    logoURI:
      "https://raw.githubusercontent.com/OffchainLabs/arbitrum-classic/master/docs/assets/arbitrum_logo.svg",
  },
  usdc: {
    chainId: 42161,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};

export const ARBITRUM_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": {
    chainId: 42161,
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    logoURI:
      "https://raw.githubusercontent.com/OffchainLabs/arbitrum-classic/master/docs/assets/arbitrum_logo.svg",
  },
  "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8": {
    chainId: 42161,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
};


export const AFFILIATE_FEE = 100; // 1% affiliate fee. Denoted in Bps.
export const FEE_RECIPIENT = "0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917"; // The ETH address that should receive affiliate fees
