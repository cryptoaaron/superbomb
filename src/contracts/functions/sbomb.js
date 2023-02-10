import { log } from "../../utils/logs";
import { sbomb } from "../getContracts";

export const balanceOf = async (account) => {
  try {
    let contract = sbomb();
    const balance = await contract?.methods.balanceOf(account).call();
    return Number(balance) / 1e5;
  } catch (e) {
    log("balanceOf", e);
    return 0;
  }
};

export const totalSupply = async () => {
  try {
    let contract = sbomb();
    const totalSupply = await contract?.methods.totalSupply().call();
    return Number(totalSupply) / 1e5;
  } catch (e) {
    log("totalSupply", e);
    return 0;
  }
};

export const _lastRebasedTime = async () => {
  try {
    let contract = sbomb();
    const lastRebasedTime = await contract?.methods._lastRebasedTime().call();
    return Number(lastRebasedTime);
  } catch (e) {
    log("_lastRebasedTime ", e);
    return 0;
  }
};
