import { useEffect, useState, ChangeEvent } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
    useReadContract,
    useBalance,
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import {
    MAINNET_TOKENS,
    MAINNET_TOKENS_BY_SYMBOL,
    MAX_ALLOWANCE,
    AFFILIATE_FEE,
    FEE_RECIPIENT,
    POLYGON_TOKENS_BY_SYMBOL,
    ARBITRUM_TOKENS_BY_SYMBOL,
} from "../../shared/constants";
import qs from "qs";
import { ConnectButtonCustom } from "./ConnectButton";
import { ApproveOrReviewButton } from "./ApproveOrReviewButton";
import { AssetSelector } from "./AssetSelector";
import { useModal } from "../hooks/useModal";
import { Asset } from "./Asset";
import { PriceViewHeader } from "./Header";
import { TokensService } from "../services/tokensService";

export const DEFAULT_BUY_TOKEN = (chainId: number) => {
    if (chainId === 1) {
        return "weth";
    }
};

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

export default function PriceView({
    price,
    taker,
    setPrice,
    setFinalize,
    chainId,
}: {
    price: any;
    taker: Address | undefined;
    setPrice: (price: any) => void;
    setFinalize: (finalize: boolean) => void;
    chainId: number;
}) {
    const [sellToken, setSellToken] = useState("weth");
    const [buyToken, setBuyToken] = useState("usdc");
    const [sellAmount, setSellAmount] = useState("0");
    const [buyAmount, setBuyAmount] = useState("0");
    const [tradeDirection, setTradeDirection] = useState("sell");
    const [error, setError] = useState([]);
    const [buyTokenTax, setBuyTokenTax] = useState({
        buyTaxBps: "0",
        sellTaxBps: "0",
    });
    const [sellTokenTax, setSellTokenTax] = useState({
        buyTaxBps: "0",
        sellTaxBps: "0",
    });
    const { openModal, closeModal } = useModal("my_modal_1");
    const handleSellTokenChange = (token: string) => {
        setSellToken(token.toLocaleLowerCase());
        closeModal();
    };
    const handleBuyTokenChange = (token: string) => {
        setBuyToken(token.toLocaleLowerCase());
        closeModal();
    };

    const handleTokenChange = (token: string) => {
        if (tradeDirection === "sell") {
            handleSellTokenChange(token);
        } else {
            handleBuyTokenChange(token);
        }
    };
    

    const sellTokenObject = TokensService.getTokensByChain(chainId)[sellToken]; // tokensByChain(chainId)[sellToken];
    console.log("sellTokenObject", sellToken, sellTokenObject);
    const buyTokenObject =  TokensService.getTokensByChain(chainId)[buyToken];//tokensByChain(chainId)[buyToken];

    const sellTokenDecimals = sellTokenObject?.decimals;
    const buyTokenDecimals = buyTokenObject?.decimals;

    const parsedSellAmount =
        sellAmount && tradeDirection === "sell"
            ? parseUnits(sellAmount, sellTokenDecimals).toString()
            : undefined;

    const parsedBuyAmount =
        buyAmount && tradeDirection === "buy"
            ? parseUnits(buyAmount, buyTokenDecimals).toString()
            : undefined;

    // Fetch price data and set the buyAmount whenever the sellAmount changes
    useEffect(() => {
        const params = {
            chainId: chainId,
            sellToken: sellTokenObject?.address,
            buyToken: buyTokenObject?.address,
            sellAmount: parsedSellAmount,
            buyAmount: parsedBuyAmount,
            taker,
            swapFeeRecipient: FEE_RECIPIENT,
            swapFeeBps: AFFILIATE_FEE,
            swapFeeToken: buyTokenObject?.address,
            tradeSurplusRecipient: FEE_RECIPIENT,
        };

        async function main() {
            const response = await fetch(`/api/price?${qs.stringify(params)}`);
            const data = await response.json();
            console.log("price data", data);
            if (data?.validationErrors?.length > 0) {
                // error for sellAmount too low
                setError(data.validationErrors);
            } else {
                setError([]);
            }
            if (data.buyAmount) {
                setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
                setPrice(data);
            }
            // Set token tax information
            if (data?.tokenMetadata) {
                setBuyTokenTax(data.tokenMetadata.buyToken);
                setSellTokenTax(data.tokenMetadata.sellToken);
            }
        }

        if (sellAmount !== "") {
            main();
        }
    }, [
        sellTokenObject?.address,
        buyTokenObject?.address,
        parsedSellAmount,
        parsedBuyAmount,
        chainId,
        sellAmount,
        setPrice,
        FEE_RECIPIENT,
        AFFILIATE_FEE,
    ]);

    // Hook for fetching balance information for specified token for a specific taker address
    const { data, isError, isLoading } = useBalance({
        address: taker,
        token: sellTokenObject?.address,
    });

    console.log("taker sellToken balance: ", data);

    const inSufficientBalance =
        data && sellAmount
            ? parseUnits(sellAmount, sellTokenDecimals) > data.value
            : true;

    // Helper function to format tax basis points to percentage
    const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);

    const handleAssetClick = (direction: string) => {
        setTradeDirection(direction);
        openModal();
    };
    return (
        <div className="w-full">
            <AssetSelector value={sellToken} onChange={handleTokenChange} />
            <div className="container mx-auto p-10 card bg-white xl:w-1/3">
                <PriceViewHeader />
                <div className="rounded-md mb-5">
                    <section className="mt-4">
                        <Asset
                            token={buyTokenObject}
                            amount={Number(buyAmount)}
                            onAssetClick={() => handleAssetClick("buy")}
                            onAmountChange={(e) => setBuyAmount((e.target.value || 0).toString())}
                        />
                    </section>

                    <section className="mt-4">
                        <Asset
                            token={sellTokenObject}
                            amount={Number(sellAmount)}
                            onAssetClick={() => handleAssetClick("sell")}
                            onAmountChange={(e) => setSellAmount((e.target.value || 0).toString())}
                        />
                    </section>

                    {/* Affiliate Fee Display */}
                    <div className="text-slate-400">
                        {price && price.fees.integratorFee.amount
                            ? "Affiliate Fee: " +
                              Number(
                                  formatUnits(
                                      BigInt(price.fees.integratorFee.amount),
                                      MAINNET_TOKENS_BY_SYMBOL[buyToken]
                                          .decimals
                                  )
                              ) +
                              " " +
                              MAINNET_TOKENS_BY_SYMBOL[buyToken].symbol
                            : null}
                    </div>

                    {/* Tax Information Display */}
                    <div className="text-slate-400">
                        {buyTokenTax.buyTaxBps !== "0" && (
                            <p>
                                {sellTokenObject.symbol +
                                    ` Buy Tax: ${formatTax(
                                        buyTokenTax.buyTaxBps
                                    )}%`}
                            </p>
                        )}
                        {sellTokenTax.sellTaxBps !== "0" && (
                            <p>
                                {sellTokenObject.symbol +
                                    ` Sell Tax: ${formatTax(
                                        sellTokenTax.sellTaxBps
                                    )}%`}
                            </p>
                        )}
                    </div>
                </div>

                {taker ? (
                    <ApproveOrReviewButton
                        sellTokenAddress={sellTokenObject?.address}
                        taker={taker}
                        onClick={() => {
                            setFinalize(true);
                        }}
                        disabled={inSufficientBalance}
                        price={price}
                    />
                ) : (
                    <ConnectButtonCustom />
                )}
            </div>
        </div>
    );
}
