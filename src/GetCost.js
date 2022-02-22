import { useMoralis, useChain } from "react-moralis";
import {useState, useEffect} from "react";
import { address, abi, chain } from "./ContractInfo";

function GetCost(){

    const {isWeb3Enabled, enableWeb3, Moralis, user} = useMoralis();
    const {switchNetwork, chainId, account} = useChain();

    const [Cost, setCost] = useState(0);

    const appId="GlxPyiF98U4lyK8ZfnGU6YLGE2tTDBol05QkEfYh" 
    const serverUrl="https://gh4qer8n9z1p.moralisweb3.com:2053/server"

    useEffect(()=>{
        async function activateMoralis(){
            await Moralis.start({
              appId, serverUrl
            })
          }
          
        async function getCost(){
            const costOpts = {
                chain: chain,
                address: address,
                function_name: "cost",
                abi: abi,
                params:{}
            }
            await activateMoralis();
            const wei = await Moralis.Web3API.native.runContractFunction(costOpts)
            const ethers = Moralis.web3Library;
            const cost = ethers.utils.formatEther(wei)
            console.log("cost: "+cost)

            setCost(cost);
            
        }
        getCost();
        }, [user, Moralis]
    )
    

    return(
        <div className="grid place-items-center pb-8 font-sans text-2xl text-center">
           1 TNNFT cost {Cost} Matic.
        </div>
    )
}

export default GetCost;