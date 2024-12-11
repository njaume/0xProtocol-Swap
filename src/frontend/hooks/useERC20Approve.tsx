import { Address, erc20Abi, zeroAddress } from "viem";
import {
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { MAX_ALLOWANCE } from "../../shared/constants";

export const useERC20Approve = (
    tokenAddress: Address,
    owner: Address,
    spender: Address
) => {
    const {
        data: writeContractResult,
        writeContractAsync: writeContract,
        error: writeError,
        isLoading: isPending,
        isError: writeIsError,
    } = useWriteContract();

    const { data: approvalReceiptData, isLoading: isApproving } =
        useWaitForTransactionReceipt({
            hash: writeContractResult,
        });

    const canReadAllowance = Boolean(![tokenAddress, owner, spender].includes(zeroAddress));

    // Always call useReadContract, provide dummy values if cannot read allowance
    const {
        data: allowance,
        error: readError,
        isError: readIsError,
        isLoading: isReadLoading,
    } = useReadContract({
        abi: erc20Abi,
        address: canReadAllowance ? tokenAddress : undefined, // Provide dummy values
        functionName: canReadAllowance ? "allowance" : undefined,
        args: canReadAllowance ? [owner, spender] : undefined,
        enabled: canReadAllowance, // Control whether the hook actually makes a request
    });

    const approve = async () => {
        if (!tokenAddress || !spender) return;
        return writeContract({
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "approve",
            args: [spender, MAX_ALLOWANCE],
        });
    };

    return {
        approve,
        allowance,
        isReadLoading,
        readError,
        readIsError,
        isPending,
        isError: writeIsError,
        writeContractResult,
        approvalReceiptData,
        isApproving,
        writeError,
    };
};

