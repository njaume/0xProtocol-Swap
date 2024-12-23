import { NATIVE_ADDRESS } from "./constants";
import { Token } from "./types";

export const POLYGON_TOKENS: Token[] = [
    {
        chainId: 137,
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
        address: NATIVE_ADDRESS,

        tags: ["governanceToken"],
        logoURI: "https://assets.polygon.technology/tokenAssets/eth.svg",
    },
    {
        chainId: 137,
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        isStable: true,
        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/usdc.svg",
    },
    {
        chainId: 137,
        name: "Wrapped Matic Token",
        symbol: "WMATIC",
        decimals: 18,
        address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/matic.svg",
    },
    {
        chainId: 137,
        name: "Polygon Ecosystem Token",
        symbol: "POL",
        decimals: 18,
        address: "0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/pol.png",
    },
    {
        chainId: 137,
        name: "OKB",
        symbol: "OKB",
        decimals: 18,
        address: "0x75231f58b43240c9718dd58b4967c5114342a86c",

        tags: ["governanceToken"],
        logoURI: "https://assets.polygon.technology/tokenAssets/okb.png",
    },
    {
        chainId: 137,
        name: "Tether USD",
        symbol: "USDT",
        decimals: 6,
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        isStable: true,
        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/usdt.svg",
    },
    {
        chainId: 137,
        name: "Dai",
        symbol: "DAI",
        decimals: 18,
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/dai.svg",
    },
    {
        chainId: 137,
        name: "Wrapped BTC",
        symbol: "WBTC",
        decimals: 8,
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/wbtc.svg",
    },
    {
        chainId: 137,
        name: "CRV",
        symbol: "CRV",
        decimals: 18,
        address: "0xd533a949740bb3306d119cc777fa900ba034cd52",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/crv.svg",
    },
    {
        chainId: 137,
        name: "Wrapped liquid staked Ether 2.0",
        symbol: "wstETH",
        decimals: 18,
        address: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",

        tags: ["erc20"],
        logoURI: "https://etherscan.io/token/images/wsteth3_32.png",
    },
    {
        chainId: 137,
        name: "Aave",
        symbol: "AAVE",
        decimals: 18,
        address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",

        tags: ["erc20"],
        logoURI: "https://assets.polygon.technology/tokenAssets/aave.svg",
    },
    {
        chainId: 137,
        name: "Render Token",
        symbol: "RNDR",
        decimals: 18,
        address: "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",

        tags: ["erc20"],
       
        logoURI: "https://assets.polygon.technology/tokenAssets/rndr.svg",
    },
    {
        chainId: 137,
        name: "Telcoin",
        symbol: "TEL",
        decimals: 2,
        address: "0x467bccd9d29f223bce8043b84e8c8b282827790f",

        tags: ["erc20"],
       
        logoURI: "https://assets.polygon.technology/tokenAssets/tel.svg",
    },
];
