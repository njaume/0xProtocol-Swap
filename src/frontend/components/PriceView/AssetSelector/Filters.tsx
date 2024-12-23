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
        <div className="w-full flex flex-wrap justify-start gap-2 md:gap-5 mt-2 md:mt-4">
            {TOKEN_FILTER.map((filter) => {
                const classes = classNames(
                    { "bg-black text-white": value == filter },
                    { "bg-gray-light": value != filter },
                    "btn border-0 rounded-[20px] md:rounded-[30px] px-6 py-2 md:px-10 md:py-3 text-sm md:text-xl text-black hover:bg-[#E4E4E7] transition-all duration-300"
                );
                return (
                    <div
                        key={filter}
                        className={classes}
                        onClick={() => onChange(filter)}
                    >
                        {filter}
                    </div>
                );
            })}
        </div>
    );
};
