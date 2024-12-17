import { useEffect, useState } from "react";
import { Address } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { GaslessService } from "../services/gaslessService";

// Enum for transaction statuses
export enum TxStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    Failed = "Failed",
}

// Utility function to map gasless service statuses to Status enum
const mapGaslessStatus = (gaslessStatus: string): TxStatus => {
    switch (gaslessStatus) {
        case "confirmed":
            return TxStatus.Confirmed;
        case "failed":
            return TxStatus.Failed;
        case "pending":
        case "submitted":
        case "succeeded":
        default:
            return TxStatus.Pending;
    }
};

export const use0xStatus = ({
    txHash,
    isNative,
    chainId,
}: {
    txHash?: Address;
    isNative: boolean;
    chainId?: number;
}) => {
    const [status, setStatus] = useState<TxStatus>(TxStatus.Pending);

    // Wagmi hook to check native transaction status
    const { status: txStatus } = useWaitForTransactionReceipt({
        hash: isNative ? txHash : undefined,
    });

    // Function to fetch gasless transaction status
    const fetchGaslessStatus = async (hash: Address) => {
        try {
            const { status: gaslessStatus } = await GaslessService.getStatus(
                hash,
                chainId
            );
            const mappedStatus = mapGaslessStatus(gaslessStatus);
            setStatus(mappedStatus);

            // Clear interval if the status is finalized
            if (
                mappedStatus === TxStatus.Confirmed ||
                mappedStatus === TxStatus.Failed
            ) {
                console.log("Transaction finalized, stopping polling.");
                return true; // Signal that polling can stop
            }
        } catch (error) {
            console.error("Failed to fetch gasless status:", error);
            setStatus(TxStatus.Failed);
            return true; // Stop polling on error
        }
        return false; // Continue polling
    };

    useEffect(() => {
        if (txHash) {
            if (isNative) {
                // Update status based on native transaction status
                if (txStatus === "success") {
                    setStatus(TxStatus.Confirmed);
                } else if (txStatus === "error") {
                    setStatus(TxStatus.Failed);
                }
            } else {
                // Poll periodically for gasless transaction status
                const interval = setInterval(async () => {
                    const shouldStop = await fetchGaslessStatus(txHash);
                    if (shouldStop) clearInterval(interval); // Stop polling if finalized
                }, 5000); // Poll every 5 seconds

                return () => clearInterval(interval); // Cleanup on unmount
            }
        }
    }, [txHash, isNative, txStatus]);

    return { status };
};
