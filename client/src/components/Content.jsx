import { useEffect, useReducer, useState } from "react";
import logo from "../assets/logo.png";
const ethers = require("ethers");


const Content = (props) => {


    const [participantsCount, setParticipantCount] = useState("0");
    const [ethCount, setEthCount] = useState(0);
    const { provider, signer, contract } = props.state;


    const ltry = async (event) => {

        event.preventDefault();
        try {
            const amount = document.querySelector(".entry").value;
            const amt = await ethers.parseEther(amount);
            const txn = await contract.receiveEth({ value: amt });
            alert("Wait 15-30 seconds for Transaction to finish...");
            await txn.wait();
            alert("Transaction Done..");
            window.location.reload();
        }
        catch (error) {
            alert("Transaction Rejected");
        }

    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                const p = await contract.partCount();
                const part = p.toString();
                const emt = await contract.getBalance();
                const e = ethers.formatEther(emt);
                setParticipantCount(part);
                setEthCount(e);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [contract])

    return <div className="info">
        <div className="image"><img src={logo} /> </div>
        <div className="space"><div className="content">
            <h2>Lottery</h2>
            <h4>Rules are simple: BET IN !, the manager will pull out the results in every two days and winner will be funded with the amount</h4>
            <h3 className="status"> The Lottery currently has {participantsCount} number of participants
                competing for {ethCount} ETH.
            </h3>
            <h3 className="status">Give it a try !!</h3>
            <div className="inp">
                <input className="entry" placeholder="Enter ETH amount"></input>
                <button className="stake" onClick={ltry}>BET</button></div>
        </div></div>

    </div>

}

export default Content;