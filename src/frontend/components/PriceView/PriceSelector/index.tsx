import { Asset } from "./Asset";
import { Token } from "../../../../shared/types";
import SwitchButton from "./SwitchButton";

export default function PriceSelector({
    buyAmount,
    sellAmount,
    sellToken,
    buyToken,
    isLoading,
    handleAssetClick,
    handleSellAmountChange,
    handleSwitchClick,
}: {
    buyAmount: string | number;
    sellAmount: string;
    sellToken?: Token;
    buyToken?: Token;
    isLoading: boolean;
    handleAssetClick: (direction: string) => void;
    handleSellAmountChange: (value: string) => void;
    handleSwitchClick: () => void;
}) {


    return (
        <div className="rounded-md my-10 relative">
            <section>
                {sellToken && (
                    <Asset
                        title="Pay"
                        token={sellToken}
                        amount={sellAmount}
                        onAssetClick={() => handleAssetClick("sell")}
                        onAmountChange={handleSellAmountChange}
                    />
                )}
            </section>
            <SwitchButton onClick={handleSwitchClick} />
            <section className="my-4">
                {buyToken && (
                    <Asset
                        title="Receive"
                        token={buyToken}
                        amount={buyAmount}
                        onAssetClick={() => handleAssetClick("buy")}
                        disabled
                        isLoading={isLoading}
                    />
                )}
            </section>
        </div>
    );
}
