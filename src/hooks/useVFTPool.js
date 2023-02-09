import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { balanceOf } from "../contracts/functions/erc20";
import {
  autoPoolAmount,
  calculateEarnings,
  getTier,
  isAutoEnabled,
  poolMaxParticipants,
  rewardPool,
  rewardTokenTicker,
  roi,
  stakeFee,
  stakes,
  stakeToken,
  stakeTokenTicker,
  totalRewardClaimed,
  totalStaked,
  unstakeFee,
} from "../contracts/functions/vftPool";
import { log } from "../utils/logs";
import { useParams } from "./useParams";

export const useVFTPool = () => {
  const { chainId, account } = useWeb3React();
  const { pool } = useParams();
  const [random, setRandom] = useState(1);

  const reFetch = () => setRandom(Math.random());

  const [state, setState] = useState({
    _stakeTokenTicker: "",
    _rewardTokenTicker: "",
    _totalStaked: "0",
    _totalRewardClaimed: "0",
    _poolMaxParticipants: "0",
    _roi: "0",
    _autoPoolAmount: "0",
    _stakeFee: "0",
    _minimumStakeValue: "0",
    _rewardPool: "0",
    _getTier: "0",
    _stakes: "0",
    _balance: "0",
    _calculateEarnings: "0",
    _unstakeFee: "0",
    _isAutoEnabled: false,
    _stakeToken: undefined,
  });

  log("state:", state);

  const handlerDataWithoutAccount = async () => {
    if (pool) {
      const [
        _stakeTokenTicker,
        _rewardTokenTicker,
        _totalStaked,
        _totalRewardClaimed,
        _poolMaxParticipants,
        _roi,
        _autoPoolAmount,
        _stakeFee,
        _rewardPool,
        _unstakeFee,
        _stakeToken,
      ] = await Promise.all([
        stakeTokenTicker(pool),
        rewardTokenTicker(pool),
        totalStaked(pool),
        totalRewardClaimed(pool),
        poolMaxParticipants(pool),
        roi(pool),
        autoPoolAmount(pool),
        stakeFee(pool),
        rewardPool(pool),
        unstakeFee(pool),
        stakeToken(pool),
      ]);

      setState((prevState) => ({
        ...prevState,
        _stakeTokenTicker,
        _rewardTokenTicker,
        _totalStaked,
        _totalRewardClaimed,
        _poolMaxParticipants,
        _roi,
        _autoPoolAmount,
        _stakeFee,
        _rewardPool,
        _unstakeFee,
        _stakeToken,
      }));
    }
  };

  const handlerDataWithAccount = async () => {
    if (account && pool) {
      const [_getTier, _stakes, _calculateEarnings, _isAutoEnabled] =
        await Promise.all([
          getTier(pool, account),
          stakes(pool, account),
          // balanceOf(pool, account),
          calculateEarnings(pool, account),
          isAutoEnabled(pool, account),
        ]);
      setState((prevState) => ({
        ...prevState,
        _getTier,
        _stakes,
        // _balance,
        _calculateEarnings,
        _isAutoEnabled,
      }));
    }
  };

  const handlerDataWithAccountAndStakeToken = async () => {
    if (account && pool && state._stakeToken) {
      const [_balance] = await Promise.all([
        balanceOf(state._stakeToken, account),
      ]);
      setState((prevState) => ({
        ...prevState,
        _balance,
      }));
    }
  };

  useEffect(() => {
    handlerDataWithoutAccount();
  }, [chainId, random, pool]);

  useEffect(() => {
    handlerDataWithAccount();
  }, [account, random, chainId, pool]);

  useEffect(() => {
    handlerDataWithAccountAndStakeToken();
  }, [account, random, chainId, pool, state._stakeToken]);

  return {
    ...state,
    reFetch,
  };
};
