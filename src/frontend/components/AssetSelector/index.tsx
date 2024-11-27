import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { AssetFilters, TOKEN_FILTER } from "./Filters";
import { SearchInput } from "../shared/SearchInput";
import { Modal } from "../shared/Modal";
import { MAINNET_TOKENS } from "../../../shared/constants";
export const AssetSelector = ({
    value,
    onChange,
}: {
    value?: string;
    onChange?: (value: string) => void;
}) => {
    //const [token, setToken] = useState(value || MAINNET_TOKENS[0].symbol);
    const [tokenFilter, setTokenFilter] = useState<string>(TOKEN_FILTER[0]);
    const [searchTerm, setSearchTerm] = useState("");
        const handleFiltersChange = (filter: string) => {
        setTokenFilter(filter);
    };

    const filteredTokens = useMemo(() => {
        switch (tokenFilter) {
            case TOKEN_FILTER[0]:
                return MAINNET_TOKENS;

            case TOKEN_FILTER[1]:
                return MAINNET_TOKENS;

            case TOKEN_FILTER[2]:
                return MAINNET_TOKENS.filter((token) => token.isStable);
            default:
                return MAINNET_TOKENS;
        }
    }, [tokenFilter]);

    const searchTokens = useMemo(() => {
        return filteredTokens?.filter((token) => {
            return !!searchTerm
                ? token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                : filteredTokens;
        });
    }, [filteredTokens, searchTerm]);

    return (
        <Modal modalId="my_modal_1">
            <h2 className="text-2xl text-black">
                Selected Token: <span className="font-bold">{value}</span>
            </h2>
            <SearchInput onChange={(value) => setSearchTerm(value)} />
            <AssetFilters onChange={handleFiltersChange} value={tokenFilter} />
            <div className="mt-4 min-h-80 max-h-80 overflow-y-scroll">
                {searchTokens.map((token) => {
                    return (
                        <div
                            onClick={() => onChange?.(token.symbol)}
                            key={token.address}
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
        </Modal>
    );
};
