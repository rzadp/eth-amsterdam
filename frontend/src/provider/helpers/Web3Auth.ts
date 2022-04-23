import {useCallback, useEffect, useState} from "react";
import {Web3Auth, Web3AuthOptions} from "@web3auth/web3auth";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {WEB3AUTH_CLIENT_ID} from "../../consts";
import {useEthers} from "@usedapp/core";

export function initializeWeb3Auth() {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const {activate} = useEthers()

    useEffect(() => {
        (async () => {
            const web3AuthCtorParams: Web3AuthOptions = {
                clientId: WEB3AUTH_CLIENT_ID,
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId:  "0x2a",
                    rpcTarget: "https://kovan.infura.io/v3/007740c0a57f4c7199135b074abf0e07"
                },
            }

            const web3auth = new Web3Auth(web3AuthCtorParams);
            const openloginAdapter = new OpenloginAdapter({
                adapterSettings: {
                    clientId: WEB3AUTH_CLIENT_ID,
                    network: "testnet",
                    uxMode: "redirect",
                },
            });
            web3auth.configureAdapter(openloginAdapter);
            setWeb3auth(web3auth);
            await web3auth.initModal();
        })()
    }, [])

    const activateWallet = useCallback(async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }

        try {
            const provider = await web3auth.connect();
            await activate(provider as any);
        } catch (error) {
            console.log(error);
        }
    }, [activate, web3auth]);

    const deactivateWallet = useCallback(async () => {
        if (web3auth) {
            await web3auth.logout();
        }
    }, [web3auth])

    return {activateWallet, deactivateWallet}
}