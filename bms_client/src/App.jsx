import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJSON/Booklist.json";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("Not connected");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const template = async () => {
      if (window.ethereum === undefined) {
        alert("MetaMask is not installed. Please install it to continue");
        return;
      }

      try {
        const contractAddress = "0xf31d48A55a18756D18848602c5d96Af8d0563027";
        const contractABI = abi.abi;

        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        alert("An error occurred, please try again.");
      }
    };
    template();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Account: {account}</p>
      </header>
    </div>
  );
}

export default App;
