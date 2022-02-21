import { useEffect, useState, useRef } from "react";
import {useChain, useMoralis} from "react-moralis";
import {address, abi} from "./ContractInfo";
import axios from "axios";

function NFTCard(props){

    class nft{
        constructor(){
            this.metadata = null;
            this.image = null;
        }
    }
    
    const [NFT, setNFT] = useState(null);

    const {isWeb3Enabled, enableWeb3, Moralis, user} = useMoralis();
    const {switchNetwork, chainId, chain, account} = useChain();

    const appId="GlxPyiF98U4lyK8ZfnGU6YLGE2tTDBol05QkEfYh" 
    const serverUrl="https://gh4qer8n9z1p.moralisweb3.com:2053/server"

    function createUri(ipfsUri){
        const removedIpfs = ipfsUri.replace("ipfs://", "");
        return "https://cloudflare-ipfs.com/ipfs/".concat(removedIpfs);
    }

    useEffect(()=>{
        async function populateNftMetadata(tokenURI){
                let newNft = new nft()
                let metadata = await axios.get(createUri(tokenURI))
                newNft.metadata = metadata.data;
                newNft.image = createUri(newNft.metadata.image)
                return newNft;
        }
            
        async function activateMoralis(){
            await Moralis.start({
              appId, serverUrl
            })
          }
          
        async function getNFT(){
            const getURIOptions = {
                chain: "mumbai",
                address: address,
                function_name: "tokenURI",
                abi: abi,
                params:{tokenId: props.newNFTId}
            }
            
            await activateMoralis();
            const tokenURI = await Moralis.Web3API.native.runContractFunction(getURIOptions);
            console.log("TokenURI: "+tokenURI);
            const newNFT = await populateNftMetadata(tokenURI);
            console.log(newNFT)
            console.log(newNFT.image);
            setNFT(newNFT);

            
        }
        getNFT();
        }, [user, Moralis, props.newNFTId]
    )
    
    function Card(){
        return(
            <div className="grid place-items-center shadow-xl border-4 border-amber-500 w-128 rounded-lg">
                <div className="text-6xl py-2">Your New TallNeck!!!</div>
                <img src={NFT ? NFT.image : process.env.PUBLIC_URL+"/loading.gif"} class="rounded-lg"/>
                <div className="py-4">{NFT.metadata.name}</div>
                <div className="pb-2">
                    <button className="border-2 border-amber-500" onClick={()=>{
                        props.setNewNFTId(null)
                        window.location.reload(false);                        
                        }}>YAY!!</button>
                </div>
            </div>
        )
    }

    return(
        <div>
            {NFT ? <Card/> : null}
        </div>
    )
}

export default NFTCard;