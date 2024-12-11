import { NATIVE_ADDRESS } from "../constants";

export const roundToNDecimals = (value: string, decimals: number): number => {
 return parseFloat(Number(value).toFixed(decimals));
};

export const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);
export const isNativeToken = (tokenAddress: string) => {
 console.log("isNativeToken", tokenAddress, NATIVE_ADDRESS);
 return tokenAddress == NATIVE_ADDRESS};