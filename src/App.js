import './App.css';
import Navbar from './components/navbar/Navbar';
import React, {createContext, useEffect, useState, useRef} from 'react';
import { Contract, ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import contract_abi from './tokenAbi.json';
import routerAbi from './routerAbi.json';

const myaddress = createContext();

function App(){

  let [connectedWallet, setConnectedWallet] =useState(false);
  let [totalSupply, setTotalSupply] = useState();
  let [walletAddress, setWalletAddress] = useState("Connect");
  let [poolId, setPoolId] = useState(0);
  let [treasury, setTreasury] = useState(0);
  let [pool, setPoolValue] = useState();
  let [rebase, setRebaseTime] = useState();
  let [poolInfo, setPoolInfo] = useState([]);
  let [userInfo, setUserInfo] = useState([]);
  let [_signer, _setSigner]= useState(0);
  const [price, setPrice] = useState(0)
  let [_provider, _setProvider]= useState(0);
  let [whitelistedAddresses, setWalletAddresses] = useState([]);
  let [amount, setAmount] = useState(0);
  const web3ModalRef = useRef(); // return the object with key named current
  const rpcUrl = "https://bsc-dataseed1.defibit.io/";
  const contract_address = "0x7e468e4b2fc43551fdd35b2196e094a421531129";
  const contract_provider = new ethers.providers.JsonRpcProvider(rpcUrl)

   const connectWallet = async () => {
    try {
      await getSignerOrProvider(true);
    } catch (error) {
      console.log(" error Bhai", error);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            rpc: {
              56: rpcUrl
            } // required
          }
        }
      },
    });

    totalsup()
    getPrice()
    getTreasury()
    getPoolValue()
  }, []);

  const getSignerOrProvider = async (needSigner = false) => {
    try{
      const _provider = new providers.JsonRpcProvider(rpcUrl);
      _setProvider(_provider);
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const { chainId } = await web3Provider.getNetwork();
      console.log ("ChainId: ", chainId);

      // if (chainId !== 4) {
      //   alert("USE RINKEEBY NETWORK");
      //   throw new Error("Change network to Rinkeby");
      // }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        _setSigner(signer)

        let temp = await signer.getAddress();
        console.log(temp)
        setWalletAddress(temp.toString());
      }
      setConnectedWallet(true);
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
        connectWallet();
      });
    } catch (error) {
      console.log (error);
      const provider = new providers.JsonRpcProvider(rpcUrl);
      _setProvider(provider);
    }
  }

  const totalsup = async () => {
    const contract = new ethers.Contract(contract_address, contract_abi, contract_provider)
     const totalsupplys = await contract.totalSupply();
     const supply = totalsupplys.toString()
     console.log(supply)
     setTotalSupply(supply)
  }

  async function getPrice(){
    let rpcUrl = "https://bsc-dataseed1.defibit.io/";
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let router = new ethers.Contract(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      routerAbi,
      provider_
    );
    const tokenIn = '0x7E468E4b2fc43551fDd35B2196E094a421531129';
    const tokenOut = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    const amountIn = "100000";
    let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
    let busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
    console.log(`
        Buying new token
        =================
        tokenIn: ${ethers.utils.formatEther(amountIn.toString())} ${tokenIn} (Marketing)
        tokenOut: ${ethers.utils.formatEther(amounts2[1].toString())} ${busd} (BUSD)
      `);
    setPrice(parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(2));
  }

  async function getTreasury(){
    let accountBalance = await getEthBalance("0x86aaaba69a458c8072582cf219eb0d232724eb7e");
    setTreasury(accountBalance);
  }

  async function getEthBalance (address){
    let rpcUrl = "https://bsc-dataseed1.defibit.io/";
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let amount = await provider_.getBalance(address);
    return convertEthToUsd(amount);
  }

  async function convertEthToUsd (amount){
    let rpcUrl = "https://bsc-dataseed1.defibit.io/";
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let router = new ethers.Contract(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      routerAbi,
      provider_
    );
    const bnb = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    let busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    let amounts = await router.getAmountsOut(amount, [bnb, busd]);
    console.log("EthBalance", ethers.utils.formatEther(amounts[1].toString()));
    return parseFloat(ethers.utils.formatEther(amounts[1].toString())).toFixed(2);
  }

  async function getPoolValue (){
      try {
        let rpcUrl = "https://bsc-dataseed1.defibit.io/";
        let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
        let token = new ethers.Contract(
          '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          contract_abi, 
          provider_
        );
        let balance = await token.balanceOf('0x1d98868E149a6A58c563757efA189E2931347e3b').toString();       
        let amount = await convertEthToUsd (balance);
        setPoolValue(amount);
        console.log ("balance", amount.toString());
      } catch (err){
        console.log (err);
      }
    }

  return (
    <div>
      <myaddress.Provider value={walletAddress}>
      <Navbar walletconnect = {connectWallet}/>
      </myaddress.Provider>
    </div>
  );
}

export default App;
export {myaddress};