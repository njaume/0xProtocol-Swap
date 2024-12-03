import { Address } from "viem";
import { useERC20Approve } from "../../hooks/useERC20Approve";

export const ApproveButton = ({
    taker,
    sellTokenAddress,
    disabled,
    price,
    inSufficientBalance
}: {
    taker: Address;
    sellTokenAddress: Address;
    disabled?: boolean;
    price: any;
    inSufficientBalance: boolean;
}) => {
    const {
        approve,
        allowance,
        isReadLoading,
        readError,
        readIsError,
        isPending,
        isError: writeIsError,
        writeContractResult,
        writeError,
    } = useERC20Approve(
        sellTokenAddress,
        taker,
        price?.issues.allowance.spender
    );

    const isLoading = isReadLoading || isPending;
    const label = inSufficientBalance ? "Insufficient Balance" : isLoading ? "Approving..." : "Approve";
    if (isLoading || allowance === 0n) {
        return (
            <button
                type="button"
                className="w-full bg-black text-white text-[35px] border-0 py-4 rounded-[41px] hover:bg-blue-700 disabled:opacity-25"
                disabled={isLoading || disabled}
                onClick={approve}
            >
                {label}
            </button>
        );
    }

    return null;
};
