import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJSON/Booklist.json";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      //error handling with the users without metamask
      if (window.ethereum === undefined) {
        alert("Metmask is not installed. Please install it to continue");
        return;
      }

      const contractAddress = "0xf31d48A55a18756D18848602c5d96Af8d0563027";
      const contractABI = abi.abi;

      const { ethereum } = window;
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log(contract);
      setState({ provider, signer, contract });
    };
    template();
  }, []);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  return <div></div>;
}

export default App;
