import { Address } from "viem";
import { useERC20Approve } from "../../hooks/useERC20Approve";

export const ApproveButton = ({
    taker,
    onClick,
    sellTokenAddress,
    disabled,
    price,
}: {
    taker: Address;
    onClick: () => void;
    sellTokenAddress: Address;
    disabled?: boolean;
    price: any;
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
   
    const isLoading = isReadLoading || isPending
    if (isLoading || allowance === 0n) {
        return (
            <>
                <button
                    type="button"
                    className="bg-black btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    disabled={isLoading}
                    onClick={approve}
                >
                    {isLoading ? "Approving…" : "Approve"}
                </button>
            </>
        );
    }

    return null;
};
