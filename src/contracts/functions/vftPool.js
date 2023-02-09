import { ZERO_ADDRESS } from "../../utils/constants";
import { parseToEther, toWei } from "../../utils/helpers";
import { log } from "../../utils/logs";
import { sendTx } from "../../utils/sendTx";
import { vftPoolContract } from "../getContracts";

// ================================================  read functions contract ========== without account

export const stakeTokenTicker = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.stakeTokenTicker().call();
  } catch (e) {
    log("stakeTokenTicker", e);
    return "";
  }
};

export const rewardTokenTicker = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.rewardTokenTicker().call();
  } catch (e) {
    log("rewardTokenTicker", e);
    return "";
  }
};

export const totalStaked = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(await contract?.methods.totalStaked().call());
  } catch (e) {
    log("totalStaked", e);
    return "0";
  }
};

export const totalRewardClaimed = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(await contract?.methods.totalRewardClaimed().call());
  } catch (e) {
    log("totalRewardClaimed", e);
    return "0";
  }
};

export const poolMaxParticipants = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.poolMaxParticipants().call();
  } catch (e) {
    log("poolMaxParticipants", e);
    return "0";
  }
};

export const roi = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.roi().call();
  } catch (e) {
    log("roi", e);
    return "0";
  }
};

export const autoPoolAmount = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(await contract?.methods.autoPoolAmount().call());
  } catch (e) {
    log("autoPoolAmount", e);
    return "0";
  }
};

export const stakeFee = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.stakeFee().call();
  } catch (e) {
    log("stakeFee", e);
    return "0";
  }
};

export const minimumStakeValue = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.minimumStakeValue().call();
  } catch (e) {
    log("minimumStakeValue", e);
    return "0";
  }
};

export const rewardPool = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(await contract?.methods.rewardPool().call());
  } catch (e) {
    log("rewardPool", e);
    return "0";
  }
};

export const unstakeFee = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.unstakeFee().call();
  } catch (e) {
    log("unstakeFee", e);
    return "0";
  }
};

export const stakeToken = async (contractAddress) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.stakeToken().call();
  } catch (e) {
    log("stakeToken", e);
  }
};

// =========================================================================== read with account

export const getTier = async (contractAddress, account) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.getTier(account).call();
  } catch (e) {
    log("getTier", e);
    return "0";
  }
};

export const stakes = async (contractAddress, account) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(await contract?.methods.stakes(account).call());
  } catch (e) {
    log("stakes", e);
    return "0";
  }
};

export const calculateEarnings = async (contractAddress, account) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return parseToEther(
      await contract?.methods.calculateEarnings(account).call()
    );
  } catch (e) {
    log("calculateEarnings", e);
    return "0";
  }
};

export const isAutoEnabled = async (contractAddress, account) => {
  try {
    let contract = vftPoolContract(contractAddress);
    return await contract?.methods.isAutoEnabled(account).call();
  } catch (e) {
    log("isAutoEnabled", e);
    return false;
  }
};

// =========================================================================== write

export const autodistribute = async (
  contractAddress,
  account,
  cb = () => {}
) => {
  try {
    let contract = vftPoolContract(contractAddress);
    await sendTx(account, contract?.methods.autodistribute(), cb);
  } catch (e) {
    log("autodistribute", e);
  }
};

export const enableAutoDistribution = async (
  contractAddress,
  account,
  cb = () => {}
) => {
  try {
    let contract = vftPoolContract(contractAddress);
    await sendTx(account, contract?.methods.enableAutoDistribution(), cb);
  } catch (e) {
    log("enableAutoDistribution", e);
  }
};

export const stake = async (
  contractAddress,
  amount,
  referrer,
  account,
  cb = () => {}
) => {
  try {
    let contract = vftPoolContract(contractAddress);
    await sendTx(
      account,
      contract?.methods.stake(
        toWei(amount),
        referrer ? referrer : ZERO_ADDRESS
      ),
      cb
    );
  } catch (e) {
    log("stake", e);
  }
};

export const unstake = async (
  contractAddress,
  amount,
  account,
  cb = () => {}
) => {
  try {
    let contract = vftPoolContract(contractAddress);
    await sendTx(account, contract?.methods.unstake(toWei(amount)), cb);
  } catch (e) {
    log("unstake", e);
  }
};

export const withdrawEarnings = async (
  contractAddress,
  account,
  cb = () => {}
) => {
  try {
    let contract = vftPoolContract(contractAddress);
    await sendTx(account, contract?.methods.withdrawEarnings(), cb);
  } catch (e) {
    log("withdrawEarnings", e);
  }
};
