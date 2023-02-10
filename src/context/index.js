import { useWeb3React } from "@web3-react/core";
import { createContext, useEffect, useState } from "react";
import { fetchSBombData } from "../contracts/functions/pool";

export const dashboardContext = createContext("dashboard");

export const DashboardProvider = ({ children }) => {
  const { account, chainId } = useWeb3React();
  const [data, setData] = useState({
    tokenPrice: 0,
    balance: 0,
    balanceInUSD: 0,
    supply: 0,
    marketCap: 0,
    bombFire: 0,
    bombFireInUSD: 0,
    percentBombFire: 0,
    nextRebase: 0,
    holders: 0,
  });
  const getData = async () => {
    const data = await fetchSBombData(account);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, [account, chainId]);
  return (
    <dashboardContext.Provider value={data}>
      {children}
    </dashboardContext.Provider>
  );
};
