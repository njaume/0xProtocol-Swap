import { connectorsForWallets, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
//import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export const wagmiConfig = getDefaultConfig({
  
  appName: '0xGassless App',
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base
  ],
  ssr: true,
});