import { z } from "zod";
import {
  txRelaySubmitApprovalSchema,
  txRelaySubmitParamsSchema,
  txRelaySubmitRequestSchema,
  txRelaySubmitTradeSchema,
  txRelayTradeSchema,
  txRelayRequestSchemaClient,
  txRelayStatusRequestSchema,
} from "./utils/schema";
import type { Address, Hash, Hex } from "viem";
import { EIP712TypedData } from "./utils/signature";

export interface Token {
  name: string;
  address: Address;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  isStable?: boolean;
}

export interface GetGasLessPriceParams {
  chainId: number; 
  sellToken: Address;
  buyToken: Address;
  sellAmount: string;
  taker: Address;
  swapFeeRecipient: Address;
  swapFeeBps: number;
  swapFeeToken: Address;
  tradeSurplusRecipient: Address;
}

export interface GetGasLessQuoteParams {
  chainId: number; 
  sellToken: Address;
  buyToken: Address;
  sellAmount: string;
  taker: Address;
};

interface LiquiditySource {
  name: string;
  proportion: string;
  intermediateToken?: string;
  hops?: string[];
}

interface Fee {
  feeType: "gas" | "volume";
  feeToken: Address;
  feeAmount: string;
  billingType: "on-chain" | "off-chain";
}

export interface TxRelayFees {
  gasFee: Fee;
  zeroExFee?: Fee;
}

interface Eip712Domain {
  name?: string;
  version?: string;
  chainId?: number;
  verifyingContract?: Address;
  salt?: Address;
}

interface Eip712DataField {
  name: string;
  type: string;
}

export interface ExecuteMetaTransactionEip712 {
  types: {
    EIP712Domain: Eip712DataField[];
    MetaTransaction: Eip712DataField[];
  };
  primaryType: "MetaTransaction";
  domain: Eip712Domain;
  message: {
    nonce: number;
    from: string;
    functionSignature: string;
  };
}

export interface PermitEip712 {
  types: {
    EIP712Domain: Eip712DataField[];
    Permit: Eip712DataField[];
  };
  primaryType: "Permit";
  domain: Eip712Domain;
  message: {
    owner: string;
    spender: string;
    value: string;
    nonce: number;
    deadline: string;
  };
}

export enum GaslessApprovalTypes {
  ExecuteMetaTransaction = "executeMetaTransaction::approve",
  Permit = "permit",
  DaiPermit = "daiPermit",
}

export interface TxRelayApproval {
  isGaslessAvailable: boolean;
  isRequired: boolean;
  type?: GaslessApprovalTypes;
  hash?: string;
  eip712?: ExecuteMetaTransactionEip712 | PermitEip712;
}

export enum GaslessTypes {
  MetaTransaction = "metatransaction",
  MetaTransactionV2 = "metatransaction_v2",
  OtcOrder = "otc",
}

export type MetaTransactionV1Eip712Types = {
  EIP712Domain: Eip712DataField[];
  MetaTransactionData: Eip712DataField[];
};

export interface MetaTransactionV1Eip712Context extends EIP712TypedData {
  types: MetaTransactionV1Eip712Types;
  primaryType: "MetaTransactionData";
  domain: Eip712Domain;
  message: {
    signer: string;
    sender: string;
    minGasPrice: string;
    maxGasPrice: string;
    expirationTimeSeconds: string;
    salt: string;
    callData: string;
    value: string;
    feeToken: string;
    feeAmount: string;
  };
}

type MetaTransactionV2Eip712Types = {
  EIP712Domain: Eip712DataField[];
  MetaTransactionDataV2: Eip712DataField[];
  MetaTransactionFeeData: Eip712DataField[];
};

interface MetaTransactionV2Eip712Fee {
  recipient: string;
  amount: string;
}

export interface MetaTransactionV2Eip712Context extends EIP712TypedData {
  types: MetaTransactionV2Eip712Types;
  primaryType: "MetaTransactionDataV2";
  domain: Eip712Domain;
  message: {
    signer: string;
    sender: string;
    expirationTimeSeconds: string;
    salt: string;
    callData: string;
    feeToken: string;
    fees: MetaTransactionV2Eip712Fee[];
  };
}

export type TxRelayTrade = z.infer<typeof txRelayTradeSchema>;

export type TxRelayRequest = z.infer<typeof txRelayRequestSchemaClient>;

type Issues = {
  allowance: {
    spender: Address;
    token: Address;
  } | null;
  balance: object | null;
  simulationIncomplete: boolean;
  invalidSourcesPassed: string[];
 
};

type TokenMetadata = {
  buyToken: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
  sellToken: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
};

export interface PriceResponse {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  grossSellAmount: string;
  grossBuyAmount: string;
  allowanceTarget: Address;
  issues: Issues;
  route: [];
  tokenMetadata: TokenMetadata;
  fees: {
    integratorFee: {
      amount: string;
      token: string;
      type: "volume" | "gas";
    } | null;
    zeroExFee: {
      billingType: "on-chain" | "off-chain";
      feeAmount: string;
      feeToken: Address;
      feeType: "volume" | "gas";
    };
    gasFee: null;
  } | null;
  gas: string;
  gasPrice: string;
  auxiliaryChainData?: {
    l1GasEstimate?: number;
  };
}

// This interface is subject to change as the API V2 endpoints aren't finalized.
export interface QuoteResponse {
  sellToken: Address;
  buyToken: Address;
  sellAmount: string;
  buyAmount: string;
  grossSellAmount: string;
  grossBuyAmount: string;
  gasPrice: string;
  allowanceTarget: Address;
  route: [];
  issues: Issues;
  approval: TxRelayApproval | null;
  trade: TxRelayTrade | null;
  fees: {
    integratorFee: {
      amount: string;
      token: string;
      type: "volume" | "gas";
    } | null;
    zeroExFee: {
      billingType: "on-chain" | "off-chain";
      feeAmount: string;
      feeToken: Address;
      feeType: "volume" | "gas";
    };
    gasFee: null;
  } | null;
  auxiliaryChainData: {};
  to: Address;
  data: Hex;
  value: string;
  gas: string;
  permit2: {
    type: "Permit2";
    hash: Hex;
    eip712: EIP712TypedData;
  };
  transaction: V2QuoteTransaction;
  tokenMetadata: {
    buyToken: {
      buyTaxBps: string | null;
      sellTaxBps: string | null;
    };
    sellToken: {
      buyTaxBps: string | null;
      sellTaxBps: string | null;
    };
  };
}

export interface V2QuoteTransaction {
  data: Hex;
  gas: string | null;
  gasPrice: string;
  to: Address;
  value: string;
}