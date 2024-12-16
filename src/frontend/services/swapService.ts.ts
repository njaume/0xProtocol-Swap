import {
    GetGasLessPriceParams,
    GetGasLessQuoteParams,
    Token,
} from "../../shared/types";
import qs from "qs";
import { handleError } from "../../shared/utils/errors";

export class SwapService {
    static getTokenSwapPrice = async (params: GetGasLessPriceParams) => {
        try {
            if (
                params.sellToken &&
                params.buyToken &&
                Number(params.sellAmount) > 0 &&
                params.taker
            ) {
                const response = await fetch(
                    `/api/swap/price?${qs.stringify(params)}`
                );
                const data = await response.json();
                if (!response.ok) {
                    handleError(data);
                    return null;
                }
                console.log("data", data);
                if(!data?.liquidityAvailable) {
                    throw new Error("No liquidity available");
                }
                return data;
            }
            return null;
        } catch (error: any) {
            handleError(error);
            return null;
        }
    };

    static getQuote = async (params: GetGasLessQuoteParams) => {
        try {
            if (
                params.sellToken &&
                params.buyToken &&
                Number(params.sellAmount) > 0
            ) {
                const response = await fetch(
                    `/api/swap/quote?${qs.stringify(params)}`
                );
                const data = await response.json();
                if (!response.ok) {
                    handleError(data);
                    return null;
                }
                return data;
            }
            return null;
        } catch (error: any) {
            handleError(error);
            return null;
        }
    };
}
