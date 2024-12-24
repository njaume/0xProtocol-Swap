import classNames from "classnames";

export const TOKEN_FILTER = ["All", "Recent", "Stables"];

export const AssetFilters = ({
    value,
    onChange,
}: {
    value?: string;
    onChange: (value: string) => void;
}) => {
    const filterCount = TOKEN_FILTER.length;
    const filterWidth = `${100 / filterCount}%`;

    const activeIndex = TOKEN_FILTER.indexOf(value || "");
    const activeIndicatorClass = classNames(
        "flex-shrink-0 absolute top-0 left-0 h-[42px] py-5 bg-black rounded-[20px] md:rounded-[30px] transition-all duration-300 z-0",
        `translate-x-[${activeIndex * 100}%]`, // Dynamic translate
        `w-[${filterWidth}]` // Dynamic width
    );


    return (
        <div className="relative w-full flex justify-start flex-nowrap mt-2 md:mt-4">
            {/* Active background indicator */}
            <div
                className={activeIndicatorClass}
                style={{
                    width: filterWidth,
                    transform: `translateX(${
                        TOKEN_FILTER.indexOf(value || "") * 100
                    }%)`,
                }}
            />
            {TOKEN_FILTER.map((filter) => {
                const isActive = value === filter;
                const classes = classNames(
                    "relative text-center flex items-center justify-center h-[42px] z-10 cursor-pointer border-0 text-sm md:text-xl font-semibold transition-colors duration-300",
                    {
                        "text-white": isActive,
                        "text-black": !isActive,
                    }
                );
                return (
                    <div
                        key={filter}
                        className={classes}
                        onClick={() => onChange(filter)}
                        style={{
                            width: filterWidth,
                        }}
                    >
                        {filter}
                    </div>
                );
            })}
        </div>
    );
};
