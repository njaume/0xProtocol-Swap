import {
    GetGasLessPriceParams,
    GetGasLessQuoteParams,
    Token,
} from "../../shared/types";
import qs from "qs";
import { handleError } from "../../shared/utils/errors";

export class GaslessService {
    static getTokenGaslessPrice = async (params: GetGasLessPriceParams) => {
        console.log("getTokenGaslessPrice", params);
        try {
            if (
                params.sellToken &&
                params.buyToken &&
                Number(params.sellAmount) > 0 &&
                params.taker
            ) {
                const response = await fetch(
                    `/api/price?${qs.stringify(params)}`
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
            console.log("getTokenGaslessPrice", error);
            handleError(error);
            return null;
        }
    };

    static getQuote = async (params: GetGasLessQuoteParams) => {
        console.log("getQuote", params);
        try {
            if (
                params.sellToken &&
                params.buyToken &&
                Number(params.sellAmount) > 0
            ) {
                const response = await fetch(
                    `/api/quote?${qs.stringify(params)}`
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
            console.log("getQuote", error);
            handleError(error);
            return null;
        }
    };
}
