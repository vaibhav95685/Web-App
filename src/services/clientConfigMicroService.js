import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";
import axios from "axios";
import { BASE_URL1,BASE_URL3 } from "../reducers/Constants";
import { WHITE_LABEL_TOKEN } from "../reducers/Constants";
import { getParamTenantId, getPostTenantId,getParamTenantWalletAddress } from "../utility/global";

export function getCategories(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_CLIENT_CONFIG_MICROSERVICE +
    "api/v1/categories"+getParamTenantId();
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

// export async function getTenantData(paramToken=false, paramAddress=false) {
//   const token = {
//     "Access-Control-Allow-Origin": "*",
//     "Content-type": "Application/json",
//     "x-access-token": `${paramToken || localStorage.getItem(WHITE_LABEL_TOKEN)}`,
//   };
//   try {
//     let address = localStorage.getItem("walletAddress") ? localStorage.getItem("walletAddress") : "0x9affb1cf8e276657f857e0b6c982e093bdb50968";
//     let loggedAddres = paramAddress || address
//     const url = `${BASE_URL1}/api/v1/tenant/wallet/${loggedAddres}${getParamTenantId()}`;
//     const res = await fetch(url, { headers: token });
//     const result = await res.json();
//     const tenantData = result.responseData;
//     return tenantData;
//   } catch (err) {
//     (err);
//   }
// }

export async function getTenantData(paramToken=false, paramAddress=false,tenantId) {
  const token = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": `${paramToken || localStorage.getItem(WHITE_LABEL_TOKEN)}`,
  };

  const body = {
    "_id" :tenantId!=null ? tenantId :getPostTenantId() 
  }

  try {   
    const url = `${BASE_URL1}/api/v1/tenant-details`;
    const res = await fetch(url, {method: 'POST', headers: token, body: JSON.stringify(body) });
    const result = await res.json();
    const tenantData = result.responseData;
    return tenantData;
  } catch (err) {
   console.log(err);
  }
}


export async function getTenant(reqData) {


  try {   
    const url = `${BASE_URL1}/api/v1/tenant`;
    const res = await fetch(url, {method: 'POST', headers: AuthToken,body: JSON.stringify(reqData) });
    const result = await res.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function createSubDomain(reqData){

  try{
    const url = `${BASE_URL1}/api/v1/create-subdomain`;
    const res = await fetch(url, {method: 'POST', headers: AuthToken,body: JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}

export async function createSubsription(reqData){

  try{
    const url = `${BASE_URL3}/api/v1/subscriptions`;
    const res = await fetch(url, {method: 'POST', headers: AuthToken,body: JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}
export async function getSubscription(period,token){
  const Token = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": `${token}`,
  };
  try{
    const url = `${BASE_URL3}/api/v1/subscriptions?billingCycle=${period}`;
    const res = await fetch(url, {method: 'GET', headers: Token });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);
  }
}

export async function getSubscriptionPlan(tenantId){
  try{
    const url = `${BASE_URL3}/api/v1/user/subscriptions/${tenantId}`;
    const res = await fetch(url, {method: 'GET', headers: AuthToken});
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);
  }
}
export async function updateSubscription(reqData,tenantId,token){
  try{
     const AuthToken = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      "x-access-token": token !="" ?token :localStorage.getItem(WHITE_LABEL_TOKEN),
    };
    
    console.log(reqData);
    const url = `${BASE_URL3}/api/v1/subscriptions/${tenantId}`;
    const res = await fetch(url, {method: 'PUT', headers: AuthToken,body:JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}

export async function addTranscation(reqData){
  try{
    const url = `${BASE_URL3}/api/v1/transactions`;
    const res = await fetch(url, {method: 'POST', headers: AuthToken,body:JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}
export async function tenantSubscription(reqData,tenantId,token){
  try{
    const AuthToken = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      "x-access-token": token !="" ? token :localStorage.getItem(WHITE_LABEL_TOKEN)
    };
    console.log(reqData);
    const url = `${BASE_URL1}/api/v1/tenant/subscriptions/${tenantId}`;
    const res = await fetch(url, {method: 'PUT', headers: AuthToken,body:JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);
  }
}




export const getBlogs = async () => {
    try {
        const url = `${BASE_URL1}/api/v1/blogs${getParamTenantId()}`;
        const res = await fetch(url, { headers: AuthToken });
        const result = await res.json();
        return result;
      } catch (err) {
        console.log(err);
      }
};
export const getTenantByWallet = async (address) => {

  try {
      const url = `${BASE_URL1}/api/v1/get-tenant${getParamTenantWalletAddress(address)}`;
      const res = await fetch(url, { headers: AuthToken,method:'GET' });
      const result = await res.json();
      return result;
    } catch (err) {
     return  (err);
    }
};
export const getTenantByStoreName = async (name) => {

  try {
      const url = `${BASE_URL1}/api/v1/get-tenant?storeName=${name}`;
      const res = await fetch(url, { headers: AuthToken,method:'GET' });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
      
    }
};
export const getBlogsId = async (id) => {
  try {
      const url = `${BASE_URL1}/api/v1/blog/${id}${getParamTenantId()}`;
      const res = await fetch(url, { headers: AuthToken });
      const result = await res.json();
      return result;
    } catch (err) {
     console.log(err);
    }
};



