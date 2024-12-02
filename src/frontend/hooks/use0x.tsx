import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
    useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { GaslessService } from "../services/gaslessService";
import { useAccount, useChainId } from "wagmi";
import { Address, formatUnits, zeroAddress } from "viem";
import { Token } from "../../shared/types";
import { TokensService } from "../services/tokensService";
import { parseUnits } from "ethers";
import { AFFILIATE_FEE, FEE_RECIPIENT } from "../../shared/constants";

type State0x = {
    sellToken: Token | undefined;
    buyToken: Token | undefined;
    sellAmount: string;
    tradeDirection: string;
};

type Actions0x =
    | { type: "SET_SELL_TOKEN"; payload: Token }
    | { type: "SET_BUY_TOKEN"; payload: Token }
    | { type: "SET_SELL_AMOUNT"; payload: string }
    | { type: "SET_TRADE_DIRECTION"; payload: string }
    | { type: "SET_CHAIN_ID"; payload: number | null };

const initialState: State0x = {
    sellToken: undefined,
    buyToken: undefined,
    sellAmount: "0",
    tradeDirection: "sell",
};

const Context0x = createContext<{
    state: State0x;
    dispatch: React.Dispatch<Actions0x>;
    priceData: any;
    isLoadingPrice: boolean;
    chainId: number | undefined;
    taker: Address | undefined;
    allowanceNotRequired: boolean;
    affiliateFee: number | undefined;
}>({
    state: initialState,
    dispatch: () => null,
    priceData: null,
    isLoadingPrice: false,
    chainId: undefined,
    taker: undefined,
    allowanceNotRequired: false,
    affiliateFee: 0,
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
        default:
            return state;
    }
};

export const Provider0x = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const chainId = useChainId();
    const { address } = useAccount();

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

    return (
        <Context0x.Provider
            value={{
                state,
                dispatch,
                priceData,
                isLoadingPrice,
                chainId,
                taker: address,
                allowanceNotRequired: priceData?.issues.allowance === null,
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
