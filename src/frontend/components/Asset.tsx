import Image from "next/image";
import { Token } from "../../shared/types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
export const Asset = ({ token, amount, onAssetClick, onAmountChange }: { token: Token; amount: number, onAssetClick?: () => void, onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-3xl text-black">
            <h3>Pay</h3>
            <div className="flex items-center justify-between gap-2 my-4">
                <div className="flex items-center gap-4 cursor-pointer" onClick={onAssetClick}>
                    <Image
                        alt={token?.name}
                        className="h-11 w-11 rounded-md"
                        src={token?.logoURI}
                        width={47}
                        height={47}
                    />
                    <span className="text-xl">{token?.symbol}</span>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>

                <input
                    onChange={onAmountChange}
                    id="sell-amount"
                   // value={amount || 0}
                    className="input grow-0 shrink-0 max-w-[10rem] text-end w-full bg-transparent text-4xl"
                    type="number"
                    step=".0001"
                    /* onChange={(e) => {
                setTradeDirection("sell");
                setSellAmount(e.target.value);
              }} */
                />
            </div>
        </div>
    );
};
