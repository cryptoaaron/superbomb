import Topbar from "./components/constants/topbar/Topbar";
import "./Style.css";
import Footer from "./components/constants/footer/Footer";
import Wrapper from "./components/constants/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useEagerConnect } from "./hooks/walletConnect";
import { setWeb3Provider } from "./contracts/getContracts";
import { RPC_URL } from "./utils/constants";
import Web3 from "web3";
import { log } from "./utils/logs";

function App() {
  const [loading, setLoading] = useState(true);
  const _ = useEagerConnect();

  const init = async () => {
    try {
      if (window?.ethereum) {
        const web3 = new Web3(window?.ethereum);
        if (!(await web3.eth.getAccounts()).length) {
          setWeb3Provider(RPC_URL);
          log("ethereum", window?.ethereum);
        } else {
          setWeb3Provider(window?.ethereum);
        }
      } else {
        setWeb3Provider(RPC_URL);
      }
    } catch (e) {
      setWeb3Provider(RPC_URL);
      log("Connect Web3", e);
    }
  };

  useEffect(() => {
    init().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div id="wrapper">
        <Topbar></Topbar>
        <Wrapper></Wrapper>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
