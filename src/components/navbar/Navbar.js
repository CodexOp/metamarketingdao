import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import "./navbar.scss"
import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Web3Modal from "web3modal";
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { ethers, providers } from "ethers";
import Box from '@mui/material/Box';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Dash from '../dashboard/Dash';
import logo from '../../images/logo.png'
import Account from '../account/Account';
import Stake from '../stake/Stake';
import * as Ai from 'react-icons/ai';
import {FaDiscord, FaTelegram, FaTelegramPlane} from 'react-icons/fa'
import {provider, setProvider, signer, setSigner} from '../../App';
import values from "../../values.json"


function TabPanel(props) {

  const { children, value, index, ...other } = props;

 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

let swapUrl = "https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1";
let docsUrl = "https://amber-protocol.gitbook.io/copy-of-amber-protocol/";



const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Account', href: '#', current: false },
  { name: 'Swap', href: swapUrl, current: false },
  { name: 'Vote & Proposal', href: 'https://snapshot.org/#/metamarketingdao.eth', current: false },
]



export default function Navbar(props) {

  let [address, setAddress]= useState("Connect");
  let [active, setActive]= useState("active_logout");

  let [connectedWallet, setConnectedWallet] = React.useState(false);
  let [walletAddress, setWalletAddress] = React.useState("Connect");


  let _provider = React.useContext (provider);
  let _setProvider = React.useContext (setProvider);
  let _signer = React.useContext (signer);
  let _setSigner = React.useContext (setSigner);

  const web3ModalRef = useRef(); // return the object with key named current


  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "binance",
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            rpc: {
              56: values.rpcUrl
            } // required
          }
        }
      },
    });

  }, []);

  useEffect(()=>{
    
  }, [_provider, _signer]);


    const [value, setValue] = React.useState(0);
    const [close, setclose] = React.useState();

    React.useEffect(() => {
    }, []);

    const connectWallet = async () => {
      try {
        await getSignerOrProvider(true);
      } catch (error) {
        console.log(" error Bhai", error);
      }
    };
  
    const getSignerOrProvider = async (needSigner = false) => {
      try{
        const _provider = new providers.JsonRpcProvider(values.rpcUrl);
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
          setWalletAddress(temp.toString());
        }
        setConnectedWallet(true);
        provider.on("accountsChanged", (accounts) => {
          console.log(accounts);
          connectWallet();
        });
      } catch (error) {
        console.log (error);
        const provider = new providers.JsonRpcProvider(values.rpcUrl);
        _setProvider(provider);
      }
    };

    let websiteUrl = "http://metamarketingdao.com/";



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Disclosure as="nav" className="bg-[#000]">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 pr-2 sm:pr-10 navbar">
            <div className="relative flex items-center justify-between h-20 ">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden navbutton">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white button_close menu">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-start  sm:items-stretch sm:justify-start transition-property: all transition-duration:150ms">
                <div className="flex-shrink-0 flex items-center logo_mob">
                  <a href={websiteUrl}>
                  <img
                    className="block lg:hidden h-8 w-auto pl-10 logoimg"
                    src={logo}
                    alt="Workflow"
                    
                  />
                  </a>

                
                </div>
            
              </div>
              <div className="buttonblock">
            
              <a
                className='buynowbutton'
                href={swapUrl}
                target="_blank" rel="noreferrer"
                >Buy Now</a>
                <button
                className='connect_button'
                onClick= {connectWallet}
                >{(connectedWallet)? <>{walletAddress.slice(0, 6) + "..."}</>
                :
                <>Connect</>}</button>
              </div>
            </div>
          </div>


          <Disclosure.Panel className="lg:hidden panel">
            <div className="px-2 pt-2 pb-3 space-y-1">
            <a href={websiteUrl} className="logo-container">
 <img src={logo} alt='logo' className='logo'/>
 </a>

            <Tabs 
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', fontSize:'100px' }}
      >
          
        
        <Tab label={<div className="icon_nav"><Ai.AiFillDashboard className='icon_nav_main'/> Dashboard</div>} onClick={()=>{
                        const close = document.getElementById('headlessui-disclosure-button-1')
                        close.click();
                  }}
                   {...a11yProps(0)} />
        <Tab label={<div className="icon_nav"><Ai.AiFillAccountBook className='icon_nav_main'/> Account</div>}
        onClick={()=>{
                        const close = document.getElementById('headlessui-disclosure-button-1')
                        close.click();
                  }} {...a11yProps(1)} />
        


        


       <Tab label={<div className="icon_nav"><Ai.AiFillThunderbolt className='icon_nav_main'/> Stake</div>} onClick={()=>{
            const close = document.getElementById('headlessui-disclosure-button-1')
            close.click();
      }} {...a11yProps(4)} />
        <a href='https://snapshot.org/#/metamarketingdao.eth' target="_blank"><div className='icon_nav'><Ai.AiOutlineBulb className='icon_nav_main'/><h2 className='swap swap_size'>Vote</h2></div></a>
        <a href={websiteUrl} target="_blank"><div className='icon_nav'><Ai.AiOutlineChrome className='icon_nav_main'/><h2 className='swap swap_size'>Website</h2></div></a>


       
       <div className='socials'>
       <a href="https://t.me/MetaMarketingDAO"> <FaTelegram className='social_icon social_mobile'/></a>
        <a href="https://twitter.com/MetaMktingDAO"> <Ai.AiFillTwitterCircle className='social_icon social_mobile'/> </a>
        <a href="https://discord.com/invite/Y9sdpcCbnv"> <FaDiscord className='social_icon social_mobile'/> </a>

        </div> 
      </Tabs>
            </div>
          </Disclosure.Panel>
          
          <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >

<div className='left_navbar'>
  <div className="trui">
  <a href={websiteUrl}>
<img src={logo} alt='logo' className='logo'/>
</a>

      <div className='left_content'>
       
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >

        <Tab label={<div className="icon_nav"><Ai.AiFillDashboard className='icon_nav_main'/> Dashboard</div>} {...a11yProps(0)} />
        <Tab label={<div className="icon_nav"><Ai.AiFillAccountBook className='icon_nav_main'/> Account</div>}  {...a11yProps(1)} />
        <Tab label={<div className="icon_nav"><Ai.AiFillThunderbolt className='icon_nav_main'/> Stake</div>}  {...a11yProps(4)} />
        <a href='https://snapshot.org/#/metamarketingdao.eth' target="_blank"><div className='icon_nav'><Ai.AiOutlineBulb className='icon_nav_main'/><h2 className='swap swap_size'>Vote</h2></div></a>
        <a href={websiteUrl} target="_blank"><div className='icon_nav'><Ai.AiOutlineGlobal className='icon_nav_main'/><h2 className='swap swap_size'>Website</h2></div></a>
        <div className='socials'>
        <a href="https://t.me/MetaMarketingDAO"> <FaTelegram className='social_icon'/></a>
        <a href="https://twitter.com/MetaMktingDAO"> <Ai.AiFillTwitterCircle className='social_icon'/> </a>
        <a href="https://discord.com/invite/Y9sdpcCbnv"> <FaDiscord className='social_icon'/> </a>

        </div> 
      
      </Tabs>
     
      </div>
      </div>
</div>

<div className='right_content'>
      <TabPanel value={value} index={0}>
        <Dash />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Account />
      </TabPanel>
  
      <TabPanel value={value} index={2}>
       <Stake />
      </TabPanel>
      </div>
      
    </Box>
          
        </>
      )}
    </Disclosure>


    
  )
}
