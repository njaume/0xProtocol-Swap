"use client"
import { createWalletClient, createPublicClient, custom, http, publicActions } from 'viem'
import { polygon } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: polygon,
  transport: http()
})
 
export const walletClient = createWalletClient({
  chain: polygon, 
  transport: custom(window?.ethereum)
}).extend(publicActions); // extend wallet client with publicActions for public client