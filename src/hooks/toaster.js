import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getErrorMessage } from "../utils/functions";
import { CHAIN_ID } from "../utils/constants";
import { useWeb3React } from "@web3-react/core";

export const useToaster = () => {
  const { account, chainId } = useWeb3React();

  const fireToast = (method) => {
    toast[method](
      `You are ${method === "error" ? "not" : ""} connected to BSC Network`,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: true,
      }
    );
  };

  const walletConnectedMessage = (e) => {
    if (e)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(e),
      });
    else
      Swal.fire(
        "Congratulations!",
        "Your wallet has been connected.",
        "success"
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

  useEffect(() => {
    if (typeof window !== "undefined" && !window?.ethereum) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please install an BSC-compatible browser or extension like MetaMask to use this dApp!",
      });
    }
  }, []);

  return {
    account,
    chainId,
    walletConnectedMessage,
  };
};
