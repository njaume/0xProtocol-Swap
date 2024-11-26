import { ChangeEvent, useMemo, useState } from "react";
import { MAINNET_TOKENS } from "../../constants";
import Image from "next/image";
import {
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { AssetFilters, FILTERS } from "./Filters";
import { SearchInput } from "../shared/SearchInput";

export const AssetSelector = ({
    value,
    onChange,
}: {
    value?: string;
    onChange?: (value: string) => void;
}) => {
    const [token, setToken] = useState(value || MAINNET_TOKENS[0].symbol);
    const [filter, setFilter] = useState<string>(FILTERS[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSellTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setToken(e.target.value);
    };

    const handleFiltersChange = (filter: string) => {
        setFilter(filter);
    };

    const tokensFiltered = useMemo(() => {
        return MAINNET_TOKENS.filter((token) => {
            return !!searchTerm ? token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) : MAINNET_TOKENS;
        });
    }, [searchTerm]);

    console.log(tokensFiltered, "<-tokensFiltered");
    return (
        <dialog id="my_modal_1" className="modal w-full">
            <div className="modal-box bg-white w-full">
                <h2 className="text-2xl text-black">
                    Selected Token: <span className="font-bold">{token}</span>
                </h2>
                <SearchInput onChange={(value) => setSearchTerm(value)} />
                <AssetFilters onChange={handleFiltersChange} value={filter} />
                <div className="mt-4 max-h-80 overflow-y-scroll">
                    {tokensFiltered.map((token) => {
                        return (
                            <div
                                key={token.address}
                                //value={token.symbol.toLowerCase()}
                                className="w-full bg-white hover:bg-gray-200 text-black rounded-md p-1 cursor-pointer flex items-center justify-between gap-2"
                            >
                                <div className="flex items-center gap-4 text-xl font-semibold">
                                    <Image
                                        src={token.logoURI}
                                        alt={token.name}
                                        width={48}
                                        height={48}
                                    />
                                    {token.symbol}
                                </div>
                                <ChevronRightIcon className="w-5 fill-gray-300" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </dialog>
    );
};
