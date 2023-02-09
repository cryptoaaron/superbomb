import { UINT256_MAX } from "../../utils/constants";
import { toEther } from "../../utils/helpers";
import { erc20 } from "../getContracts";

import {
  transactionFailed,
  transactionRejected,
  transactionSuccess,
} from "../../hooks/swal2";
import { getWeb3 } from "../getContracts";
import { log } from "../../utils/logs";

export const balanceOf = async (contractAddress, account) => {
  try {
    let contract = erc20(contractAddress);
    return parseFloat(
      toEther(await contract?.methods.balanceOf(account).call())
    ).toFixed(2);
  } catch (e) {
    log("balanceOf", e);
    return "0";
  }
};

export const symbol = async (contractAddress) => {
  try {
    let contract = erc20(contractAddress);
    return await contract?.methods.symbol().call();
  } catch (e) {
    log("symbol", e);
    return "";
  }
};

export const allowance = async (contractAddress, account, spender) => {
  try {
    let contract = erc20(contractAddress);
    return (
      parseInt(await contract?.methods.allowance(account, spender).call()) >=
      parseInt(UINT256_MAX)
    );
  } catch (e) {
    log("allowance", e);
    return false;
  }
};

export const approve = async (
  contractAddress,
  spender,
  account,
  cb = () => {}
) => {
  try {
    let txHash;
    let contract = erc20(contractAddress);
    await contract?.methods
      .approve(spender, UINT256_MAX)
      .send({
        from: account,
      })
      .on("transactionHash", (hash) => {
        txHash = hash;
      })
      .then((receipt) => {
        transactionSuccess();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected();
        } else if (e?.message?.includes("not mined within 50 blocks")) {
          const web3 = getWeb3();
          if (web3) {
            const handle = setInterval(() => {
              web3.eth.getTransactionReceipt(txHash).then((res) => {
                if (res != null && res.blockNumber > 0) {
                  clearInterval(handle);
                  if (res.status) {
                    transactionSuccess();
                  } else {
                    transactionFailed();
                  }
                }
              });
            });
          }
        } else {
          transactionFailed();
        }
      });
    cb();
  } catch (e) {
    log("approve", e);
  }
};
