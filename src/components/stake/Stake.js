import React from 'react';
import './stake.css';
import Progress from 'react-progressbar';


const Stake = () => {
  return (
    <div>

    <div className='landing'>
        <div className='stak_box'>  
            <div className='stak_heading'>
                <h2>STAKE YOUR TOKEN</h2>
            </div>
            <div className='stak_bar'>
            <Progress color="rgba(113, 41, 216, 0.9)" completed={75} height={20} data-label={`75% Pool Filled`} />
            </div>
            {/* <Timer /> */}
            <div className='stak_info'>
            <p>Estimated APY : <span className='text-blue'>{`330.36%`}</span></p>
            <p>My Balance : <span className='text-blue'>{`$345`}</span> </p>
            <p>My Stakable Balance :  <span className='text-blue'>{`$315`}</span></p>
            </div>  

            <div className='inputs'>
         
            <div className='inputbox'>
            <div>
            <label>Stake Your Token</label>
            </div>
            <div className="input1">
            <input placeholder='Enter Token Amount' type="number" />
                <div className='maxToken'>
                <p>MAX</p>
                </div>
                </div>
                <div className='inputbox'>
                <div>
                <label>Staked Token</label>
                </div>
                <input placeholder={`Show Staked Amount`} readOnly/>
            </div>
            </div>
            </div>


            <div className='stak_info'>
            <p>Claimable Token : <span className='text-blue'>{`330.36%`}</span> </p>
            <p>My Total Claimed Token : <span className='text-blue'>{`632123`}</span></p>
            <p>Unstake Fee : <span className='text-blue'>{`0%`}</span></p>
            </div>
            <div className='all_buttons'>
                <button className='greenButton'>STAKE</button>
                <button className='greenButton'>CLAIM</button>
                <button className='greenButton'>UNSTAKE</button>
                <button className='redbutton'>EMERGENCY UNSTAKE</button>
            </div>
            </div>
    </div>
    </div>
  )
}

export default Stake