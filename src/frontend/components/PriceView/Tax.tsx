import { formatTax } from "../../../shared/utils";

export const Tax = ({
    symbol,
    buy,
    tax,
    isLoading,
}: {
    symbol?: string;
    buy?: boolean;
    tax?: string;
    isLoading?: boolean;
}) => {
    return (
        <div className="text-gray-dark text-5 font-bold ml-5">
            {!isLoading ? (
                <p>
                    {`${symbol} ${buy ? "Buy" : "Sell"} tax: $
                    ${!!tax ? formatTax(tax) : "-"}%`}
                </p>
            ) : (
                <div className="flex items-start justify-start gap-1 my-2">
                    <div className="w-10 h-5 rounded skeleton bg-gray-light"></div>
                    <div className="w-5 h-5 rounded skeleton bg-gray-light"></div>
                    <div className="w-20 h-5 rounded skeleton bg-gray-light"></div>
                </div>
            )}
        </div>
    );
};
