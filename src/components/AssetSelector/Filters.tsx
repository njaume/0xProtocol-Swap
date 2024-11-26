import classNames from "classnames";

export const FILTERS = ["All", "Recents", "Stables"];
export const AssetFilters = ({
    value,
    onChange,
}: {
    value?: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div className="w-full flex justify-around mt-4">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    className={classNames(
                        "btn border-0 bg-gray-300 rounded-[20px] px-10 text-xl text-white",
                        { "bg-black": value === filter }
                    )}
                    onClick={() => onChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};
