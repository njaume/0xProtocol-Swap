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
} from "../constants";
import ZeroExLogo from "../images/white-0x-logo.png";
import Image from "next/image";
import qs from "qs";
import { ConnectButtonCustom } from "./ConnectButton";
import { ApproveOrReviewButton } from "./ApproveOrReviewButton";
import { AssetSelector } from "./AssetSelector";

export const DEFAULT_BUY_TOKEN = (chainId: number) => {
  if (chainId === 1) {
    return "weth";
  }
};

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
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
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

  const handleSellTokenChange = (token: string) => {
    setSellToken(token);
  };
  function handleBuyTokenChange(e: ChangeEvent<HTMLSelectElement>) {
    setBuyToken(e.target.value);
  }

  const tokensByChain = (chainId: number) => {
    if (chainId === 1) {
      return MAINNET_TOKENS_BY_SYMBOL;
    }
    return MAINNET_TOKENS_BY_SYMBOL;
  };

  const sellTokenObject = tokensByChain(chainId)[sellToken];
  console.log("sellTokenObject", sellTokenObject);
  const buyTokenObject = tokensByChain(chainId)[buyToken];

  const sellTokenDecimals = sellTokenObject.decimals;
  const buyTokenDecimals = buyTokenObject.decimals;
  const sellTokenAddress = sellTokenObject.address;

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
      sellToken: sellTokenObject.address,
      buyToken: buyTokenObject.address,
      sellAmount: parsedSellAmount,
      buyAmount: parsedBuyAmount,
      taker,
      swapFeeRecipient: FEE_RECIPIENT,
      swapFeeBps: AFFILIATE_FEE,
      swapFeeToken: buyTokenObject.address,
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
    sellTokenObject.address,
    buyTokenObject.address,
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
    token: sellTokenObject.address,
  });

  console.log("taker sellToken balance: ", data);

  const inSufficientBalance =
    data && sellAmount
      ? parseUnits(sellAmount, sellTokenDecimals) > data.value
      : true;

  // Helper function to format tax basis points to percentage
  const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);

  return (
    <div>
      <AssetSelector value={sellToken} onChange={handleSellTokenChange} />
      <div className="container mx-auto p-10 card bg-white">
      <header
        className="flex items-center justify-between p-4"
      >
        <a href="https://0x.org/" target="_blank" rel="noopener noreferrer">
          <div className="flex items-center">
          <Image src={ZeroExLogo} alt="0x Logo" width={50} height={50} />
          <h2 className="text-lg text-black font-light">Swap</h2> 
          </div>
          
        </a>
        <ConnectButtonCustom />
      </header>
        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-md mb-3">
          <label htmlFor="sell" className="text-gray-300 mb-2 mr-2">
            Sell
          </label>
          <section className="mt-4 flex items-start justify-center">
            <label htmlFor="sell-select" className="sr-only"></label>
            <Image
              alt={sellToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={MAINNET_TOKENS_BY_SYMBOL[sellToken].logoURI}
              width={9}
              height={9}
            />

            <div className="h-14 sm:w-full sm:mr-2">
              <select
                onClick={()=>document.getElementById('my_modal_1').showModal()}
                value={sellToken}
                name="sell-token-select"
                id="sell-token-select"
                className="mr-2 w-50 sm:w-full h-9 rounded-md"
                onChange={handleSellTokenChange}
              >
                {/* <option value="">--Choose a token--</option> */}
                {MAINNET_TOKENS.map((token) => {
                  return (
                    <option
                      key={token.address}
                      value={token.symbol.toLowerCase()}
                    >
                      {token.symbol}
                    </option>
                  );
                })}
              </select>
            </div>
            <label htmlFor="sell-amount" className="sr-only"></label>
            <input
              id="sell-amount"
              value={sellAmount}
              className="h-9 rounded-md"
              style={{ border: "1px solid black" }}
              type="number"
              onChange={(e) => {
                setTradeDirection("sell");
                setSellAmount(e.target.value);
              }}
            />
          </section>
          <label htmlFor="buy" className="text-gray-300 mb-2 mr-2">
            Buy
          </label>
          <section className="flex mb-6 mt-4 items-start justify-center">
            <label htmlFor="buy-token" className="sr-only"></label>
            <Image
              alt={buyToken}
              className="h-9 w-9 mr-2 rounded-md"
              src={MAINNET_TOKENS_BY_SYMBOL[buyToken].logoURI}
              width={9}
              height={9}
            />
            <select
              name="buy-token-select"
              id="buy-token-select"
              value={buyToken}
              className="mr-2 w-50 sm:w-full h-9 rounded-md"
              onChange={(e) => handleBuyTokenChange(e)}
            >
              {/* <option value="">--Choose a token--</option> */}
              {MAINNET_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                );
              })}
            </select>
            <label htmlFor="buy-amount" className="sr-only"></label>
            <input
              id="buy-amount"
              value={buyAmount}
              className="h-9 rounded-md bg-white cursor-not-allowed"
              type="number"
              style={{ border: "1px solid black" }}
              disabled
              onChange={(e) => {
                setTradeDirection("buy");
                setBuyAmount(e.target.value);
              }}
            />
          </section>

          {/* Affiliate Fee Display */}
          <div className="text-slate-400">
            {price && price.fees.integratorFee.amount
              ? "Affiliate Fee: " +
                Number(
                  formatUnits(
                    BigInt(price.fees.integratorFee.amount),
                    MAINNET_TOKENS_BY_SYMBOL[buyToken].decimals
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
                {MAINNET_TOKENS_BY_SYMBOL[buyToken].symbol +
                  ` Buy Tax: ${formatTax(buyTokenTax.buyTaxBps)}%`}
              </p>
            )}
            {sellTokenTax.sellTaxBps !== "0" && (
              <p>
                {MAINNET_TOKENS_BY_SYMBOL[sellToken].symbol +
                  ` Sell Tax: ${formatTax(sellTokenTax.sellTaxBps)}%`}
              </p>
            )}
          </div>
        </div>

        {taker ? (
          <ApproveOrReviewButton
            sellTokenAddress={MAINNET_TOKENS_BY_SYMBOL[sellToken].address}
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
