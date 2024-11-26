"use client";

import * as React from "react";
import {
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {  WagmiProvider } from "wagmi";
import { wagmiConfig } from "../wagmi";

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
