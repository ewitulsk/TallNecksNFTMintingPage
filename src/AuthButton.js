import {useChain, useMoralis, useMoralisWeb3Api} from "react-moralis";

function AuthButton(props){
    const {enableWeb3, isWeb3Enabled, isWeb3EnableLoading, Moralis} = useMoralis();
    const {switchNetwork, chainId, chain, account} = useChain();
    
    async function auth(){
        enableWeb3().then(async ()=> {
            await switchNetwork("0x13881")
            props.setConnected(true);
        }
        )
    }

    if(isWeb3Enabled){
        return(null)
    }
    return(
        <div>
            <button onClick={auth} 
            class="bg-yellow-400 w-full text-center rounded-md h-12 text-green-600 font-bold">
                Connect
            </button>
        </div>
    );
}

export default AuthButton;