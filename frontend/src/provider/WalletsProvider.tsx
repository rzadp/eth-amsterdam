import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {useEthers} from "@usedapp/core";
import {initializeWeb3Auth} from "./helpers/Web3Auth";
import {initializeWalletConnect} from "./helpers/WalletConnect";

interface WalletProviderProps {
    children: ReactNode;
}

const WalletsContext = createContext<{
    activateBrowserWallet: () => void;
    activateWalletConnect: () => Promise<void>;
    activateWeb3AuthWallet: () => Promise<void>;
    deactivateWallet: () => Promise<void>;
}>({
    activateBrowserWallet: async () => {},
    activateWalletConnect: async () => {},
    activateWeb3AuthWallet: async () => {},
    deactivateWallet: async () => {},
});

export const WalletsProvider = ({ children }: WalletProviderProps) => {
    const { activateBrowserWallet, deactivate: deactivateBrowserWallet } = useEthers();

    const walletConnect = initializeWalletConnect()
    const web3AuthWallet = initializeWeb3Auth()

    const deactivateWallet = useCallback(async () => {
        deactivateBrowserWallet();
        walletConnect.deactivateWallet()
        await web3AuthWallet.deactivateWallet()
    }, [deactivateBrowserWallet, web3AuthWallet]);

    return (
        <WalletsContext.Provider
            value={{
                activateBrowserWallet,
                activateWalletConnect: walletConnect.activateWallet,
                activateWeb3AuthWallet: web3AuthWallet.activateWallet,
                deactivateWallet,
            }}
        >
            {children}
        </WalletsContext.Provider>
    );
}

export const useWallets = () => useContext(WalletsContext);