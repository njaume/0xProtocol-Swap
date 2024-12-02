import { Address, erc20Abi } from "viem";
import {
    useWriteContract,
    useContractRead,
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
        isPending,
        isError: writeIsError,
    } = useWriteContract();

    const { data: approvalReceiptData, isLoading: isApproving } =
        useWaitForTransactionReceipt({
            hash: writeContractResult,
        });

    const {
        data: allowance,
        error: readError,
        isError: readIsError,
        isLoading: isReadLoading,
    } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "allowance",
        args: [owner, spender]
        
    });

    const approve = async () => {
        await writeContract({
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
