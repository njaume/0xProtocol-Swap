import { useSignTypedData, useWriteContract } from "wagmi";
import { erc20Abi, Hex } from "viem";
import {
    QuoteResponse,
    TxRelayApproval,
    TxRelayTrade,
} from "../../shared/types";
import { MAX_ALLOWANCE } from "../../shared/constants";
import { SignatureType, splitSignature } from "../../shared/utils/signature";
import { walletClient } from "../client";


export const useTxHelpers = () => {
    const { signTypedDataAsync } = useSignTypedData();
    const {
        data: writeContractResult,
        writeContractAsync: writeContract,
        error: writeContractError,
        isLoading: writeContractIsLoading,
        isError: writeContractIsError,
    } = useWriteContract();

    async function signTradeObject(trade: TxRelayTrade) {
        if (!trade) {
            throw new Error("No quote");
        }
        const tradeSignature = await signTypedDataAsync({
            types: trade?.eip712.types,
            domain: trade?.eip712.domain as any,
            message: trade?.eip712.message as any,
            primaryType: trade?.eip712.primaryType as any,
        });
        return tradeSignature;
    }

    async function signApprovalObject(approval: TxRelayApproval) {
        if (!approval) {
            throw new Error("No approval");
        }
        // Logic to sign approval object
        const approvalSignature = await signTypedDataAsync({
            types: approval?.eip712?.types,
            domain: approval?.eip712?.domain as any,
            message: approval?.eip712?.message as any,
            primaryType: approval?.eip712?.primaryType as any,
        });
        return approvalSignature;
    }

    async function standardApproval(quote?: QuoteResponse) {
        if (!quote) {
            throw new Error("No quote");
        }

        if(!walletClient) {
            throw new Error("No wallet client");
        }
        
        if (!quote?.issues?.allowance) return; //USDC already approved for Permit2

        writeContract({
            abi: erc20Abi,
            address: quote.issues.allowance.token,
            functionName: "approve",
            args: [quote.issues.allowance.spender, MAX_ALLOWANCE],
        });
        await walletClient?.waitForTransactionReceipt({
            hash: writeContractResult!,
        });

        return;
    }

    async function approvalSplitSignDataToSubmit(
        signature: Hex,
        approval?: TxRelayApproval
    ) {
        if (!approval) {
            throw new Error("No approval");
        }
        // split approval signature and package data to submit
        const approvalSplitSig = await splitSignature(signature);
        let approvalDataToSubmit = {
            type: approval.type,
            eip712: approval.eip712,
            signature: {
                ...approvalSplitSig,
                v: Number(approvalSplitSig.v),
                signatureType: SignatureType.EIP712,
            },
        };
        return approvalDataToSubmit; // Return approval object with split signature
    }

    async function tradeSplitSignDataToSubmit(
        signature: Hex,
        trade: TxRelayTrade
    ) {
        if (!trade) {
            throw new Error("No trade");
        }
        // split trade signature and package data to submit
        const tradeSplitSign = await splitSignature(signature);
        let tradeDataToSubmit = {
            type: trade.type,
            eip712: trade.eip712,
            signature: {
                ...tradeSplitSign,
                v: Number(tradeSplitSign.v),
                signatureType: SignatureType.EIP712,
            },
        };
        return tradeDataToSubmit; // Return trade object with split signature
    }

    return {
        signTradeObject,
        signApprovalObject,
        standardApproval,
        approvalSplitSignDataToSubmit,
        tradeSplitSignDataToSubmit,
        writeContractError,
        writeContractIsLoading,
        writeContractIsError,
    };
};
