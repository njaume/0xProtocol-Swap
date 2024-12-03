import { useState } from "react";
import { formatUnits, parseUnits } from "ethers";
import { useBalance } from "wagmi";
import { zeroAddress } from "viem";
import { ConnectButtonCustom } from "../../components/ConnectButton";
import { ApproveButton } from "./ApproveButton";
import { AssetSelector } from "../../components/AssetSelector";
import { useModal } from "../../hooks/useModal";
import { Asset } from "./Asset";
import { PriceViewHeader } from "../../components/Header";
import { use0x } from "../../hooks/use0x";
import { Token } from "../../../shared/types";
import { formatTax, roundToNDecimals } from "../../../shared/utils";
import { useERC20Approve } from "../../hooks/useERC20Approve";

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

export default function PriceView() {
    const [tradeDirection, setTradeDirection] = useState("sell");
    const {
        state,
        dispatch,
        priceData,
        isLoadingPrice,
        chainId,
        taker,
        allowanceNotRequired,
        affiliateFee,
        swap
    } = use0x();

    const {
        data,
        isError,
        isLoading,
        refetch: refetchBalance,
    } = useBalance({
        address: taker,
        token: state.sellToken?.address,
    });

    const { openModal, closeModal } = useModal("my_modal_1");
    const { allowance } = useERC20Approve(
        state.sellToken?.address || zeroAddress,
        taker || zeroAddress,
        priceData?.issues.allowance?.spender || zeroAddress
    );

    const handleSellTokenChange = (token: Token) => {
        dispatch({ type: "SET_SELL_TOKEN", payload: token });
        closeModal();
    };

    const handleBuyTokenChange = (token: Token) => {
        dispatch({ type: "SET_BUY_TOKEN", payload: token });
        closeModal();
    };

    const handleSellAmountChange = (amount: string) => {
        dispatch({ type: "SET_SELL_AMOUNT", payload: amount });
    };

    const handleTokenChange = (token: Token) => {
        if (tradeDirection === "sell") {
            handleSellTokenChange(token);
        } else {
            handleBuyTokenChange(token);
        }
    };

    const sellTokenDecimals = state.sellToken?.decimals;
    const buyTokenDecimals = state.buyToken?.decimals;

    const buyAmount = roundToNDecimals(
        priceData?.buyAmount
            ? formatUnits(priceData?.buyAmount, buyTokenDecimals)
            : "0",
        3
    );
    const sellTokenTax = priceData?.tokenMetadata?.sellToken;
    const buyTokenTax = priceData?.tokenMetadata?.buyToken;

    const inSufficientBalance =
        data && state.sellAmount
            ? parseUnits(state?.sellAmount, sellTokenDecimals) > data.value
            : true;
    // Helper function to format tax basis points to percentage

    const handleAssetClick = (direction: string) => {
        setTradeDirection(direction);
        openModal();
    };
    console.log("priceData", priceData);
    console.log("state", state);
    console.log(
        "balance",
        state.sellToken?.symbol,
        data?.value,
        parseUnits(state?.sellAmount, sellTokenDecimals)
    );

    const showSwapButton =
        allowanceNotRequired || (!!allowance && allowance > 0n);
    return (
        <div className="w-full">
            <AssetSelector
                value={state.sellToken?.symbol.toLocaleLowerCase()}
                onChange={handleTokenChange}
                chainId={chainId}
            />
            <div className="container mx-auto p-10 card bg-white xl:w-1/3">
                <PriceViewHeader />
                <div className="rounded-md mb-10">
                    <section className="mt-4">
                        {state.sellToken && (
                            <Asset
                                token={state.sellToken}
                                amount={state.sellAmount}
                                onAssetClick={() => handleAssetClick("sell")}
                                onAmountChange={handleSellAmountChange}
                            />
                        )}
                    </section>

                    <section className="my-4">
                        {state.buyToken && (
                            <Asset
                                token={state.buyToken}
                                amount={buyAmount}
                                onAssetClick={() => handleAssetClick("buy")}
                            />
                        )}
                    </section>

                    {/* Affiliate Fee Display */}
                    <div className="text-slate-400 ml-5">
                        {priceData && priceData?.fees?.integratorFee?.amount
                            ? "Affiliate Fee: " +
                              affiliateFee +
                              " " +
                              state.buyToken?.symbol
                            : null}
                    </div>

                    {/* Tax Information Display */}
                    <div className="text-slate-400 ml-5">
                        {!!buyTokenTax?.buyTaxBps && (
                            <p>
                                {state.buyToken?.symbol +
                                    ` Buy Tax: ${formatTax(
                                        buyTokenTax.buyTaxBps
                                    )}%`}
                            </p>
                        )}
                        {!!sellTokenTax?.sellTaxBps && (
                            <p>
                                {state.sellToken?.symbol +
                                    ` Sell Tax: ${formatTax(
                                        sellTokenTax.sellTaxBps
                                    )}%`}
                            </p>
                        )}
                    </div>
                </div>
                {showSwapButton ? (
                    <button
                        disabled={inSufficientBalance}
                        className="w-full bg-black text-white text-[35px] border-0 py-4 rounded-[41px] hover:bg-blue-700 disabled:opacity-25"
                        onClick={() => {
                            swap();
                        }}
                    >
                        {inSufficientBalance ? "Insufficient Balance" : "Swap"}
                    </button>
                ) : (
                    taker &&
                    state.sellToken?.address &&
                    !showSwapButton && (
                        <ApproveButton
                            sellTokenAddress={state.sellToken?.address}
                            taker={taker}
                            onClick={() => {
                                // setFinalize(true);
                            }}
                            disabled={inSufficientBalance}
                            price={priceData}
                        />
                    )
                )}
                <ConnectButtonCustom showConnected={false} />
            </div>
        </div>
    );
}
