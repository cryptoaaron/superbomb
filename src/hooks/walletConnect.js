import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { injected } from "../utils/connectors";
import { setWeb3Provider } from "../contracts/getContracts";
import { log } from "../utils/logs";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export const useActivateWallet = () => {
  const { activate, library, account } = useWeb3React();

  useEffect(() => {
    if (library) {
      setWeb3Provider(library._provider);
    }
  }, [library, account]);

  return async (connector, onClose = () => {}) => {
    try {
      if (connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined;
      }
      await activate(connector ? connector : injected, undefined, true);
      onClose();
    } catch (e) {
      log(e);
    }
  };
};
