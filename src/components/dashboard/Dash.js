import * as React from 'react'
import './dash.scss'
import { ethers } from "ethers";
import routerAbi from '../../routerAbi.json';
import tokenAbi from '../../tokenAbi.json';

const Dash = () => {

  let [price, setPrice] = React.useState(0);
  let [rebaseTime, setRebaseTime] = React.useState(0);
  let [totalSupply, setTotalSupply] = React.useState(0);
  let [treasury, setTreasury] = React.useState(0);
  let [insurance, setInsurance] = React.useState(0);
  let [poolValue, setPoolValue] = React.useState(0);
  let [firepit, setFirepit] = React.useState(0);

  // React.useEffect(() => {
  //   try{
  //   getPrice();
  //   getRebaseTime();
  //   getTotalSupply();
  //   getTreasury();
  //   getInsurance();
  //   getPoolValue();
  //   getFirepit();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []); 

  // async function getPrice(){
  //   let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //   let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //   let router = new ethers.Contract(
  //     '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  //     routerAbi,
  //     provider_
  //   );
  //   const tokenIn = '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1';
  //   const tokenOut = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  //   const amountIn = "100000";
  //   let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
  //   let busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  //   let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
  //   console.log(`
  //       Buying new token
  //       =================
  //       tokenIn: ${ethers.utils.formatEther(amountIn.toString())} ${tokenIn} (Amber)
  //       tokenOut: ${ethers.utils.formatEther(amounts2[1].toString())} ${busd} (BUSD)
  //     `);
  //   setPrice(parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(2));
  // }

  // async function getRebaseTime (){
  //   let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //   let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //   let token = new ethers.Contract(
  //     '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1',
  //     tokenAbi,
  //     provider_
  //   );
  //   let time = await token._lastRebasedTime();
  //   let timestamp = new Date().getTime();
  //   timestamp = (timestamp/1000).toFixed(0);
  //   console.log("Time", time.toString(), timestamp);
  //   time = timestamp- parseInt(time.toString());
  //   time = (15*60) - time;
  //   if (time<0) time = timestamp;
  //   setRebaseTime(time);
    
  //   let updateTime = setInterval(() => {
  //     setRebaseTime((value) => {
  //       if (value <=0)return 0;
  //       return value -1;
  //     });
  //   }, 1000);
  // }

  // async function getTotalSupply (){
  //   let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //   let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //   let token = new ethers.Contract(
  //     '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1',
  //     tokenAbi,
  //     provider_
  //   );
  //   let supply = await token.totalSupply();
  //   supply = supply.div('100000');
  //   console.log("Supply", supply.toString());
  //   setTotalSupply(parseInt(supply));
  // }

  // async function getTreasury(){
  //   let accountBalance = await getEthBalance("0x86aAAba69a458C8072582cF219Eb0d232724Eb7E");
  //   setTreasury(accountBalance);
  // }

  // async function getInsurance (){
  //   let accountBalance = await getEthBalance("0xf66fD0237F6aB8804214174CEa53941Bff90778D");
  //   setInsurance(accountBalance);
  // }

  // async function getEthBalance (address){
  //   let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //   let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //   let amount = await provider_.getBalance(address);

  //   return convertEthToUsd(amount);
  // }

  // async function convertEthToUsd (amount){
  //   let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //   let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //   let router = new ethers.Contract(
  //     '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  //     routerAbi,
  //     provider_
  //   );
  //   const bnb = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  //   let busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  //   let amounts = await router.getAmountsOut(amount, [bnb, busd]);
  //   console.log("EthBalance", ethers.utils.formatEther(amounts[1].toString()));
  //   return parseFloat(ethers.utils.formatEther(amounts[1].toString())).toFixed(2);
  // }

  // async function getPoolValue (){
  //   try {
  //     let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //     let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //     let token = new ethers.Contract(
  //       '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  //       tokenAbi,
  //       provider_
  //     );
  //     let balance = await token.balanceOf ('0xbd20D46eF6edd23731e0414b51e0B6c3BdD324f8');
  //     let amount = await convertEthToUsd (balance);
  //     setPoolValue(amount);
  //     console.log ("balance", amount.toString());
  //   } catch (err){
  //     console.log (err);
  //   }
  // }

  // async function getFirepit (){
  //   try {
  //     let rpcUrl = "https://bsc-dataseed1.defibit.io/";
  //     let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //     let token = new ethers.Contract(
  //       '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1',
  //       tokenAbi,
  //       provider_
  //     );
  //     let balance = await token.balanceOf ('0xe906200FAC8Fa29d871e5CBBB4164d0037017953');
  //     setFirepit(parseFloat(balance.div('100000')));
  //     console.log ("Firepit", balance.toString());
  //   } catch (err){
  //     console.log (err);
  //   }
  // }


  return (
    <div className='container container_dashboard'>
      <div className="block1">
        <div className="inner_block1">
          <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Token Price</h2>
            </div>
            <div className="card_value">
             <h2>${price}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Market Cap</h2>
            </div>
            <div className="card_value">
             <h2>${(totalSupply * price).toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Circulating Supply</h2>
            </div>
            <div className="card_value">
             <h2>{(0.8636 * totalSupply).toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Backed Liquidity</h2>
            </div>
            <div className="card_value">
             <h2>100%</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Market Value of Treasury Asset</h2>
            </div>
            <div className="card_value">
            <h2>${price}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Supply</h2>
            </div>
            <div className="card_value">
             <h2>{totalSupply.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>



{/* second block started */}



      <div className="block2">
      <div className='inner_block2'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Your Balance</h2>
            <div className="card_value">
             <h2>${poolValue}</h2>
            </div>
            </div>
            <div className="card_value">
            </div>
          </div>
      </div>

      <div className='inner_block2'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Token burned</h2>
            </div>
            <div className="card_value">
             <h2>${treasury}</h2>
            </div>
          </div>
      </div>

      </div>

      {/* third block started */}


      
      <div className="block2">
      <div className='inner_block2'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Pool Value</h2>
            </div>
            <div className="card_value">
             <h2>${poolValue}</h2>
            </div>
          </div>
      </div>

      <div className='inner_block2'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Marketing Wallet Balance</h2>
            </div>
            <div className="card_value">
             <h2>${insurance}</h2>
            </div>
          </div>
      </div>

      </div>


  
    </div>
  )
}

export default Dash