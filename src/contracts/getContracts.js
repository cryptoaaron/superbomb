import Web3 from "web3";
import poolABI from "./abis/Pool.json";
import sbombABI from "./abis/SBOMB.json";
import { log } from "../utils/logs";
import { CONTRACT_ADDRESSES } from "../utils/constants";

let web3;

export const setWeb3Provider = (provider) => {
  web3 = new Web3(provider);
};

export const pool = () => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(poolABI, CONTRACT_ADDRESSES.pool);
    }
    return contract;
  } catch (e) {
    log("contract", e);
  }
};

export const sbomb = () => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(sbombABI, CONTRACT_ADDRESSES.sbomb);
    }
    return contract;
  } catch (e) {
    log("contract", e);
  }
};

export const getBalance = async (account) => {
  try {
    if (web3) {
      return await web3.eth.getBalance(account);
    }
  } catch (e) {
    log("balance", e);
  }
};

export const getWeb3 = () => web3;

export const switchNetwork = async (
  chainInfo,
  account,
  switchToChainDECIMAL = "1"
) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + parseInt(switchToChainDECIMAL).toString(16) }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [chainInfo, account],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
  }

  if (web3) {
    try {
      await web3.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [chainInfo, account],
      });
    } catch (addError) {
      console.error(addError);
    }
  }
};
