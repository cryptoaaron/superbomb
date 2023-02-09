import Swal from "sweetalert2";
import { getErrorMessage } from "../utils/functions";
import { CHAIN_ID } from "../utils/constants";

export const walletConnectedMessage = (e) => {
  if (e)
    Swal.fire({
      icon: "error",
      title: "Aw, Snap!",
      text: getErrorMessage(e),
    });
  else {
    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Your wallet has been connected.",
      AllowOutsideClick: false,
      didClose: () => {
        // setRecoil(closeSWALAtom, true);
      },
    });
  }
};

export const transactionMessage = (e) => {
  if (e)
    Swal.fire({
      icon: "error",
      title: "Aw, Snap!",
      text: getErrorMessage(e),
    });
};

export const transactionRejected = () => {
  Swal.fire("Aw, Snap!", "Transaction Rejected", "error");
};

export const transactionFailed = () => {
  Swal.fire({
    icon: "error",
    title: "Aw, Snap!",
    text: "Your Transaction Has Failed!",
  });
};

export const transactionSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Congratulations!",
    text: "Transaction is Successful",
  });
};

export const switchMessage = (chainId) => {
  if (CHAIN_ID !== chainId) {
    Swal.fire({
      icon: "error",
      title: "Unsupported Network",
      text: `Please switch to Ethereum mainnet to Mint Crypto Bear.`,
    });
    return true;
  }
  return false;
};
