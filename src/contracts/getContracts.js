import Web3 from "web3";
import VFTPoolABI from "./abis/VFTPool.json";
import ERC20ABI from "./abis/ERC20.json";
import factoryABI from "./abis/VFTFactory.json";
import { log } from "../utils/logs";
import { CONTRACT_ADDRESSES } from "../utils/constants";

let web3;

export const setWeb3Provider = (provider) => {
  web3 = new Web3(provider);
};

export const vftPoolContract = (contractAddress) => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(VFTPoolABI, contractAddress);
    }
    return contract;
  } catch (e) {
    log("contract", e);
  }
};

export const erc20 = (contractAddress) => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(ERC20ABI, contractAddress);
    }
    return contract;
  } catch (e) {
    log("contract", e);
  }
};

export const factoryContract = () => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(factoryABI, CONTRACT_ADDRESSES.factory);
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
  //

  try {
    // check if the chain to connect to is installed
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + parseInt(switchToChainDECIMAL).toString(16) }], // chainId must be in hexadecimal numbers
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.ethereum.request({
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
