import millify from "millify";
import React, { useContext } from "react";
import { dashboardContext } from "../../../context";

import "./Dashboard.css";
import "./Responsive.css";

const Dashboard = () => {
  const {
    balance,
    balanceInUSD,
    bombFire,
    bombFireInUSD,
    marketCap,
    nextRebase,
    percentBombFire,
    supply,
    tokenPrice,
    holders,
  } = useContext(dashboardContext);

  return (
    <div className="conatiner dashboard">
      <h1 className="title">Dashboard</h1>
      <div className="section-one">
        <div>
          <p className="sub-title">${millify(marketCap)}</p>
          <p className="small-text">Market Cap</p>
        </div>
        <div>
          <p className="sub-title">{millify(supply)}</p>
          <p className="small-text">Circulating Supply</p>
        </div>
        <div>
          <p className="sub-title">{millify(holders)}</p>
          <p className="small-text">sBOMB Holders</p>
        </div>
        <div>
          <p className="sub-title">${tokenPrice}</p>
          <p className="small-text">sBOMB Price</p>
        </div>
      </div>
      <div className="section-one">
        <div>
          <p className="sub-title sub-title-r">Your Balance</p>
        </div>
        <div>
          <p className="sub-title">${millify(balanceInUSD)}</p>
          <p className="small-text">{millify(balance)} sBOMB</p>
        </div>
      </div>
      <div className="section-one">
        <div>
          <p className="small-text-three">
            Next Rebase in: <br />
            APY: <br />
            {/* Daily ROI: <br /> */}
            # Value of Bombfire: <br />
            $ Value of Bombfire: <br />% Bombfire : Supply:
          </p>
        </div>
        <div>
          <p className="small-text-three text-end">
            {nextRebase} <br />
            382,945.41% <br />
            {/* 0.08% <br /> */}
            {millify(bombFire)} <br />${millify(bombFireInUSD)} <br />
            {percentBombFire}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
