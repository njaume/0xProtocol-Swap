import { useEffect } from "react";
import {
    useReadContract,
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import { MAX_ALLOWANCE } from "../constants";

export const DEFAULT_BUY_TOKEN = (chainId: number) => {
    if (chainId === 1) {
        return "weth";
    }
};

export const ApproveOrReviewButton = ({
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
    // If price.issues.allowance is null, show the Review Trade button
    if (price?.issues.allowance === null) {
        return (
            <button
                type="button"
                disabled={disabled}
                onClick={() => {
                    // fetch data, when finished, show quote view
                    onClick();
                }}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-25"
            >
                {disabled ? "Insufficient Balance" : "Review Trade"}
            </button>
        );
    }

    // Determine the spender from price.issues.allowance
    const spender = price?.issues.allowance.spender;

    // 1. Read from erc20, check approval for the determined spender to spend sellToken
    const { data: allowance, refetch } = useReadContract({
        address: sellTokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [taker, spender],
    });
    console.log("checked spender approval");

    // 2. (only if no allowance): write to erc20, approve token allowance for the determined spender
    const { data } = useSimulateContract({
        address: sellTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, MAX_ALLOWANCE],
    });

    // Define useWriteContract for the 'approve' operation
    const {
        data: writeContractResult,
        writeContractAsync: writeContract,
        error,
    } = useWriteContract();

    // useWaitForTransactionReceipt to wait for the approval transaction to complete
    const { data: approvalReceiptData, isLoading: isApproving } =
        useWaitForTransactionReceipt({
            hash: writeContractResult,
        });

    // Call `refetch` when the transaction succeeds
    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }

    if (allowance === 0n) {
        return (
            <>
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={async () => {
                        await writeContract({
                            abi: erc20Abi,
                            address: sellTokenAddress,
                            functionName: "approve",
                            args: [spender, MAX_ALLOWANCE],
                        });
                        console.log("approving spender to spend sell token");

                        refetch();
                    }}
                >
                    {isApproving ? "Approving…" : "Approve"}
                </button>
            </>
        );
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => {
                // fetch data, when finished, show quote view
                onClick();
            }}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-25"
        >
            {disabled ? "Insufficient Balance" : "Review Trade"}
        </button>
    );
};
