import {useMoralis, useChain} from "react-moralis";
import {address, abi, chain} from "./ContractInfo";
import ethers from "ethers";
import {useState} from "react"


function MintButton(props){

    const {isWeb3Enabled, enableWeb3, Moralis, user} = useMoralis();
    const {switchNetwork, chainId, chain, account} = useChain();

    let mintBlock = 0x00;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
    async function waitTillMined(provider, txHash){
        let mined = false
        while(!mined){
            
            console.log("Checking!")
            await sleep(5000)
            console.log("Done sleeping")
            let txRecp = await provider.getTransactionReceipt(txHash)
            console.log("Done checking")
            console.log(txRecp)
            if (txRecp && txRecp.blockNumber) {
                mined=true
            }
        }
    }  

    async function listenForNewMint(txHash){
        if(isWeb3Enabled){
            try{
                console.log("Running listen")
                const ethers = Moralis.web3Library;
                const provider = await Moralis.enableWeb3();
                console.log("Web3 enabled!")
                const contract = new ethers.Contract(address, abi, provider.getSigner());
                const filter = contract.filters.Transfer("0x0000000000000000000000000000000000000000", Moralis.provider.selectedAddress)
                await waitTillMined(provider, txHash)
                const curBlock = await provider.getBlockNumber();
                console.log("Cur Block: "+ curBlock + " Mint Block: "+mintBlock)
                const events = await contract.queryFilter(filter, mintBlock, curBlock)
                console.log(events)
                const newNFTTokenId = parseInt(events[0].args.tokenId._hex)
                console.log(newNFTTokenId);
                props.setNewNFTId(newNFTTokenId);
            }
            catch(e){
                console.log(e.message)
                alert("Event did not get transmitted in time, reload page to see NFT!");
            }
            
        }
        else{
            console.log("Didn't run")
        }
    }

    async function callMint(){
        
        if(isWeb3Enabled){
            const ethers = Moralis.web3Library;
            const provider = await Moralis.enableWeb3();
            mintBlock = await provider.getBlockNumber();
            const options = {value: 1}
            const contract = new ethers.Contract(address, abi, provider.getSigner());
            try{
                const tx = await contract.mint(1, options);
                console.log(tx.hash)
                console.log("Listening for new mint!")
                await listenForNewMint(tx.hash);
            }
            catch(error){
                console.log(error)
                alert(error.message)
                return
            }
            



        }
        else{
            enableWeb3().then(async ()=> {
                await switchNetwork("0x13881")
                props.setConnected(true);
            }
            )
        }
    }

    
    return(
        <div className="grid place-items-center pb-8">
            <button className="bg-exampleGif bg-contain h-64 w-64 rounded-lg "
            onClick={()=>{
                callMint();
            }}>
                <div className="border-4 rounded-full border-amber-500 bg-purple-400 bg-opacity-90 text-7xl">Mint</div>
            </button>
        </div>
    )

}

export default MintButton;