import * as React from 'react'
import './account.scss'
import { ethers } from "ethers";
import routerAbi from '../../routerAbi.json';
import tokenAbi from '../../tokenAbi.json';

const Account = () => {

  let [balance, setBalance] = React.useState(0);
  let [price, setPrice] = React.useState(0);
  let [rebaseTime, setRebaseTime] = React.useState(0);


  React.useEffect(() => {
    try{
      getPrice()
      getBalance()
      getRebaseTime();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function getPrice(){
    let rpcUrl = "https://bsc-dataseed1.defibit.io/";
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let router = new ethers.Contract(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      routerAbi,
      provider_
    );
    const tokenIn = '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1';
    const tokenOut = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    const amountIn = "100000";
    let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
    let busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
    console.log(`
        Buying new token
        =================
        tokenIn: ${ethers.utils.formatEther(amountIn.toString())} ${tokenIn} (Amber)
        tokenOut: ${ethers.utils.formatEther(amounts2[1].toString())} ${busd} (BUSD)
      `);
    setPrice(ethers.utils.formatEther(amounts2[1].toString()));
  }

  async function getBalance (){
    try {
      let rpcUrl = "https://bsc-dataseed1.defibit.io/";
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1',
        tokenAbi,
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []).catch((error) => {
          console.log(error);
      })
      let signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      let balance = await token.balanceOf (walletAddress);
      setBalance(balance.div('100000').toString());
      console.log ("balance", balance.toString());
    } catch (err){
      console.log (err);
    }
  }

  async function getRebaseTime (){
    let rpcUrl = "https://bsc-dataseed1.defibit.io/";
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let token = new ethers.Contract(
      '0x4AeC6456B758f7eE4d12383cadEfD65de5312Df1',
      tokenAbi,
      provider_
    );
    let time = await token._lastRebasedTime();
    let timestamp = new Date().getTime();
    timestamp = (timestamp/1000).toFixed(0);
    console.log("Time", time.toString(), timestamp);
    time = timestamp- parseInt(time.toString());
    time = (15*60) - time;
    if (time<0) time = timestamp;
    setRebaseTime(time);
    
    let updateTime = setInterval(() => {
      setRebaseTime((value) => {
        if (value <=0)return 0;
        return value -1;
      });
    }, 1000);
  }




  return (
    <div className='container'>

      {/* last block */}      
      <div className="block3">
      <div className='inner_block3'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Your Balance</h2>
            </div>
            <div className="card_value card_value_acc">
             <h2>${balance* (parseFloat(price).toFixed(2))}</h2>
            </div>
            <div className='card_title'>
            <h2>{balance} AMBR</h2></div>
          </div>
      </div>

      <div className='inner_block3'>
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>APY</h2>
            </div>
            <div className="card_value card_value_acc">
             <h2>388,047%</h2>
            </div>
            <div className='card_title'>
              <h2>Daild ROI 2.289%</h2>
            </div>
          </div>
      </div>
        <div className='inner_block3'>
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Next Rebase</h2>
            </div>
            <div className="card_value card_value_acc">
             <h2>00:{parseInt(rebaseTime/60)%15}:{rebaseTime%60}</h2>
            </div>
            <div className='card_title'>
            <h2>You will earn money soon</h2></div>
          </div>
      </div>

      </div>
      <div className='block4 account_info_block'>
          <div className="row">
            <div className='title_card'>
                <h2>Current AMBR Price</h2>
            </div>

            <div className='value'>
            <h2>${parseFloat(price).toFixed(2)}</h2>
            </div>
          </div>

          <div className="row">
            <div className='title_card'>
            <h2>Next Reward Amount</h2>
            </div>

            <div className='value'>
            <h2>{0.0002358 * parseFloat(balance)} AMBR</h2>
            </div>
          </div>



          <div className="row">
            <div className='title_card'>
                <h2>Reward Amount USD</h2>
            </div>

            <div className='value'>
            <h2>${0.0002358 * parseFloat(balance)* parseFloat(price).toFixed(2)}</h2>
            </div>
          </div>



          <div className="row">
            <div className='title_card'>
            <h2>Next Reward Yield</h2>
            </div>

            <div className='value'>
            <h2>0.02358%</h2>
            </div>
          </div>



          <div className="row">
            <div className='title_card'>
        <h2>ROI(1-Day Rate) USD</h2>
            </div>

            <div className='value'>
            <h2>${(0.02289 * balance * (parseFloat(price).toFixed(2))).toFixed(6)}</h2>
            </div>
          </div>



          <div className="row">
            <div className='title_card'>
            <h2>ROI(5-Day Rate)</h2>
            </div>

            <div className='value'>
            <h2>11.982%</h2>
            </div>
          </div>



          <div className="row">
            <div className='title_card'>
            <h2>ROI(5-Day Rate) USD</h2>
            </div>

            <div className='value'>
            <h2>${(0.11982 * balance * (parseFloat(price).toFixed(2))).toFixed(4)}</h2>
            </div>
          </div>



      </div>
    </div>
  )
}

export default Account;