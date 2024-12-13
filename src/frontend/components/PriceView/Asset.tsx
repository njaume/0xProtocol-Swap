import Image from "next/image";
import { Token } from "../../../shared/types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AmountInput } from "../shared/AmountInput";
export const Asset = ({
    title,
    token,
    amount,
    onAssetClick,
    onAmountChange,
    disabled,
    isLoading,
}: {
    title: string;
    token: Token;
    amount: string | number;
    onAssetClick: () => void;
    onAmountChange?: (value: string) => void;
    disabled?: boolean;
    isLoading?: boolean;
}) => {
    return (
        <div className="p-8 bg-gray-100 rounded-3xl text-black">
            <h3 className="text-black font-semibold text-2xl">{title}</h3>
            <div className="flex items-center justify-between gap-2 mt-5">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={onAssetClick}
                >
                    <Image
                        alt={token?.name}
                        className="h-11 w-11 rounded-md"
                        src={token?.logoURI}
                        width={47}
                        height={47}
                    />
                    <span className="text-xl text-black font-semibold">
                        {token?.symbol}
                    </span>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
                {isLoading && (
                    <div className="flex flex-col items-end justify-end gap-1">
                        <div className="w-12 h-1 bg-gray-300 rounded skeleton"></div>
                        <div className="w-16 h-1 bg-gray-300 rounded skeleton"></div>
                        <div className="w-20 h-1 bg-gray-300 rounded skeleton"></div>
                    </div>
                )}
                {!isLoading && (
                    <AmountInput
                        onChange={onAmountChange}
                        defaultValue={String(amount)}
                        disabled={disabled || isLoading}
                    />
                )}
            </div>
        </div>
    );
};
