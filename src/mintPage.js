import AuthButton from "./AuthButton";
import NavBar from "./navbar";
import MintButton from "./MintButton";
import DisplayNfts from "./DisplayNfts";
import Supply from "./Supply";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { useMoralis } from "react-moralis";
import MintDisplay from "./MintDisplay";

function MintPage(){
    
    const [connected, setConnected] = useState(false);
    const [newNFTId, setNewNFTId] = useState(null);
    
    return(
        <div className="bg-dark-orange h-max text-black font-mono relative">
            <AuthButton setConnected={setConnected}/>
            <div className="grid place-items-center">
                <img className="scale-30 -translate-y-28" src={process.env.PUBLIC_URL + "/tallNeckLogo.png"}/>
            </div>
            <div className="grid place-items-center">

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 drop-shadow-2xl">

                    <div className="md:px-6 lg:px-6 pt-24">
                        <img src={process.env.PUBLIC_URL+"/TallNeckExample.gif"} className="bg-white rounded-full border-4 border-cyan-500 border-dashed"></img>
                    </div>

                    <MintDisplay connected={connected} setConnected={setConnected} setNewNFTId={setNewNFTId}/>

                    <div className="md:px-6 lg:px-6 pt-24">
                        <img src={process.env.PUBLIC_URL+"/TallNeckExample.gif"} className="bg-white rounded-full border-4 border-cyan-500 border-dashed"></img>
                    </div>          

                </div>

                <div className="pb-32 pt-32">
                {newNFTId ? <div >
                    <NFTCard newNFTId={newNFTId} setNewNFTId={setNewNFTId}/>
                </div> : null}

            </div>

            </div>
            
            {connected ? <div className="grid place-items-center text-7xl pb-4">Your Tall Necks:</div> : null}
            <DisplayNfts connected={connected}/>
        </div>
    )
}

export default MintPage;