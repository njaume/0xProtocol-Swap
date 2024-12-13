import { Address } from "viem";
import { useERC20Approve } from "../../hooks/useERC20Approve";
import Button from "../Button";

export const ApproveButton = ({
    taker,
    sellTokenAddress,
    disabled,
    spender,
    inSufficientBalance
}: {
    taker: Address;
    sellTokenAddress: Address;
    disabled?: boolean;
    spender: Address;
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
        spender
    );

    const isLoading = isReadLoading || isPending;
    const label = inSufficientBalance ? "Insufficient Balance" : isLoading ? "Approving..." : "Approve";
    if (isLoading || allowance === 0n) {
        return (
            <Button
                disabled={isLoading || disabled}
                onClick={approve}
            >
                {label}
            </Button>
        );
    }

    return null;
};
