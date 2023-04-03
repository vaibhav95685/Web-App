import { ethers } from "ethers";

export const fetchPalletsColor = (type) => {
    switch (parseInt(type)) {
        case 1:
            return '#366EEF';

        case 2:
            return '#00ACAC';

        case 3:
            return '#8558ED';

        case 4:
            return '#EF8C29';

        case 5:
            return '#C35047';

        case 6:
            return '#50A9D8';

        default:
            return '#366EEF';

    }
}

export const handleLoadOutText = (e, color="#366EEF") => {
    const button = e.target;

    button.style.color = color;    
}

export const handleLoadHoverText = (e, color="#366EEF") => {
    const button = e.target;

    button.style.color = color;
}


export const getParamTenantId = () => {

    if(localStorage.getItem('tenantId') != 'null') return `?id=${localStorage.getItem('tenantId')}`
   
}
export const getParamTenantWalletAddress = (address) => {

    if(address)
     return `?wallet=${address}`
    else 
    return ''
}
export const metaMaskConnector=async ()=>{
    if (typeof window.ethereum !== "undefined") {
        try {
          let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          let newaddress = accounts[0];
          localStorage.setItem("walletAddress", newaddress);
          let balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [newaddress, "latest"],
          });
          const PriceEther = ethers.utils.formatEther(balance);
          return {
            newaddress,
            PriceEther
          }
        }
        catch(err){
            console.log(err);
        }
    }
    
}

export const getPostTenantId = () => {

    if(localStorage.getItem('tenantId') != 'null') return `${localStorage.getItem('tenantId')}`
  
}


export const calculateExpireSale = (expireData) => {

    const date1 = new Date(expireData);
    const date2 = new Date();
    // const date2 = new Date(date.toLocaleDateString());
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));     

    return diffDays;
}

export const calculateExpireSaleInMiniSeconds = (expireData) => {
    const date1 = new Date(expireData);
    const date2 = new Date();    
    return Math.abs(date2 - date1);    
}

export const calculateExpireTime = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {      
      return `Sales Ended`;
    } else {      
      if(days > 0) return `${days} days left`
      if(hours > 0) return `${hours} hours left`
      if(minutes > 0) return `${minutes} minutes left`
      if(seconds > 0) return `${seconds} seconds left`
      
      return 'Nft Expired'
    }
  };