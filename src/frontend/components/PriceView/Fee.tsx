export const FeeDisplay = ({
    affiliateFee,
    symbol,
    isLoading,
}: {
    affiliateFee?: string | number;
    symbol?: string;
    isLoading: boolean;
}) => {
    return (
        <div className="text-gray-dark text-5 font-semibold ml-5">
            {!isLoading ? (
                `Affiliate Fee: ${!!affiliateFee ? affiliateFee : "-"} ${
                    !!symbol ? symbol : ""
                }`
            ) : (
                <div className="flex items-start justify-start gap-1 ">
                    <div className="w-10 h-5 rounded skeleton bg-gray-light"></div>
                    <div className="w-5 h-5 rounded skeleton bg-gray-light"></div>
                    :
                    <div className="w-40 h-5 rounded skeleton bg-gray-light"></div>
                </div>
            )}
        </div>
    );
};
