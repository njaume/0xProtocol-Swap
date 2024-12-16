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
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import {
    Address,
    concat,
    erc20Abi,
    formatUnits,
    Hex,
    numberToHex,
    size,
} from "viem";
import { PriceResponse, QuoteResponse, Token } from "../../shared/types";
import { TokensService } from "../services/tokensService";
import { parseUnits } from "ethers";
import {
    AFFILIATE_FEE,
    FEE_RECIPIENT,
    MAX_ALLOWANCE,
} from "../../shared/constants";
import { handleError } from "../../shared/utils/errors";
import { isNativeToken } from "../../shared/utils";
import { SwapService } from "../services/swapService.ts";
import { SignatureType, splitSignature } from "../../shared/utils/signature";
import { publicClient, walletClient } from "../client";
import { useTxHelpers } from "./useTxHelpers";

type State0x = {
    sellToken: Token | undefined;
    buyToken: Token | undefined;
    sellAmount: string;
    isNativeToken: boolean;
    tradeDirection: string;
    quote: QuoteResponse | undefined;
    finalized: boolean;
    isLoading: boolean;
};

type Actions0x =
    | { type: "SET_SELL_TOKEN"; payload: Token }
    | { type: "SET_BUY_TOKEN"; payload: Token }
    | { type: "SET_SELL_AMOUNT"; payload: string }
    | { type: "SET_TRADE_DIRECTION"; payload: string }
    | { type: "SET_CHAIN_ID"; payload: number | null }
    | { type: "SET_QUOTE"; payload: any }
    | { type: "SET_IS_NATIVE_TOKEN"; payload: boolean }
    | { type: "SET_FINALIZED"; payload: boolean }
    | { type: "RESET" }
    | { type: "LOADING"; payload: boolean };

const initialState: State0x = {
    sellToken: undefined,
    buyToken: undefined,
    sellAmount: "0",
    tradeDirection: "sell",
    quote: undefined,
    isNativeToken: false,
    finalized: false,
    isLoading: false,
};

