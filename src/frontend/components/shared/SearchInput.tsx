import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/useDebounce";

export const SearchInput = ({
    onChange,
}: {
    onChange: (value: string) => void;
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Simulate a search function
    const search = (query: string) => {
        onChange(query);
    };

    // Trigger search when the debounced value changes
    useEffect(() => {
        search(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <label className="input bg-gray-100 flex items-center gap-2 rounded-[20px] text-xl mt-8">
            <MagnifyingGlassIcon className="w-5 fill-[#767676]" />
            <input
                type="text"
                className="grow text-[#767676]"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </label>
    );
};
