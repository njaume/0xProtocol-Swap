import classNames from "classnames";
export const TOKEN_FILTER = ["All", "Recent", "Stables"];
export const AssetFilters = ({
    value,
    onChange,
}: {
    value?: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div className="w-full flex justify-start gap-5 mt-4">
            {TOKEN_FILTER.map((filter) => {
                return (
                    <div
                        key={filter}
                        className={classNames(
                            { "bg-black": value === filter },
                            "btn border-0 bg-gray-light rounded-[30px] px-10 text-xl text-black hover:bg-[#E4E4E7] transition-all duration-300"
                        )}
                        onClick={() => onChange(filter)}
                    >
                        {filter}
                    </div>
                );
            })}
        </div>
    );
};
