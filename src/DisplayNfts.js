import axios from "axios";
import { useEffect, useState } from "react";
import {useMoralis} from "react-moralis";
import { address, chain } from "./ContractInfo";

function DisplayNfts(props){

    const {isWeb3Enabled, isWeb3EnableLoading, enableWeb3, Moralis, user} = useMoralis();

    const [NFTs, setNFTs] = useState([])

    class nft{
        constructor(nft){
            this.nft = nft;
            this.metadata = null;
            this.image = null;
        }
    }

    const nftItems = NFTs.map((nft) => 
        <div className="grid place-items-center shadow-xl rounded-lg" key={nft.nft.token_id}>
            <img src={nft.image} class="rounded-lg"/>
            <div className="py-4">{nft.metadata.name}</div>
        </div>
    )

    function createImageUri(ipfsUri){
        const removedIpfs = ipfsUri.replace("ipfs://", "");
        return "https://cloudflare-ipfs.com/ipfs/".concat(removedIpfs);
    }

    useEffect(() =>{

        async function populateNftMetadata(nfts){
            const newNfts = []
            for(let i=0; i<nfts.length; i++){
                let newNft = new nft(nfts[i])
                if(nfts[i].token_uri != null){
                    let metadata = await axios.get(nfts[i].token_uri)
                    newNft.metadata = metadata.data;
                    newNft.image = createImageUri(newNft.metadata.image)
                    newNfts.push(newNft)
                }
            }
            return newNfts
        }

        async function getNfts(){
            await enableWeb3();
            const options = {chain: chain, address: Moralis.provider.selectedAddress, token_address: address}
            const userNfts = await Moralis.Web3API.account.getNFTsForContract(options);
            //console.log(userNfts.result)
            const nfts = await populateNftMetadata(userNfts.result);
            //console.log(nfts);
            setNFTs(nfts);
        }

        if(props.connected){
            getNfts()
        }
       
    }, [props.connected, user, Moralis])
    
    return (
        <div>
            <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8">
           {NFTs ? nftItems : null} 
            </div>
        </div>
    )

}

export default DisplayNfts;