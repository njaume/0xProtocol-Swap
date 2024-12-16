import {
    GetGasLessPriceParams,
    GetGasLessQuoteParams,
    Token,
} from "../../shared/types";
import qs from "qs";
import { handleError } from "../../shared/utils/errors";

export class GaslessService {
    static getTokenGaslessPrice = async (params: GetGasLessPriceParams) => {
        try {
            if (
                params.sellToken &&
                params.buyToken &&
                Number(params.sellAmount) > 0 &&
                params.taker
            ) {
                const response = await fetch(
                    `/api/gasless/price?${qs.stringify(params)}`
                );
                const data = await response.json();
                if (!response.ok) {
                    handleError(data);
                    return null;
                }
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
                    `/api/gasless/quote?${qs.stringify(params)}`
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

    static submit = async ( tradeDataToSubmit: any, approvalDataToSubmit: any, chainId: number) => {
        try {
            const requestBody: any = {
                trade: tradeDataToSubmit,
                chainId: chainId
            };

            if (approvalDataToSubmit) {
                requestBody.approval = approvalDataToSubmit;
            }

            const response = await fetch(
                "api/gasless/submit",
                {
                    method: "POST",
                    headers: {
                        "0x-api-key": process.env.ZERO_EX_API_KEY as string,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                handleError(data);
                return null;
            }
            return data;
        } catch (error: any) {
            handleError(error);
            return null;
        }
    };
}
