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
                const classes = classNames(
                    { "bg-black text-white": value == filter },
                    { "bg-gray-light": value != filter },
                    "btn border-0 rounded-[30px] px-10 text-xl text-black hover:bg-[#E4E4E7] transition-all duration-300"
                )
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
