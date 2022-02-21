import AuthButton from "./AuthButton";
import NavBar from "./navbar";
import MintButton from "./MintButton";
import DisplayNfts from "./DisplayNfts";
import Supply from "./Supply";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { useMoralis } from "react-moralis";

function MintPage(){
    
    const [connected, setConnected] = useState(false);
    const [newNFTId, setNewNFTId] = useState(null);
    
    return(
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-max text-2xl text-amber-500 font-mono relative">
            <AuthButton setConnected={setConnected}/>
            <div className="grid place-items-center">
                <img className="scale-60" src={process.env.PUBLIC_URL + "/tallNeckLogo.png"}/>
                <Supply/>
                <MintButton setConnected={setConnected} setNewNFTId={setNewNFTId}/>

                <div className="pb-32">
                {newNFTId ? <div >
                    <NFTCard newNFTId={newNFTId} setNewNFTId={setNewNFTId}/>
                </div> : null}

            </div>

            </div>
            
            {connected ? <div className="grid place-items-center text-7xl pb-4">Your Tall Necks</div> : null}
            <DisplayNfts connected={connected}/>
        </div>
    )
}

export default MintPage;