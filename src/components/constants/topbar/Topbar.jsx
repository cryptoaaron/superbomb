import React from "react";
import "./Topbar.css";
import logo from "./img/logo.png";
import "./Responsive.css";
import { useActivateWallet } from "../../../hooks/walletConnect";
import { injected } from "../../../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { trunc } from "../../../utils/helpers";
import { CHAIN_ID } from "../../../utils/constants";
import { switchNetwork } from "../../../contracts/getContracts";
import { BOMB_CHAIN } from "../../../utils/chainInfo";
import { log } from "../../../utils/logs";

const Topbar = () => {
  const { account, chainId } = useWeb3React();
  const connect = useActivateWallet();
  const connectMetamask = () => {
    connect(injected);
  };

  const changeNetwork = () => {
    if (chainId && account && CHAIN_ID !== chainId) {
      switchNetwork(BOMB_CHAIN, account, CHAIN_ID);
    }
  };

  const switchORaccount =
    account && chainId && CHAIN_ID !== chainId
      ? "Switch Network"
      : trunc(account, 4, 4);
  const text =
    account && chainId && CHAIN_ID !== chainId
      ? switchORaccount
      : "Connect Wallet";

  const func =
    account && chainId && CHAIN_ID !== chainId
      ? changeNetwork
      : connectMetamask;

  log("test", text, account && chainId && CHAIN_ID !== chainId && "test");

  console.log("vals", account, chainId, CHAIN_ID, chainId);

  return (
    <div className="topbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Superbomb
          </a>
          <div className="ms-auto mobile-nav">
            <button
              type="button"
              className="btn btn-lg btn-connect mx-3"
              onClick={func}
            >
              {text}
            </button>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.bombswap.xyz/swap">
                  Swap
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://docs.sbomb.com/">
                  Docs
                </a>
              </li>
            </ul>
            <a className="logo" href="/">
              <img src={logo} alt="" />
            </a>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  sBOMB
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  $0.12
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-lg btn-connect btn-connect-mob ms-2"
              onClick={func}
            >
              {text}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