const Context0x = createContext<{
    state: State0x;
    dispatch: React.Dispatch<Actions0x>;
    priceData: PriceResponse | null;
    isLoadingPrice: boolean;
    isLoadingWriteContract: boolean;
    isLoadingSendTransaction: boolean;
    chainId: number | undefined;
    taker: Address | undefined;
    allowanceNotRequired: boolean;
    affiliateFee: number | undefined;
    swap: () => void;
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
    transactionHash: undefined,
    transactionError: undefined,
    lastQuoteFetch: undefined,
    isLoadingWriteContract: false,
    isLoadingSendTransaction: false,
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
        case "SET_IS_NATIVE_TOKEN":
            return { ...state, isNativeToken: action.payload };
        case "SET_FINALIZED":
            return { ...state, finalized: action.payload };
        case "LOADING":
            return { ...state, isLoading: action.payload };
        case "RESET":
            return initialState;
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
        data: writeContractResult,
        writeContractAsync: writeContract,
        error: writeError,
        isLoading: isLoadingWriteContract,
        isError: writeIsError,
    } = useWriteContract();
    const {
        signTradeObject,
        signApprovalObject,
        standardApproval,
        approvalSplitSignDataToSubmit,
        tradeSplitSignDataToSubmit,
        writeContractError,
        writeContractIsLoading,
        writeContractIsError,
    } = useTxHelpers();
    const {
        data: hash,
        isLoading: isLoadingSendTransaction,
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
    const getPrice = async (
        sellToken: Token | undefined,
        buyToken: Token | undefined,
        sellAmount: string,
        chainId: number,
        taker: Address | undefined
    ) => {
        if (!sellToken || !buyToken || !sellAmount || !chainId || !taker) {
            return null;
        }
        const parsedSellAmount = sellAmount
            ? parseUnits(sellAmount, sellToken.decimals).toString()
            : "0";
        const params = {
            chainId: chainId,
            sellToken: sellToken.address,
            buyToken: buyToken.address,
            sellAmount: parsedSellAmount,
            taker: taker,
            swapFeeRecipient: FEE_RECIPIENT, //TODO: set by env
            swapFeeBps: AFFILIATE_FEE, //TODO: set by env
            swapFeeToken: buyToken.address, //TODO: set by env
            tradeSurplusRecipient: FEE_RECIPIENT, //TODO: set by env
        };
        return isNativeToken(sellToken.address)
            ? SwapService.getTokenSwapPrice(params)
            : GaslessService.getTokenGaslessPrice(params);
    };
    const { data: priceData, isLoading: isLoadingPrice } = useQuery({
        queryKey: [
            "getPrice",
            state.sellToken,
            state.buyToken,
            state.sellAmount,
            chainId,
            address,
        ],
        queryFn: async () =>
            getPrice(
                state.sellToken,
                state.buyToken,
                state.sellAmount,
                chainId,
                address
            ),
        enabled:
            !!state.sellToken &&
            !!state.buyToken &&
            !!state.sellAmount &&
            !!chainId &&
            !!address,
    });

    // Periodic fetch for quote data
    useEffect(() => {
        const fetchQuote = async (isNativeToken = false) => {
            if (
                !!state.sellToken?.address &&
                !!state.buyToken?.address &&
                !!priceData?.sellAmount &&
                !!chainId &&
                !!address
            ) {
                dispatch({ type: "LOADING", payload: true });
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

                const data = isNativeToken
                    ? await SwapService.getQuote(params)
                    : await GaslessService.getQuote(params);
                dispatch({ type: "SET_QUOTE", payload: data });
                setLastQuoteFetch(Date.now());
                dispatch({ type: "LOADING", payload: false });
            }
        };
        const isNative = isNativeToken(state.sellToken?.address as string);
        fetchQuote(isNative);
        const interval = setInterval(() => {
            fetchQuote(isNative);
        }, 30000);
        //check and set if is sell token is native
        dispatch({
            type: "SET_IS_NATIVE_TOKEN",
            payload: isNative,
        });

        return () => clearInterval(interval);
    }, [
        state.sellToken?.address,
        state.buyToken?.address,
        priceData?.sellAmount,
        chainId,
        address,
    ]);

    const swapNormal = async () => {
        try {
            const quote = state.quote;
            if (!quote) {
                throw new Error("No quote");
            }

            // On click, (1) Sign the Permit2 EIP-712 message returned from quote
            if (quote.permit2?.eip712) {
                let signature: Hex | undefined;
                signature = await signTypedDataAsync(quote.permit2.eip712);
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
                            handleError(error);
                        },
                        onSuccess: (data: any) => {
                            dispatch({
                                type: "SET_FINALIZED",
                                payload: true,
                            });
                        },
                    }
                );
        } catch (error) {
            handleError(error);
        }
    };

    const swapGasless = async () => {
        const { quote } = state;
        if (!quote) {
            throw new Error("No quote");
        }
        // 3. Check if token approval is required and if gasless approval is available
        const tokenApprovalRequired = state?.quote?.issues?.allowance != null;
        const gaslessApprovalAvailable = state?.quote?.approval != null;
        let successfulTradeHash: any = null;

        successfulTradeHash = await executeTrade(
            tokenApprovalRequired,
            gaslessApprovalAvailable
        );
        if (successfulTradeHash) {
            dispatch({ type: "SET_FINALIZED", payload: true });
        }
        async function executeTrade(
            tokenApprovalRequired: boolean,
            gaslessApprovalAvailable: boolean
        ) {
            let approvalSignature: Hex | null = null;
            let approvalDataToSubmit: any = null;
            let tradeDataToSubmit: any = null;
            let tradeSignature: any = null;

            if (tokenApprovalRequired) {
                if (gaslessApprovalAvailable && quote?.approval) {
                    approvalSignature = await signApprovalObject(
                        quote?.approval
                    ); // Function to sign approval object
                } else {
                    await standardApproval(quote); // Function to handle standard approval
                }
            }

            if (approvalSignature && quote?.approval) {
                approvalDataToSubmit = await approvalSplitSignDataToSubmit(
                    approvalSignature,
                    quote?.approval
                );
            }

            if (!quote?.trade) {
                throw new Error("No trade");
            }
            tradeSignature = await signTradeObject(quote?.trade); // Function to sign trade object
            tradeDataToSubmit = await tradeSplitSignDataToSubmit(
                tradeSignature,
                quote?.trade
            );

            successfulTradeHash = await submitTrade(
                tradeDataToSubmit,
                approvalDataToSubmit
            ); // Function to submit trade
            return successfulTradeHash;
        }

        // 4. Make a POST request to submit trade with tradeObject (and approvalObject if available)
        async function submitTrade(
            tradeDataToSubmit: any,
            approvalDataToSubmit: any
        ): Promise<void> {
            try {
                let successfulTradeHash;
                const requestBody: any = {
                    trade: tradeDataToSubmit,
                    chainId: publicClient.chain.id,
                };
                if (approvalDataToSubmit) {
                    requestBody.approval = approvalDataToSubmit;
                }
                const data = await GaslessService.submit(
                    tradeDataToSubmit,
                    approvalDataToSubmit,
                    chainId
                );
                successfulTradeHash = data?.tradeHash;

                return successfulTradeHash;
            } catch (error) {
                console.error("Error submitting the gasless swap", error);
                handleError(error);
            }
        }
    };

    const swap = async () => {
        try {
            return state.isNativeToken
                ? await swapNormal()
                : await swapGasless();
        } catch (error) {
            handleError(error);
        }
    };

    const affiliateFee = useMemo(() => {
        return state.buyToken?.decimals &&
            priceData &&
            priceData?.fees?.integratorFee?.amount
            ? Number(
                  formatUnits(
                      BigInt(priceData.fees.integratorFee.amount),
                      state.buyToken?.decimals
                  )
              )
            : undefined;
    }, [state.buyToken?.decimals, priceData?.fees?.integratorFee?.amount]);
    return (
        <Context0x.Provider
            value={{
                state,
                swap,
                dispatch,
                priceData,
                isLoadingPrice,
                isLoadingSendTransaction,
                isLoadingWriteContract,
                transactionError: error,
                transactionHash: hash,
                chainId,
                taker: address,
                allowanceNotRequired: priceData?.issues?.allowance === null,
                lastQuoteFetch,
                affiliateFee,
            }}
        >
            {children}
        </Context0x.Provider>
    );
};

export const use0x = () => useContext(Context0x);
