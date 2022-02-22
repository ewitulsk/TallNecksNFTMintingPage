import Supply from "./Supply";
import MintButton from "./MintButton";
import GetCost from "./GetCost";

function MintDisplay(props){
   return(
       <div className="bg-white rounded-lg border-4 border-cyan-500 text-orange-500 border-dashed pb-24 pt-32">
        <Supply/>
        <a href="https://polygonscan.com/address/0x60a8f7901c3aea9dfb12477500879ca639af75b2" class="grid place-items-center text-cyan-300 pb-4">0x60a8f7901c3ae...</a>
        <GetCost/>
        <MintButton connected={props.connected} setConnected={props.setConnected} setNewNFTId={props.setNewNFTId}/>
       </div>
   )

}

export default MintDisplay;