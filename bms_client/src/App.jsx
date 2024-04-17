import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJSON/Booklist.json";
import { ethers } from "ethers";
import AddBook from "./components/AddBook";
import AddedList from "./components/AddedList";
import banner from "./banner.jpg";

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
        const contractAddress = "0x712FA1d07e9c9827e8C941648963Ff957D7Ca687";
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
        <img src={banner} className="img-fluid" alt="image" width="100%" />
        <p
          className="text-muted lead"
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          Connected account: {account}
        </p>
      </div>

      <div className="container">
        {state.contract ? (
          <>
            <AddBook state={state} />
            <AddedList state={state} />
          </>
        ) : (
          <p>Loading contract...</p>
        )}
      </div>
    </>
  );
}

export default App;
