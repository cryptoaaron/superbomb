import { CONTRACT_ADDRESSES } from "../../utils/constants";
import { log } from "../../utils/logs";
import { pool } from "../getContracts";
import { balanceOf, totalSupply, _lastRebasedTime } from "./sbomb";

export const getReserves = async () => {
  try {
    let contract = pool();
    const result = await contract?.methods.getReserves().call();

    return {
      reserve0: result ? result?._reserve0 : "0",
      reserve1: result ? result?._reserve1 : "0",
    };
  } catch (e) {
    log("getReserves", e);
    return {
      reserve0: "0",
      reserve1: "0",
    };
  }
};

export const fetchPrices = async () => {
  try {
    const res = await fetch("https://api.bomb.farm/prices");
    const resJSON = await res.json();
    if (resJSON) {
      return resJSON["BOMB"];
    }
    return 0;
  } catch (e) {
    log("fetchPrices", e);
    return 0;
  }
};

export const fetchHolders = async () => {
  try {
    const res = await fetch(
      `https://bombscan.com/api?module=token&action=getTokenHolders&contractaddress=${CONTRACT_ADDRESSES.sbomb}`
    );
    const resJSON = await res.json();
    if (resJSON && resJSON?.message == "OK") {
      return resJSON?.result.length;
    }
    return 0;
  } catch (e) {
    log("fetchHolders", e);
    return 0;
  }
};

export const fetchSBombData = async (account) => {
  const reserves = await getReserves();
  const price = await fetchPrices();
  const holders = await fetchHolders();

  const r0 = Number(reserves?.reserve0) / 1e5;
  const r1 = Number(reserves?.reserve1) / 1e18;

  const tokenPrice = (r1 / r0) * price;

  const bombFire = await balanceOf(
    "0x000000000000000000000000000000000000dead"
  );
  const bombFireInUSD = bombFire * tokenPrice;

  let balance = 0;

  if (account) {
    balance = await balanceOf(account);
  }

  const supply = await totalSupply();

  const percentBombFire = ((bombFire / supply) * 100).toFixed(2);

  const lastRebasedTime = await _lastRebasedTime();

  const time = parseInt(Date.now() / 1000);
  let _15min = 60 * 15 - (time - Number(lastRebasedTime));

  _15min = _15min < 0 ? 0 : _15min;

  let min = (~~(_15min / 60)).toString();
  let sec = (_15min % 60).toString();

  min = min.length == 1 ? "0" + min : min;
  sec = sec.length == 1 ? "0" + sec : sec;

  return {
    tokenPrice: tokenPrice.toFixed(4),
    balance,
    balanceInUSD: balance * tokenPrice,
    supply,
    marketCap: supply * tokenPrice,
    bombFire,
    bombFireInUSD,
    percentBombFire,
    nextRebase: `${min}:${sec}`,
    holders,
  };
};
