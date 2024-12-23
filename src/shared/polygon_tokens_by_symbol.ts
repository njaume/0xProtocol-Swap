import { NATIVE_ADDRESS } from "./constants";
import { Token } from "./types";

export const POLYGON_TOKENS_BY_SYMBOL : Record<string, Token> = {
    "matic": {
        "chainId": 137,
        "name": "Matic",
        "symbol": "MATIC",
        "decimals": 18,
        "address": NATIVE_ADDRESS,
        "logoURI": "https://assets.polygon.technology/tokenAssets/eth.svg"
    },
    "usdc": {
        "chainId": 137,
        "name": "USD Coin",
        "symbol": "USDC",
        "decimals": 6,
        "address": "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        "logoURI": "https://assets.polygon.technology/tokenAssets/usdc.svg"
    },
    "wmatic": {
        "chainId": 137,
        "name": "Wrapped Matic Token",
        "symbol": "WMATIC",
        "decimals": 18,
        "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
        "logoURI": "https://assets.polygon.technology/tokenAssets/matic.svg"
    },
    "pol": {
        "chainId": 137,
        "name": "Polygon Ecosystem Token",
        "symbol": "POL",
        "decimals": 18,
        "address": "0x0000000000000000000000000000000000001010",
        "logoURI": "https://assets.polygon.technology/tokenAssets/pol.png"
    },
    "okb": {
        "chainId": 137,
        "name": "OKB",
        "symbol": "OKB",
        "decimals": 18,
        "address": "0x8F94400CDeF837F388100cfE56D7ebB8a3A3fb44",
        "logoURI": "https://assets.polygon.technology/tokenAssets/okb.png"
    },
    "usdt": {
        "chainId": 137,
        "name": "Tether USD",
        "symbol": "USDT",
        "decimals": 6,
        "address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        "logoURI": "https://assets.polygon.technology/tokenAssets/usdt.svg"
    },
    "dai": {
        "chainId": 137,
        "name": "Dai",
        "symbol": "DAI",
        "decimals": 18,
        "address": "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
        "logoURI": "https://assets.polygon.technology/tokenAssets/dai.svg"
    },
    "wbtc": {
        "chainId": 137,
        "name": "Wrapped BTC",
        "symbol": "WBTC",
        "decimals": 8,
        "address": "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
        "logoURI": "https://assets.polygon.technology/tokenAssets/wbtc.svg"
    },
    "crv": {
        "chainId": 137,
        "name": "CRV",
        "symbol": "CRV",
        "decimals": 18,
        "address": "0x3d5320821bfca19fb0b5428f2c79d63bd5246f89",
        "logoURI": "https://assets.polygon.technology/tokenAssets/crv.svg"
    },
    "wsteth": {
        "chainId": 137,
        "name": "Wrapped liquid staked Ether 2.0",
        "symbol": "WSTETH",
        "decimals": 18,
        "address": "0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
        "logoURI": "https://etherscan.io/token/images/wsteth3_32.png"
    },
    "aave": {
        "chainId": 137,
        "name": "Aave",
        "symbol": "AAVE",
        "decimals": 18,
        "address": "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
        "logoURI": "https://assets.polygon.technology/tokenAssets/aave.svg"
    },
    "rndr": {
        "chainId": 137,
        "name": "Render Token",
        "symbol": "RNDR",
        "decimals": 18,
        "address": "0x61299774020da444af134c82fa83e3810b309991",
        "logoURI": "https://assets.polygon.technology/tokenAssets/rndr.svg"
    },
    "tel": {
        "chainId": 137,
        "name": "Telcoin",
        "symbol": "TEL",
        "decimals": 2,
        "address": "0xdf7837de1f2fa4631d716cf2502f8b230f1dcc32",
        "logoURI": "https://assets.polygon.technology/tokenAssets/tel.svg"
    }
}