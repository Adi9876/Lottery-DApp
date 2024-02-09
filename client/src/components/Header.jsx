import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
const ethers = require("ethers");




const Header = (props) => {

    const { ethereum } = window;
    const { contract } = props.state;


    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    
    const { state, onRefreshContent } = props;

    async function connectWallet() {


        if (!connected) {
        

            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            const owner = await contract.manager();
            if (walletAddress === owner) {
                setIsOwner(true);
            }
            setConnected(true);
            setWalletAddress(walletAddress);

            console.log(walletAddress);

        } else {

            setConnected(false);
            setWalletAddress("");
            // console.log(ethereum);
        }
    };

    async function pickWinner() {
        try {
            const winner = await contract.getWinner();
            winner.wait();
            onRefreshContent();
            toast.success("Operation succeeded!");

        }
        catch (error) {
            const message = error.message;
            console.log(message);
            toast.error(`Player count 0 Transaction reverted!!`);

        }
    }


    const disconnectWallet = async () => {
        if (ethereum) {
            try {
                // Disconnect MetaMask wallet
                await ethereum.request({ method: "eth_requestAccounts" });
                setConnected(false);
                setWalletAddress("");
                setIsOwner(false);
            } catch (error) {
                toast.error(`Error disconnecting wallet`);
            }
        }
    };


    return <header>
        <div><Toaster></Toaster></div>
        <div className="head">
            <h1>Prototype Website for Decentralized Lottery</h1>
            {!connected ? <button className="walletButton" onClick={connectWallet}>
                Connect Wallet</button> : <button className="walletButton" onClick={disconnectWallet}>Disconnect Wallet</button>}
            {isOwner && (<button className="ManagerButton" onClick={pickWinner}>Result</button>)}
        </div>
        {/* <div>{walletAddress}</div> */}
    </header>


}

export default Header;