import { useState, useEffect } from "react";
import abi from "./contractJSON/Smedia.json";
import { ethers } from "ethers";
import Post from "./components/Post";
import GetPost from "./components/GetPost";
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
      <nav>
        <div className="bg-green-700 flex justify-between items-center h-24 px-4">
          <h1 className="font-bold text-white text-3xl">NorbNode</h1>
          <button className="py-3 px-4 bg-black text-white font-bold rounded-md">
            {account.length > 8 ? `${account.slice(0, 8)}...` : account}
          </button>
        </div>
      </nav>

      <main>
        <div className="flex flex-row mt-1">
          {/* leftside code here */}
          <div
            style={{ width: "20%", height: "90vh" }}
            className="bg-gray-600 mx-1 rounded-md shadow-lg"
          >
            sidebar
          </div>
          {state.contract ? (
            <>
              {/* middle side code here */}
              <div
                style={{ width: "60%", minHeight: "100vh", overflowY: "auto" }}
                className="rounded-md mx-2"
              >
                <Post state={state} />
                <GetPost state={state} />
              </div>
              {/* ride side code here */}
              <div
                style={{ width: "20%", minHeight: "100vh", overflowY: "auto" }}
                className="bg-gray-700 mx-1 rounded-md"
              >
                right side
              </div>
            </>
          ) : (
            <p>Loading contract...</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
