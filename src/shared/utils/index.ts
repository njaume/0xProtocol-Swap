export const roundToNDecimals = (value: string, decimals: number): number => {
 return parseFloat(Number(value).toFixed(decimals));
};

export const formatTax = (taxBps: string) => (parseFloat(taxBps) / 100).toFixed(2);
