import { useEffect, useState } from "react";
import "./App.css";
import ABI from "./contractJson/Lottery.json";

import Header from "./components/Header.jsx";
import Content from "./components/Content";
import Footer from "./components/Footer";

const ethers = require("ethers");

function App() {
  const { ethereum } = window;

  const [contractState, setContractState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [refreshContent, setRefreshContent] = useState(false);


  const handleRefreshContent = () => {
    setRefreshContent((prev) => !prev);
  };


  useEffect(() => {
    const temp = async () => {
      const contractAddress = "0x45E3c2b5CeaEaE8b638F559fab419602884D3E02";
      const abi = ABI.abi;

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      setContractState({
        provider: provider,
        signer: signer,
        contract: contract,
      });
    };
    temp();
  }, [ethereum]);

  return (
    <div className="App">
      <Header state = {contractState} onRefreshContent={handleRefreshContent}></Header>
      <Content state={contractState}></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
