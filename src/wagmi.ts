import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  polygon,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export const wagmiConfig = getDefaultConfig({
  
  appName: '0xGassless App',
  projectId: projectId,
  chains: [
    polygon
  ],
  ssr: true,
});