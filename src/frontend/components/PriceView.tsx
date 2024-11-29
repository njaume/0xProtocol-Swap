import { useEffect, useState, ChangeEvent, useMemo } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
    useReadContract,
    useBalance,
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import { AFFILIATE_FEE, FEE_RECIPIENT } from "../../shared/constants";
import qs from "qs";
import { ConnectButtonCustom } from "./ConnectButton";
import { ApproveOrReviewButton } from "./ApproveOrReviewButton";
import { AssetSelector } from "./AssetSelector";
import { useModal } from "../hooks/useModal";
import { Asset } from "./Asset";
import { PriceViewHeader } from "./Header";
import { TokensService } from "../services/tokensService";
import { use0x } from "../hooks/use0x";
import { Token } from "../../shared/types";

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

export default function PriceView({}: {}) {
    const [tradeDirection, setTradeDirection] = useState("sell");
    const { state, dispatch, priceData, isLoadingPrice, chainId, taker } = use0x();
    /* const [buyTokenTax, setBuyTokenTax] = useState({
        buyTaxBps: "0",
        sellTaxBps: "0",
    });
    const [sellTokenTax, setSellTokenTax] = useState({
        buyTaxBps: "0",
        sellTaxBps: "0",
    }); */

    console.log("priceData", priceData);

   

    const { openModal, closeModal } = useModal("my_modal_1");

    const handleSellTokenChange = (token: Token) => {
      dispatch({ type: "SET_SELL_TOKEN", payload: token});
      closeModal();
  };

  const handleBuyTokenChange = (token: Token) => {
      dispatch({ type: "SET_BUY_TOKEN", payload: token});
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

    
    // Hook for fetching balance information for specified token for a specific taker address
    const { data, isError, isLoading } = useBalance({
        address: taker,
        token: state.sellToken?.address,
    });
    const sellTokenDecimals = state.sellToken?.decimals;
    const buyTokenDecimals = state.buyToken?.decimals;

    

    const buyAmount = priceData?.buyAmount
        ? formatUnits(priceData?.buyAmount, buyTokenDecimals)
        : 0;
    const sellTokenTax = priceData?.tokenMetadata?.sellToken;
    const buyTokenTax = priceData?.tokenMetadata?.buyToken;
    const inSufficientBalance =
        data && state.sellAmount
            ? parseUnits(state.sellAmount, sellTokenDecimals) > data.value
            : true;
    // Helper function to format tax basis points to percentage
    const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);

    const handleAssetClick = (direction: string) => {
        setTradeDirection(direction);
        openModal();
    };
    console.log("price", priceData);

    return (
        <div className="w-full">
            <AssetSelector
                value={state.sellToken?.symbol.toLocaleLowerCase()}
                onChange={handleTokenChange}
                chainId={chainId}
            />
            <div className="container mx-auto p-10 card bg-white xl:w-1/3">
                <PriceViewHeader />
                <div className="rounded-md mb-5">
                    <section className="mt-4">
                        {state.sellToken && <Asset
                            token={state.sellToken}
                            amount={Number(state.sellAmount)}
                            onAssetClick={() => handleAssetClick("sell")}
                            onAmountChange={handleSellAmountChange}
                        />}
                    </section>

                    <section className="mt-4">
                        {state.buyToken && <Asset
                            token={state.buyToken}
                            amount={Number(buyAmount)}
                            onAssetClick={() => handleAssetClick("buy")}
                        />}
                    </section>

                    {/* Affiliate Fee Display */}
                    <div className="text-slate-400">
                        {priceData && priceData.fees.integratorFee.amount
                            ? "Affiliate Fee: " +
                              Number(
                                  formatUnits(
                                      BigInt(priceData.fees.integratorFee.amount),
                                      state.buyToken?.decimals
                                  )
                              ) +
                              " " +
                              state.buyToken?.symbol
                            : null}
                    </div>

                    {/* Tax Information Display */}
                    <div className="text-slate-400">
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

                {taker && state.sellToken ? (
                    <ApproveOrReviewButton
                        sellTokenAddress={state.sellToken?.address}
                        taker={taker}
                        onClick={() => {
                           // setFinalize(true);
                        }}
                        disabled={inSufficientBalance}
                        price={priceData}
                    />
                ) : (
                    <ConnectButtonCustom />
                )}
            </div>
        </div>
    );
}
