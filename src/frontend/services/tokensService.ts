import {
    ARBITRUM_TOKENS,
    ARBITRUM_TOKENS_BY_SYMBOL,
    MAINNET_TOKENS,
    MAINNET_TOKENS_BY_SYMBOL,
    POLYGON_TOKENS,
    POLYGON_TOKENS_BY_SYMBOL,
    SEPOLIA_TESTNET_TOKENS,
    SEPOLIA_TESTNET_TOKENS_BY_SYMBOL,
} from "../../shared/constants";
import { Token } from "../../shared/types";

export class TokensService {
    static getTokenRecordsByChain(chainId: number): Record<string, Token> {
        switch (chainId) {
            case 137:
                return POLYGON_TOKENS_BY_SYMBOL;
            case 1:
                return MAINNET_TOKENS_BY_SYMBOL;
            case 42161:
                return ARBITRUM_TOKENS_BY_SYMBOL;
            case 11155111:
                return SEPOLIA_TESTNET_TOKENS_BY_SYMBOL;
            default:
                return {};
        }
    }

    static getTokensArrayByChain(chainId: number): Token[] {
        switch (chainId) {
            case 137:
                return POLYGON_TOKENS;
            case 1:
                return MAINNET_TOKENS;
            case 42161:
                return ARBITRUM_TOKENS;
            case 11155111:
                return SEPOLIA_TESTNET_TOKENS;
            default:
                return [];
        }
    }

    /* export const permitTokensByChain = (chainId: number) => {
  if (chainId === 137) {
    return MATIC_PERMIT_TOKENS;
  }
  if (chainId === 1) {
    return ETHEREUM_PERMIT_TOKENS;
  }
  if (chainId === 42161) {
    return ARBITRUM_PERMIT_TOKENS;
  }
  return MATIC_PERMIT_TOKENS;
}; */
}
