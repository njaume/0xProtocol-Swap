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
        <div className="bg-gray-light flex items-center gap-4 rounded-[30px] py-4 px-8">
            <MagnifyingGlassIcon className="w-10 h-10 fill-gray-dark" />
            <input
                type="text"
                className="grow text-gray-dark bg-gray-light text-xl placeholder-gray-dark font-normal"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};
