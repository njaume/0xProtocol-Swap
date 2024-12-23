"use client";
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
        <div className="bg-gray-light flex items-center gap-2 md:gap-4 rounded-[20px] md:rounded-[30px] py-2 px-4 md:py-4 md:px-8">
            <MagnifyingGlassIcon className="w-6 h-6 md:w-10 md:h-10 fill-gray-dark" />
            <input
                type="search"
                className="grow text-gray-dark bg-gray-light text-base md:text-xl placeholder-gray-dark font-normal ring-0 outline-none"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};
