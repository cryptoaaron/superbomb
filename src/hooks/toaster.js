import { useEffect } from "react";
import { toast } from "react-toastify";
import { CHAIN_ID } from "../utils/constants";
import { useWeb3React } from "@web3-react/core";

export const useToaster = () => {
  const { account, chainId } = useWeb3React();

  const fireToast = (method) => {
    toast[method](
      `You are ${method === "error" ? "not" : ""} connected to BOMB Chain`,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: true,
      }
    );
  };

  useEffect(() => {
    if (account) {
      if (chainId !== CHAIN_ID) {
        return fireToast("error");
      }
      fireToast("success");
    }
  }, [chainId, account]);

  return {};
};
