import { zeroAddress } from "viem";
import { NATIVE_ADDRESS } from "./constants";

export const POLYGON_TOKENS_BY_SYMBOL = {
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
    "stmatic": {
        "chainId": 137,
        "name": "Staked MATIC",
        "symbol": "STMATIC",
        "decimals": 18,
        "address": "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
        "logoURI": ""
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
    "sand": {
        "chainId": 137,
        "name": "SAND",
        "symbol": "SAND",
        "decimals": 18,
        "address": "0xbbba073c31bf03b8acf7c28ef0738decf3695683",
        "logoURI": ""
    },
    "aave": {
        "chainId": 137,
        "name": "Aave",
        "symbol": "AAVE",
        "decimals": 18,
        "address": "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
        "logoURI": "https://assets.polygon.technology/tokenAssets/aave.svg"
    },
    "ldo": {
        "chainId": 137,
        "name": "Lido DAO Token",
        "symbol": "LDO",
        "decimals": 18,
        "address": "0xc3c7d422809852031b44ab29eec9f1eff2a58756",
        "logoURI": ""
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
    },
    "route": {
        "chainId": 137,
        "name": "Route",
        "symbol": "ROUTE",
        "decimals": 18,
        "address": "0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4",
        "logoURI": ""
    },
    "ageur": {
        "chainId": 137,
        "name": "agEUR",
        "symbol": "AGEUR",
        "decimals": 18,
        "address": "0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
        "logoURI": ""
    },
    "cbk": {
        "chainId": 137,
        "name": "Cobak Token",
        "symbol": "CBK",
        "decimals": 18,
        "address": "0x4ec203dd0699fac6adaf483cdd2519bc05d2c573",
        "logoURI": ""
    },
    "bal": {
        "chainId": 137,
        "name": "Balancer",
        "symbol": "BAL",
        "decimals": 18,
        "address": "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
        "logoURI": "https://assets.polygon.technology/tokenAssets/bal.svg"
    },
    "cxo": {
        "chainId": 137,
        "name": "CargoX Token",
        "symbol": "CXO",
        "decimals": 18,
        "address": "0xf2ae0038696774d65E67892c9D301C5f2CbbDa58",
        "logoURI": ""
    },
    "pyr": {
        "chainId": 137,
        "name": "PYR Token",
        "symbol": "PYR",
        "decimals": 18,
        "address": "0x430ef9263e76dae63c84292c3409d61c598e9682",
        "logoURI": ""
    },
    "grt": {
        "chainId": 137,
        "name": "Graph Token",
        "symbol": "GRT",
        "decimals": 18,
        "address": "0x5fe2B58c013d7601147DcdD68C143A77499f5531",
        "logoURI": "https://assets.polygon.technology/tokenAssets/grt.svg"
    },
    "ichi": {
        "chainId": 137,
        "name": "ICHI",
        "symbol": "ICHI",
        "decimals": 18,
        "address": "0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6",
        "logoURI": ""
    },
    "snx": {
        "chainId": 137,
        "name": "Synthetix Network Token",
        "symbol": "SNX",
        "decimals": 18,
        "address": "0x50b728d8d964fd00c2d0aad81718b71311fef68a",
        "logoURI": "https://assets.polygon.technology/tokenAssets/snx.svg"
    },
    "orbs": {
        "chainId": 137,
        "name": "Orbs",
        "symbol": "ORBS",
        "decimals": 18,
        "address": "0x614389eaae0a6821dc49062d56bda3d9d45fa2ff",
        "logoURI": ""
    },
    "hmt": {
        "chainId": 137,
        "name": "Human Token",
        "symbol": "HMT",
        "decimals": 18,
        "address": "0xc748b2a084f8efc47e086ccddd9b7e67aeb571bf",
        "logoURI": ""
    },
    "smt": {
        "chainId": 137,
        "name": "Swarm Markets",
        "symbol": "SMT",
        "decimals": 18,
        "address": "0xe631dabef60c37a37d70d3b4f812871df663226f",
        "logoURI": ""
    },
    "sushi": {
        "chainId": 137,
        "name": "SushiToken",
        "symbol": "SUSHI",
        "decimals": 18,
        "address": "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
        "logoURI": "https://assets.polygon.technology/tokenAssets/sushi.svg"
    },
    "mnw": {
        "chainId": 137,
        "name": "Morpheus.Network",
        "symbol": "MNW",
        "decimals": 18,
        "address": "0x3c59798620e5fec0ae6df1a19c6454094572ab92",
        "logoURI": ""
    },
    "elon": {
        "chainId": 137,
        "name": "Dogelon",
        "symbol": "ELON",
        "decimals": 18,
        "address": "0xe0339c80ffde91f3e20494df88d4206d86024cdf",
        "logoURI": ""
    },
    "uni": {
        "chainId": 137,
        "name": "Uniswap",
        "symbol": "UNI",
        "decimals": 18,
        "address": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
        "logoURI": "https://assets.polygon.technology/tokenAssets/uni.svg"
    },
    "idex": {
        "chainId": 137,
        "name": "IDEX Token",
        "symbol": "IDEX",
        "decimals": 18,
        "address": "0x9cb74c8032b007466865f060ad2c46145d45553d",
        "logoURI": ""
    },
    "knc": {
        "chainId": 137,
        "name": "Kyber Network Crystal v2",
        "symbol": "KNC",
        "decimals": 18,
        "address": "0x1c954e8fe737f99f68fa1ccda3e51ebdb291948c",
        "logoURI": ""
    },
    "eurs": {
        "chainId": 137,
        "name": "STASIS EURS Token",
        "symbol": "EURS",
        "decimals": 2,
        "address": "0xe111178a87a3bff0c8d18decba5798827539ae99",
        "logoURI": "https://assets.polygon.technology/tokenAssets/eurs.svg"
    },
    "fort": {
        "chainId": 137,
        "name": "Forta",
        "symbol": "FORT",
        "decimals": 18,
        "address": "0x9ff62d1fc52a907b6dcba8077c2ddca6e6a9d3e1",
        "logoURI": ""
    },
    "ghst": {
        "chainId": 137,
        "name": "Aavegotchi GHST Token",
        "symbol": "GHST",
        "decimals": 18,
        "address": "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
        "logoURI": "https://polygonscan.com/token/images/aavegotchighst_32.png"
    },
    "data": {
        "chainId": 137,
        "name": "Streamr",
        "symbol": "DATA",
        "decimals": 18,
        "address": "0x3a9a81d576d83ff21f26f325066054540720fc34",
        "logoURI": "https://raw.githubusercontent.com/streamr-dev/design-assets/main/Svg/Marks%20and%20Symbols/Token%20symbols/%24DATA%20new%20token%20symbol.svg"
    },
    "masq": {
        "chainId": 137,
        "name": "MASQ",
        "symbol": "MASQ",
        "decimals": 18,
        "address": "0xee9a352f6aac4af1a5b9f467f6a93e0ffbe9dd35",
        "logoURI": "https://github.com/MASQ-Project/MASQ-contract/raw/master/MASQ%20Logo%20Blue%20Solo%20Transparent.png"
    },
    "mana": {
        "chainId": 137,
        "name": "Decentraland MANA",
        "symbol": "MANA",
        "decimals": 18,
        "address": "0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
        "logoURI": ""
    },
    "get": {
        "chainId": 137,
        "name": "GET Protocol",
        "symbol": "GET",
        "decimals": 18,
        "address": "0xdb725f82818de83e99f1dac22a9b5b51d3d04dd4",
        "logoURI": "https://assets.polygon.technology/tokenAssets/get.svg"
    },
    "$zkp": {
        "chainId": 137,
        "name": "ZKP Token",
        "symbol": "$ZKP",
        "decimals": 18,
        "address": "0x9a06db14d639796b25a6cec6a1bf614fd98815ec",
        "logoURI": ""
    },
    "cgg": {
        "chainId": 137,
        "name": "ChainGuardians Governance Token",
        "symbol": "CGG",
        "decimals": 18,
        "address": "0x2ab4f9ac80f33071211729e45cfc346c1f8446d5",
        "logoURI": "https://assets.polygon.technology/tokenAssets/cgg.svg"
    },
    "inst": {
        "chainId": 137,
        "name": "Instadapp",
        "symbol": "INST",
        "decimals": 18,
        "address": "0xf50d05a1402d0adafa880d36050736f9f6ee7dee",
        "logoURI": ""
    },
    "dfx": {
        "chainId": 137,
        "name": "DFX Token",
        "symbol": "DFX",
        "decimals": 18,
        "address": "0xe7804d91dfcde7f776c90043e03eaa6df87e6395",
        "logoURI": ""
    },
    "nex": {
        "chainId": 137,
        "name": "Nash Exchange Token",
        "symbol": "NEX",
        "decimals": 8,
        "address": "0xa486c6bc102f409180ccb8a94ba045d39f8fc7cb",
        "logoURI": "https://assets.polygon.technology/tokenAssets/nex.svg"
    },
    "mkr": {
        "chainId": 137,
        "name": "MAKER",
        "symbol": "MKR",
        "decimals": 18,
        "address": "0x6f7c932e7684666c9fd1d44527765433e01ff61d",
        "logoURI": ""
    },
    "chain": {
        "chainId": 137,
        "name": "Chain Games",
        "symbol": "CHAIN",
        "decimals": 18,
        "address": "0xd55fce7cdab84d84f2ef3f99816d765a2a94a509",
        "logoURI": ""
    },
    "banana": {
        "chainId": 137,
        "name": "Banana",
        "symbol": "BANANA",
        "decimals": 18,
        "address": "0xbc91347e80886453f3f8bbd6d7ac07c122d87735",
        "logoURI": ""
    },
    "wombat": {
        "chainId": 137,
        "name": "Wombat",
        "symbol": "WOMBAT",
        "decimals": 18,
        "address": "0x0c9c7712c83b3c70e7c5e11100d33d9401bdf9dd",
        "logoURI": ""
    },
    "uco": {
        "chainId": 137,
        "name": "UnirisToken",
        "symbol": "UCO",
        "decimals": 18,
        "address": "0x3c720206bfacb2d16fa3ac0ed87d2048dbc401fc",
        "logoURI": ""
    },
    "dfyn": {
        "chainId": 137,
        "name": "DFYN Token",
        "symbol": "DFYN",
        "decimals": 18,
        "address": "0xc168e40227e4ebd8c1cae80f7a55a4f0e6d66c97",
        "logoURI": ""
    },
    "factr": {
        "chainId": 137,
        "name": "Defactor",
        "symbol": "FACTR",
        "decimals": 18,
        "address": "0xe0bceef36f3a6efdd5eebfacd591423f8549b9d5",
        "logoURI": ""
    },
    "iq": {
        "chainId": 137,
        "name": "Everipedia IQ",
        "symbol": "IQ",
        "decimals": 18,
        "address": "0xb9638272ad6998708de56bbc0a290a1de534a578",
        "logoURI": ""
    },
    "hex": {
        "chainId": 137,
        "name": "HEX",
        "symbol": "HEX",
        "decimals": 8,
        "address": "0x23d29d30e35c5e8d321e1dc9a8a61bfd846d4c5c",
        "logoURI": "https://assets.polygon.technology/tokenAssets/hex.svg"
    },
    "myst": {
        "chainId": 137,
        "name": "Mysterium",
        "symbol": "MYST",
        "decimals": 18,
        "address": "0x1379e8886a944d2d9d440b3d88df536aea08d9f3",
        "logoURI": ""
    },
    "ads": {
        "chainId": 137,
        "name": "Adshares",
        "symbol": "ADS",
        "decimals": 11,
        "address": "0x598e49f01befeb1753737934a5b11fea9119c796",
        "logoURI": ""
    },
    "swap": {
        "chainId": 137,
        "name": "TrustSwap Token",
        "symbol": "SWAP",
        "decimals": 18,
        "address": "0x3809dcdd5dde24b37abe64a5a339784c3323c44f",
        "logoURI": ""
    },
    "sd": {
        "chainId": 137,
        "name": "Stader",
        "symbol": "SD",
        "decimals": 18,
        "address": "0x1d734a02ef1e1f5886e66b0673b71af5b53ffa94",
        "logoURI": ""
    },
    "cot": {
        "chainId": 137,
        "name": "CosplayToken",
        "symbol": "COT",
        "decimals": 18,
        "address": "0x8d520c8e66091cfd6743fe37fbe3a09505616c4b",
        "logoURI": ""
    },
    "sure": {
        "chainId": 137,
        "name": "inSure DeFi",
        "symbol": "SURE",
        "decimals": 18,
        "address": "0xf88332547c680f755481bf489d890426248bb275",
        "logoURI": "https://insuretoken.net/images/logo-grey-circle.png"
    },
    "dpi": {
        "chainId": 137,
        "name": "DefiPulse Index",
        "symbol": "DPI",
        "decimals": 18,
        "address": "0x85955046df4668e1dd369d2de9f3aeb98dd2a369",
        "logoURI": "https://assets.polygon.technology/tokenAssets/dpi.svg"
    },
    "ovr": {
        "chainId": 137,
        "name": "OVR",
        "symbol": "OVR",
        "decimals": 18,
        "address": "0x1631244689ec1fecbdd22fb5916e920dfc9b8d30",
        "logoURI": ""
    },
    "jrt": {
        "chainId": 137,
        "name": "Jarvis Reward Token",
        "symbol": "JRT",
        "decimals": 18,
        "address": "0x596ebe76e2db4470966ea395b0d063ac6197a8c5",
        "logoURI": "https://assets.polygon.technology/tokenAssets/jrt.svg"
    },
    "thx": {
        "chainId": 137,
        "name": "THX Network",
        "symbol": "THX",
        "decimals": 18,
        "address": "0x2934b36ca9a4b31e633c5be670c8c8b28b6aa015",
        "logoURI": ""
    },
    "dafi": {
        "chainId": 137,
        "name": "DAFI Token",
        "symbol": "DAFI",
        "decimals": 18,
        "address": "0x638df98ad8069a15569da5a6b01181804c47e34c",
        "logoURI": "https://assets.polygon.technology/tokenAssets/dafi.svg"
    },
    "unix": {
        "chainId": 137,
        "name": "UniX Gaming",
        "symbol": "UNIX",
        "decimals": 18,
        "address": "0x8c4476dfec8e7eedf2de3e9e9461b7c14c828d46",
        "logoURI": ""
    },
    "fox": {
        "chainId": 137,
        "name": "FOX",
        "symbol": "FOX",
        "decimals": 18,
        "address": "0x65a05db8322701724c197af82c9cae41195b0aa8",
        "logoURI": "https://assets.polygon.technology/tokenAssets/fox.svg"
    },
    "om": {
        "chainId": 137,
        "name": "MANTRA DAO",
        "symbol": "OM",
        "decimals": 18,
        "address": "0xc3ec80343d2bae2f8e680fdadde7c17e71e114ea",
        "logoURI": ""
    },
    "mchc": {
        "chainId": 137,
        "name": "MCHCoin",
        "symbol": "MCHC",
        "decimals": 18,
        "address": "0xee7666aacaefaa6efeef62ea40176d3eb21953b9",
        "logoURI": ""
    },
    "xcad": {
        "chainId": 137,
        "name": "XCAD Token",
        "symbol": "XCAD",
        "decimals": 18,
        "address": "0xa55870278d6389ec5b524553d03c04f5677c061e",
        "logoURI": ""
    },
    "govi": {
        "chainId": 137,
        "name": "GOVI",
        "symbol": "GOVI",
        "decimals": 18,
        "address": "0x43df9c0a1156c96cea98737b511ac89d0e2a1f46",
        "logoURI": ""
    },
    "fear": {
        "chainId": 137,
        "name": "Fear NFTs",
        "symbol": "FEAR",
        "decimals": 18,
        "address": "0xa2ca40dbe72028d3ac78b5250a8cb8c404e7fb8c",
        "logoURI": ""
    },
    "thales": {
        "chainId": 137,
        "name": "Thales DAO Token",
        "symbol": "THALES",
        "decimals": 18,
        "address": "0x692c44990e4f408ba0917f5c78a83160c1557237",
        "logoURI": "https://raw.githubusercontent.com/0xProject/0x-staking-pool-registry/master/logos/thales_logo.png"
    },
    "reth": {
        "chainId": 137,
        "name": "Rocket Pool ETH",
        "symbol": "RETH",
        "decimals": 18,
        "address": "0x0266f4f08d82372cf0fcbccc0ff74309089c74d1",
        "logoURI": ""
    },
    "ubt": {
        "chainId": 137,
        "name": "Unibright",
        "symbol": "UBT",
        "decimals": 8,
        "address": "0x7fbc10850cae055b27039af31bd258430e714c62",
        "logoURI": "https://assets.polygon.technology/tokenAssets/ubt.svg"
    },
    "umbr": {
        "chainId": 137,
        "name": "UmbriaToken",
        "symbol": "UMBR",
        "decimals": 18,
        "address": "0x2e4b0fb46a46c90cb410fe676f24e466753b469f",
        "logoURI": "https://assets.polygon.technology/tokenAssets/umbr.svg"
    },
    "ape": {
        "chainId": 137,
        "name": "Apecoin",
        "symbol": "APE",
        "decimals": 18,
        "address": "0xb7b31a6bc18e48888545ce79e83e06003be70930",
        "logoURI": "https://assets.polygon.technology/tokenAssets/ape.svg"
    },
    "dht": {
        "chainId": 137,
        "name": "dHedge DAO Token",
        "symbol": "DHT",
        "decimals": 18,
        "address": "0x8c92e38eca8210f4fcbf17f0951b198dd7668292",
        "logoURI": "https://assets.polygon.technology/tokenAssets/dht.svg"
    },
    "sg": {
        "chainId": 137,
        "name": "SocialGood",
        "symbol": "SG",
        "decimals": 18,
        "address": "0x79375c41d88f839f551457145066096c5c8944bc",
        "logoURI": ""
    },
    "blank": {
        "chainId": 137,
        "name": "GoBlank Token",
        "symbol": "BLANK",
        "decimals": 18,
        "address": "0xf4c83080e80ae530d6f8180572cbbf1ac9d5d435",
        "logoURI": ""
    },
    "push": {
        "chainId": 137,
        "name": "\"Ethereum Push Notification Service",
        "symbol": "PUSH",
        "decimals": 18,
        "address": "0x58001cc1a9e17a20935079ab40b1b8f4fc19efd1",
        "logoURI": ""
    },
    "trade": {
        "chainId": 137,
        "name": "Polytrade PoS",
        "symbol": "TRADE",
        "decimals": 18,
        "address": "0x692ac1e363ae34b6b489148152b12e2785a3d8d6",
        "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/10465.png"
    },
    "four": {
        "chainId": 137,
        "name": "The 4th Pillar Token",
        "symbol": "FOUR",
        "decimals": 18,
        "address": "0x48cbc913de09317df2365e6827df50da083701d5",
        "logoURI": ""
    },
    "hop": {
        "chainId": 137,
        "name": "Hop",
        "symbol": "HOP",
        "decimals": 18,
        "address": "0x189966afbe2107b4dc22d26f8c1c31cf27bc6695",
        "logoURI": ""
    },
    "dweb": {
        "chainId": 137,
        "name": "DecentraWeb",
        "symbol": "DWEB",
        "decimals": 18,
        "address": "0x8839e639f210b80ffea73aedf51baed8dac04499",
        "logoURI": ""
    },
    "wchi": {
        "chainId": 137,
        "name": "Wrapped CHI",
        "symbol": "WCHI",
        "decimals": 8,
        "address": "0xe79feaaa457ad7899357e8e2065a3267ac9ee601",
        "logoURI": ""
    },
    "vest": {
        "chainId": 137,
        "name": "DAO Invest",
        "symbol": "VEST",
        "decimals": 18,
        "address": "0x381caf412b45dac0f62fbeec89de306d3eabe384",
        "logoURI": ""
    },
    "xed": {
        "chainId": 137,
        "name": "Exeedme",
        "symbol": "XED",
        "decimals": 18,
        "address": "0x2fe8733dcb25bfbba79292294347415417510067",
        "logoURI": "https://assets.polygon.technology/tokenAssets/xed.svg"
    },
    "boson": {
        "chainId": 137,
        "name": "Boson Token",
        "symbol": "BOSON",
        "decimals": 18,
        "address": "0x9b3b0703d392321ad24338ff1f846650437a43c9",
        "logoURI": ""
    },
    "pool": {
        "chainId": 137,
        "name": "PoolTogether",
        "symbol": "POOL",
        "decimals": 18,
        "address": "0x25788a1a171ec66da6502f9975a15b609ff54cf6",
        "logoURI": "https://assets.polygon.technology/tokenAssets/pool.svg"
    },
    "mod": {
        "chainId": 137,
        "name": "MODEFI ",
        "symbol": "MOD",
        "decimals": 18,
        "address": "0x8346ab8d5ea7a9db0209aed2d1806afa0e2c4c21",
        "logoURI": "https://assets.polygon.technology/tokenAssets/mod.svg"
    },
    "amkt": {
        "chainId": 137,
        "name": "Alongside Crypto Market Index",
        "symbol": "AMKT",
        "decimals": 18,
        "address": "0xb87904db461005fc716a6bf9f2d451c33b10b80b",
        "logoURI": ""
    },
    "1inch": {
        "chainId": 137,
        "name": "1Inch",
        "symbol": "1INCH",
        "decimals": 18,
        "address": "0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
        "logoURI": ""
    },
    "comp": {
        "chainId": 137,
        "name": "Compound",
        "symbol": "COMP",
        "decimals": 18,
        "address": "0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
        "logoURI": ""
    },
    "apw": {
        "chainId": 137,
        "name": "APWine Token",
        "symbol": "APW",
        "decimals": 18,
        "address": "0x6c0ab120dbd11ba701aff6748568311668f63fe0",
        "logoURI": ""
    },
    "pop": {
        "chainId": 137,
        "name": "Popcorn",
        "symbol": "POP",
        "decimals": 18,
        "address": "0xc5b57e9a1e7914fda753a88f24e5703e617ee50c",
        "logoURI": "https://app.pop.network/images/icons/POP.svg"
    },
    "mimo": {
        "chainId": 137,
        "name": "MIMO Parallel Governance Token",
        "symbol": "MIMO",
        "decimals": 18,
        "address": "0xadac33f543267c4d59a8c299cf804c303bc3e4ac",
        "logoURI": ""
    },
    "meed": {
        "chainId": 137,
        "name": "Meeds",
        "symbol": "MEED",
        "decimals": 18,
        "address": "0x6aca77cf3bab0c4e8210a09b57b07854a995289a",
        "logoURI": "https://github.com/Meeds-io/.github/raw/main/profile/meeds-256x256.png"
    },
    "ankr": {
        "chainId": 137,
        "name": "Ankr",
        "symbol": "ANKR",
        "decimals": 18,
        "address": "0x101a023270368c0d50bffb62780f4afd4ea79c35",
        "logoURI": "https://assets.polygon.technology/tokenAssets/ankr.svg"
    },
    "dyad": {
        "chainId": 137,
        "name": "DYAD Stable",
        "symbol": "DYAD",
        "decimals": 18,
        "address": "0xf12561a7755ebee692cccec941636f14ca66fca2",
        "logoURI": "https://assets.polygon.technology/tokenAssets/dyad.svg"
    }
}