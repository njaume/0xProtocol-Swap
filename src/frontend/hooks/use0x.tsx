import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { GaslessService } from "../services/gaslessService";
import {
    useAccount,
    useChainId,
    useSendTransaction,
    useSignTypedData,
} from "wagmi";
import { Address, concat, formatUnits, Hex, numberToHex, size } from "viem";
import { PriceResponse, QuoteResponse, Token } from "../../shared/types";
import { TokensService } from "../services/tokensService";
import { parseUnits } from "ethers";
import { AFFILIATE_FEE, FEE_RECIPIENT } from "../../shared/constants";
import { handleError } from "../../shared/utils/errors";

type State0x = {
    sellToken: Token | undefined;
    buyToken: Token | undefined;
    sellAmount: string;
    tradeDirection: string;
    quote: QuoteResponse | undefined;
};

type Actions0x =
    | { type: "SET_SELL_TOKEN"; payload: Token }
    | { type: "SET_BUY_TOKEN"; payload: Token }
    | { type: "SET_SELL_AMOUNT"; payload: string }
    | { type: "SET_TRADE_DIRECTION"; payload: string }
    | { type: "SET_CHAIN_ID"; payload: number | null }
    | { type: "SET_QUOTE"; payload: any };

const initialState: State0x = {
    sellToken: undefined,
    buyToken: undefined,
    sellAmount: "0",
    tradeDirection: "sell",
    quote: undefined,
};

const Context0x = createContext<{
    state: State0x;
    dispatch: React.Dispatch<Actions0x>;
    priceData: PriceResponse | null;
    isLoadingPrice: boolean;
    chainId: number | undefined;
    taker: Address | undefined;
    allowanceNotRequired: boolean;
    affiliateFee: number | undefined;
    swap: () => void;
    transactionPending: boolean;
    transactionHash: Address | undefined;
    transactionError: any | undefined;
    lastQuoteFetch: number | undefined;
}>({
    state: initialState,
    dispatch: () => null,
    priceData: null,
    isLoadingPrice: false,
    chainId: undefined,
    taker: undefined,
    allowanceNotRequired: false,
    affiliateFee: 0,
    swap: () => null,
    transactionPending: false,
    transactionHash: undefined,
    transactionError: undefined,
    lastQuoteFetch: undefined,
});

const reducer = (state: State0x, action: Actions0x): State0x => {
    switch (action.type) {
        case "SET_SELL_TOKEN":
            return { ...state, sellToken: action.payload };
        case "SET_BUY_TOKEN":
            return { ...state, buyToken: action.payload };
        case "SET_SELL_AMOUNT":
            return { ...state, sellAmount: action.payload };
        case "SET_TRADE_DIRECTION":
            return { ...state, tradeDirection: action.payload };
        case "SET_QUOTE":
            return { ...state, quote: action.payload };
        default:
            return state;
    }
};

