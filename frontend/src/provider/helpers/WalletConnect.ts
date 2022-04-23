import {ChainId, useEthers} from "@usedapp/core";
import {useCallback} from "react";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

export function initializeWalletConnect() {
    const {activate, deactivate} = useEthers()

    const activateWallet = useCallback(async () => {
        try {
            const connector = new WalletConnectConnector({
                rpc: {
                    [ChainId.Kovan]: "https://kovan.infura.io/v3/007740c0a57f4c7199135b074abf0e07"
                },
                bridge: "https://bridge.walletconnect.org",
                qrcode: true,
            })
            await activate(connector);
        } catch (error) {
            console.log(error);
        }
    }, [activate]);

    const deactivateWallet = useCallback(() => {
        deactivate();
    }, [deactivate]);

    return {activateWallet, deactivateWallet}
}