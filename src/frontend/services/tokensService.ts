import {
    ARBITRUM_TOKENS_BY_SYMBOL,
    MAINNET_TOKENS_BY_SYMBOL,
    POLYGON_TOKENS_BY_SYMBOL,
} from "../../shared/constants";
import { Token } from "../../shared/types";

export class TokensService {
    static getTokensByChain(chainId: number): Record<string, Token> {
        switch (chainId) {
            case 137:
                return POLYGON_TOKENS_BY_SYMBOL;
            case 1:
                return MAINNET_TOKENS_BY_SYMBOL;
            case 42161:
                return ARBITRUM_TOKENS_BY_SYMBOL;
            default:
                return POLYGON_TOKENS_BY_SYMBOL;
        }
    }
}
