import {useEthers} from "@usedapp/core";
import {useCallback} from "react";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";

const removeWalletLinkStorage = () => {
    Object.entries(localStorage)
        .map((entry) => entry[0])
        .filter((entry) => entry.substring(0, 11) === "-walletlink")
        .forEach((entry) => localStorage.removeItem(entry));
};

export function initializeWalletLink() {
    const {activate, deactivate} = useEthers()

    const activateWallet = useCallback(async () => {
        try {
            const connector = new WalletLinkConnector({
                url: "https://kovan.infura.io/v3/007740c0a57f4c7199135b074abf0e07",
                appName: "Web3-react Demo",
                supportedChainIds: [1, 3, 4, 5, 42],
            })
            await activate(connector);
        } catch (error) {
            console.log(error);
        }
    }, [activate]);

    const deactivateWallet = useCallback(() => {
        removeWalletLinkStorage();
    }, [deactivate]);

    return {activateWallet, deactivateWallet}
}