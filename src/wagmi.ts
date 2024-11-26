import { connectorsForWallets, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export const wagmiConfig = getDefaultConfig({
  
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});