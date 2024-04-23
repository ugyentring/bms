import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJSON/Smedia.json";
import { ethers } from "ethers";
import Post from "./components/Post";
// import Tip from "./components/Tip";

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
        const contractAddress = "0xE44b3760Aee176321347122BEe2dEDa17409B7B1";
        const contractABI = abi.abi;

        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("Account Changed", () => {
          window.location.reload();
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
    <>
      <div
        style={{ backgroundColor: "#cacfcc5f", height: "100%" }}
        className="big-div"
      >
        <button
          className="text-muted lead"
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          Connected account: {account}
        </button>
      </div>

      <div className="container">
        {state.contract ? (
          <>
            <h1 style={{ textAlign: "center" }}>Post</h1>
            <Post state={state} />
            {/* <Tip state={state} /> */}
          </>
        ) : (
          <p>Loading contract...</p>
        )}
      </div>
    </>
  );
}

export default App;
