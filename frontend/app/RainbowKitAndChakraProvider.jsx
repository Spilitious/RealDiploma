'use client';
import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css';

import {   getDefaultConfig,  RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {  hardhat, sepolia } from 'wagmi/chains';
import {  QueryClientProvider,  QueryClient } from "@tanstack/react-query";


const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '60e5e2dc8e5849ea101975d59b6c98f3',
    chains: [hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowKitAndChakraProvider