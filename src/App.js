import './App.css';
import Navbar from './components/navbar/Navbar';
import React, {createContext, useEffect, useState, useRef} from 'react';
import { Contract, ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

let provider = createContext();
let setProvider = createContext();
let signer = createContext();
let setSigner = createContext();
let walletAddress = createContext();
let setWalletAddress = createContext();

function App(){

  let [_provider, _setProvider] = useState("Hi provider");
  let [_signer, _setSigner] = useState("Hellow signer");
  let [_walletAddress, _setWalletAddress] = useState("");

  return (
    <div>
      <provider.Provider value ={_provider}>
      <setProvider.Provider value ={_setProvider}>
      <signer.Provider value ={_signer}>
      <setSigner.Provider value ={_setSigner}>
        <Navbar/>
        </setSigner.Provider>
      </signer.Provider>
      </setProvider.Provider>
      </provider.Provider>
    </div>
  );
}

export default App;
export {provider, setProvider, signer, setSigner, walletAddress, setWalletAddress};