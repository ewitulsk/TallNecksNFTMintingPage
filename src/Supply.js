import { useEffect } from "react";
import {useMoralis, useChain} from "react-moralis";
import {address, abi, chain} from "./ContractInfo";
import { useState } from "react";

function Supply(){

    const {isWeb3Enabled, enableWeb3, Moralis, user} = useMoralis();
    const {switchNetwork, chainId, account} = useChain();

    const [maxSupply, setMaxSupply] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);

    const appId="GlxPyiF98U4lyK8ZfnGU6YLGE2tTDBol05QkEfYh" 
    const serverUrl="https://gh4qer8n9z1p.moralisweb3.com:2053/server"

    useEffect(()=>{
        async function activateMoralis(){
            await Moralis.start({
              appId, serverUrl
            })
          }
          
        async function getSupply(){
            const maxSupplyOpts = {
                chain: chain,
                address: address,
                function_name: "maxSupply",
                abi: abi,
                params:{}
            }
            const totalSupplyOpts = {
                chain: chain,
                address: address,
                function_name: "totalSupply",
                abi: abi,
                params:{}
            }
            await activateMoralis();
            const maxSupply = await Moralis.Web3API.native.runContractFunction(maxSupplyOpts)
            const totalSupply = await Moralis.Web3API.native.runContractFunction(totalSupplyOpts)
            
            setMaxSupply(maxSupply);
            setTotalSupply(totalSupply);

            console.log(maxSupply+"/"+totalSupply)
            
        }
        getSupply();
        }, [user, Moralis]
    )
    

    return(
        <div className="grid place-items-center pb-4 text-6xl font-medium">
            {totalSupply} / {maxSupply}
        </div>
    )
}

export default Supply;