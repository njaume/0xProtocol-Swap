import Image from "next/image";
import { Token } from "../../shared/types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AmountInput } from "./shared/AmountInput";
export const Asset = ({
    token,
    amount,
    onAssetClick,
    onAmountChange,
}: {
    token: Token;
    amount: number;
    onAssetClick: () => void;
    onAmountChange?: (value: string) => void;
}) => {
    return (
        <div className="p-4 bg-gray-100 rounded-3xl text-black">
            <h3>Pay</h3>
            <div className="flex items-center justify-between gap-2 my-4">
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={onAssetClick}
                >
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

                <AmountInput onChange={onAmountChange} />
            </div>
        </div>
    );
};