export const Provider0x = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [lastQuoteFetch, setLastQuoteFetch] = useState<number | undefined>(
        undefined
    );

    const chainId = useChainId();
    const { address } = useAccount();
    const { signTypedDataAsync } = useSignTypedData();
    const {
        data: hash,
        isPending,
        error,
        sendTransaction,
    } = useSendTransaction();
    const chainTokens = useMemo(() => {
        return chainId ? TokensService.getTokenRecordsByChain(chainId) : {};
    }, [chainId]);

    useEffect(() => {
        if (!!Object.keys(chainTokens)) {
            dispatch({
                type: "SET_SELL_TOKEN",
                payload: chainTokens[Object.keys(chainTokens)[0]],
            });

            dispatch({
                type: "SET_BUY_TOKEN",
                payload: chainTokens[Object.keys(chainTokens)[1]],
            });
        }
    }, [chainId]);

    const { data: priceData, isLoading: isLoadingPrice } = useQuery({
        queryKey: [
            "getPrice",
            state.sellToken,
            state.buyToken,
            state.sellAmount,
            chainId,
            address,
        ],
        queryFn: async () => {
            if (
                !state.sellToken?.address ||
                !state.buyToken?.address ||
                !state.sellAmount ||
                !chainId ||
                !address
            ) {
                return null;
            }
            const parsedSellAmount = state.sellAmount
                ? parseUnits(
                      state.sellAmount,
                      state.sellToken.decimals
                  ).toString()
                : "0";
            const params = {
                chainId: chainId,
                sellToken: state.sellToken.address,
                buyToken: state.buyToken.address,
                sellAmount: parsedSellAmount,
                taker: address,
                swapFeeRecipient: FEE_RECIPIENT, //TODO: set by env
                swapFeeBps: AFFILIATE_FEE, //TODO: set by env
                swapFeeToken: state.buyToken.address, //TODO: set by env
                tradeSurplusRecipient: FEE_RECIPIENT, //TODO: set by env
            };

            return GaslessService.getTokenGaslessPrice(params);
        },
        enabled:
            !!state.sellToken &&
            !!state.buyToken &&
            !!state.sellAmount &&
            !!chainId &&
            !!address,
    });

    // Periodic fetch for quote data
    useEffect(() => {
        const fetchQuote = async () => {
            if (
                !!state.sellToken?.address &&
                !!state.buyToken?.address &&
                !!priceData?.sellAmount &&
                !!chainId &&
                !!address
            ) {
                const params = {
                    chainId: chainId,
                    sellToken: state.sellToken.address,
                    buyToken: state.buyToken.address,
                    sellAmount: priceData.sellAmount,
                    taker: address,
                    swapFeeRecipient: FEE_RECIPIENT,
                    swapFeeBps: AFFILIATE_FEE,
                    swapFeeToken: state.buyToken.address,
                    tradeSurplusRecipient: FEE_RECIPIENT,
                };

                const data = await GaslessService.getQuote(params);
                dispatch({ type: "SET_QUOTE", payload: data });
                setLastQuoteFetch(Date.now());
            }
        };

        fetchQuote();
        const interval = setInterval(fetchQuote, 30000);

        return () => clearInterval(interval);
    }, [
        state.sellToken?.address,
        state.buyToken?.address,
        priceData?.sellAmount,
        chainId,
        address,
    ]);

    const swap = async () => {
        try {
            const quote = state.quote;
            if (!quote) {
                throw new Error("No quote");
            }
            console.log("submitting quote to blockchain");
            console.log("to", quote.transaction.to);
            console.log("value", quote.transaction.value);

            // On click, (1) Sign the Permit2 EIP-712 message returned from quote
            if (quote.permit2?.eip712) {
                let signature: Hex | undefined;
                try {
                    signature = await signTypedDataAsync(quote.permit2.eip712);
                    console.log("Signed permit2 message from quote response");
                } catch (error) {
                    console.error("Error signing permit2 coupon:", error);
                }

                // (2) Append signature length and signature data to calldata
                if (signature && quote?.transaction?.data) {
                    const signatureLengthInHex = numberToHex(size(signature), {
                        signed: false,
                        size: 32,
                    });

                    const transactionData = quote.transaction.data as Hex;
                    const sigLengthHex = signatureLengthInHex as Hex;
                    const sig = signature as Hex;

                    quote.transaction.data = concat([
                        transactionData,
                        sigLengthHex,
                        sig,
                    ]);
                } else {
                    throw new Error(
                        "Failed to obtain signature or transaction data"
                    );
                }
            }

            // (3) Submit the transaction with Permit2 signature
            sendTransaction &&
                sendTransaction(
                    {
                        account: address,
                        gas: !!quote?.transaction.gas
                            ? BigInt(quote?.transaction.gas)
                            : undefined,
                        to: quote?.transaction.to,
                        data: quote.transaction.data, // submit
                        value: quote?.transaction.value
                            ? BigInt(quote.transaction.value)
                            : undefined, // value is used for native tokens
                        chainId: chainId,
                    },
                    {
                        onError: (error: any) => {
                            console.log("onError", error);
                        },
                        onSuccess: (data: any) => {
                            console.log("onSuccess", data);
                        },
                    }
                );
        } catch (error) {
            handleError(error);
        }
    };
   
    return (
        <Context0x.Provider
            value={{
                state,
                swap,
                dispatch,
                priceData,
                isLoadingPrice,
                transactionPending: isPending,
                transactionError: error,
                transactionHash: hash,
                chainId,
                taker: address,
                allowanceNotRequired: priceData?.issues.allowance === null,
                lastQuoteFetch,
                affiliateFee:
                    state.buyToken?.decimals &&
                    priceData &&
                    priceData.fees.integratorFee.amount
                        ? Number(
                              formatUnits(
                                  BigInt(priceData.fees.integratorFee.amount),
                                  state.buyToken?.decimals
                              )
                          )
                        : undefined,
            }}
        >
            {children}
        </Context0x.Provider>
    );
};

export const use0x = () => useContext(Context0x);
