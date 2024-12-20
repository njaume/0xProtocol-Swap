"use client";

import * as React from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider0x } from "./hooks/use0x";

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Provider0x>{children}</Provider0x>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
