import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";

export const safeLocalStorageGetItem = (name) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(name);
  }
};

export const safeLocalStorageSetItem = (name, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(name, value);
  }
};

export const useCustomWeb3React = () => {
  const {
    account: oAccount,
    chainId: oChainId,
    activate: oActivate,
    deactivate: oDeactivate,
    connector,
    library,
    active,
  } = useWeb3React();

  const status = safeLocalStorageGetItem("status");
  const account = status == "connected" && oAccount ? oAccount : undefined;
  const chainId = status == "connected" && oChainId ? oChainId : undefined;

  const deactivate = () => {
    safeLocalStorageSetItem("status", "disconnected");
    oDeactivate();
  };

  const activate = async (
    connector,
    errorCallBack = () => {},
    errorThrow = false
  ) => {
    safeLocalStorageSetItem("status", "connected");
    await oActivate(connector, errorCallBack, errorThrow);
  };

  return {
    account,
    chainId,
    connector,
    library,
    status,
    activate,
    deactivate,
    active,
  };
};
