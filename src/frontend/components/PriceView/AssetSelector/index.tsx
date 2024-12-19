"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { AssetFilters, TOKEN_FILTER } from "./Filters";
import { SearchInput } from "../../shared/SearchInput";
import { Modal } from "../../shared/Modal";
import { TokensService } from "../../../services/tokensService";
import { Token } from "../../../../shared/types";
export const AssetSelector = ({
    value,
    onChange,
    chainId,
}: {
    value?: string;
    onChange?: (value: Token) => void;
    chainId?: number;
}) => {
    const [tokenFilter, setTokenFilter] = useState<string>(TOKEN_FILTER[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleFiltersChange = (filter: string) => {
        setTokenFilter(filter);
    };

    const chainTokens = useMemo(() => {
        return TokensService.getTokensArrayByChain(chainId!) || [];
    }, [chainId]);

    const filteredTokens = useMemo(() => {
        switch (tokenFilter) {
            case TOKEN_FILTER[0]:
                return chainTokens;

            case TOKEN_FILTER[1]:
                return chainTokens;

            case TOKEN_FILTER[2]:
                return chainTokens?.filter((token) => token.isStable);
            default:
                return chainTokens;
        }
    }, [tokenFilter, chainId]);

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

            <div className="mt-8">
                <SearchInput onChange={(value) => setSearchTerm(value)} />
            </div>
            <AssetFilters onChange={handleFiltersChange} value={tokenFilter} />
            <div className="mt-11 min-h-80 max-h-80 overflow-y-scroll">
                {searchTokens.map((token) => {
                    return (
                        <div
                            onClick={() => onChange?.(token)}
                            key={token.address}
                            className="group w-full bg-white text-black rounded-md p-1 cursor-pointer flex items-center justify-between gap-2"
                        >
                            <div className="flex items-center gap-4 text-xl font-semibold">
                                {token.logoURI ? (
                                    <Image
                                        src={token.logoURI}
                                        alt={token.name}
                                        width={48}
                                        height={48}
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-light rounded-full" />
                                )}
                                {token.symbol}
                            </div>
                            <ChevronRightIcon className="w-5 fill-[#E4E4E7] group-hover:fill-gray-dark" />
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
};
