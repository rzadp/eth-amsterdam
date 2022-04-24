import React from 'react'
import {createContext, ReactNode, useCallback, useContext} from "react";
import {useEthers} from "@usedapp/core";
import {initializeWeb3Auth} from "./helpers/Web3Auth";
import {initializeWalletConnect} from "./helpers/WalletConnect";
import {initializeWalletLink} from "./helpers/WalletLink";

interface WalletProviderProps {
    children: ReactNode;
}

const WalletsContext = createContext<{
    activateBrowserWallet: () => void;
    activateWalletConnect: () => Promise<void>;
    activateWalletLink: () => Promise<void>;
    activateWeb3AuthWallet: () => Promise<void>;
    deactivateWallet: () => Promise<void>;
}>({
    activateBrowserWallet: async () => {},
    activateWalletConnect: async () => {},
    activateWalletLink: async () => {},
    activateWeb3AuthWallet: async () => {},
    deactivateWallet: async () => {},
});

export const WalletsProvider = ({ children }: WalletProviderProps) => {
    const { activateBrowserWallet, deactivate: deactivateBrowserWallet } = useEthers();

    const walletConnect = initializeWalletConnect()
    const walletLink = initializeWalletLink()
    const web3AuthWallet = initializeWeb3Auth()

    const deactivateWallet = useCallback(async () => {
        walletConnect.deactivateWallet()
        walletLink.deactivateWallet()
        deactivateBrowserWallet();
        await web3AuthWallet.deactivateWallet()
    }, [deactivateBrowserWallet, web3AuthWallet]);

    return (
        <WalletsContext.Provider
            value={{
                activateBrowserWallet,
                activateWalletConnect: walletConnect.activateWallet,
                activateWalletLink: walletLink.activateWallet,
                activateWeb3AuthWallet: web3AuthWallet.activateWallet,
                deactivateWallet,
            }}
        >
            {children}
        </WalletsContext.Provider>
    );
}

export const useWallets = () => useContext(WalletsContext);