// import { contextType } from "react-swipe";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { httpServiceFileUpload } from "../utility/httpServiceFileUpload";
import axios from "axios";
import { AuthToken } from "./UserAuthToken";
import { WHITE_LABEL_TOKEN } from "../reducers/Constants";
import { getParamTenantId } from "../utility/global";

const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file

export default {
  addIpfs,
  addIpfsObject,
  createNftContent,
  // updateNftContent,
  openForSale,
  removeFromSale,
  ownershipTransfer,
  makeOffer,
  cryptoPrice
};
// export default getCollection;
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    skip: true,
    "Access-Control-Allow-Origin": "*",
    "x-access-token": `${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
    // 'Authorization': `Bearer ${utility.getAccessToken()}`
  };
}

async function addIpfs(requestdata) {
  // let url = "http://localhost:3001" + "/add-file-ipfs";
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-file-ipfs"+getParamTenantId();

  return httpServiceFileUpload(
    httpConstants.METHOD_TYPE.POST,
    {},
    requestdata,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function addIpfsObject(requestdata) {
  // let url = "http://localhost:3001" + "/add-file-ipfs";
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-file-ipfs";

  return httpService(
    httpConstants.METHOD_TYPE.POST,
    false,
    requestdata,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      
      return Promise.resolve(response.responseData);
    
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


// async function createNftContent(requestdata) {
//   let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft";

//   // let url = "http://localhost:3001" + "/add-file-ipfs";
//   // let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-file-ipfs";

//   return httpServiceFileUpload(
//     httpConstants.METHOD_TYPE.POST,
//     {},
//     requestdata,
//     url
//   )
//     .then((response) => {
//       if (
//         !response.success ||
//         response.responseCode !== 200 ||
//         !response.responseData ||
//         response.responseData.length === 0
//       )
//         return Promise.reject(response);
//       return Promise.resolve(response.responseData);
//     })
//     .catch(function (err) {
//       return Promise.reject(err);
//     });
// }
async function cryptoPrice(requestdata){
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/cryptoprice?crypto="+requestdata;
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.GET, headers, {}, url)
  .then((response) => {

    if (!response.success || !response.responseData) return Promise.reject();
    return Promise.resolve(response);
  })
  .catch(function (err) {
    return Promise.reject(err);
  });


}
async function createNftContent(requestdata) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft"+getParamTenantId();
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestdata,
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
// async function updateNftContent(requestData, requestId) {
//   let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + requestId;
//   let headers = getHeaders();
//   return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
//     .then((response) => {
async function openForSale(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/open-for-sale"+getParamTenantId();
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function makeOffer(requestData) {

  
  if(localStorage.getItem('tenantId') != 'null')
    requestData.tenantId=localStorage.getItem('tenantId')
  else
    requestData.tenantId='624fcce73cfee400358f2cef'
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/offers"+getParamTenantId();
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

// ---- nft created by user----

// export async function NftCreatedByUser(requestData) {
//   let url =
//     process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft-createdby-user";
//   let headers = getHeaders();
//   return httpService(httpConstants.METHOD_TYPE.GET, headers, requestData, url)
//     .then((response) => {
//       ("------ssss", response.responseData);

//       if (!response.success || !response.responseData) return Promise.reject();
//       return Promise.resolve(response.responseData);
//     })
//     .catch(function (err) {
//       return Promise.reject(err);
//     });
// }

export const NftCreatedByUser = async (successCallBack, _id) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + _id + "/created"+getParamTenantId();
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false}) //msg: "Unable To Fetch Data" });
    }
  } catch (e) {
    ;
  }
};
// ------nft owned by user
export const NftOwnedByUser = async (successCallBack, _id) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + _id + "/owned"+getParamTenantId();
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false}) //msg: "Unable To Fetch Data" });
    }
  } catch (e) {
    ;
  }
};

export function getNftOwnedByUser(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/nfts/" +
    requestData + "/owned"+getParamTenantId();
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

export function getCollectionOwnedByUser(requestData,walletAddress) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/users/" +
    requestData + "/collections"+getParamTenantId()+"&walletAddress="+walletAddress;
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

//   get liked nfts in profile section

export const NftLikedByUser = async (successCallBack, _id) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + _id + "/liked"+getParamTenantId();
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false})// msg: "Unable To Fetch Data" });
    }

  } catch (e) {
    ;
  }
};

// ---- nft   sale by user
export const NftSellByUser = async (successCallBack, userId) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + userId + "/onsale"+getParamTenantId();
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false}) //msg: "Unable To Fetch Data" });
    }
  } catch (e) {
    ;
  }
};

// =------------------ Get nfts by collection  id----
export const getALLCollectionById = async (id, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE +
      `api/v1/collection/${id}/nfts${getParamTenantId()}`;
    const { data } = await axios.get(url);

    successCallBack(data);
  } catch (e) {
    ;
  }
};
// ----

async function removeFromSale(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/remove-nft-from-sale"+getParamTenantId();
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function ownershipTransfer(requestData, contentId) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/nft/transfer/" +
    contentId + getParamTenantId();
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {
      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export const addSuggestion = async (bodyData, successCallback) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-suggestion" + getParamTenantId();
    const { data } = await axios.post(url, bodyData, { headers: AuthToken });
    if (data.success) {
      successCallback(data.responseData);
    }
  } catch (e) {
    ;
  }
};

export const getAboutData = async (id, successCallBack) => {
  const url = `${dev_url}api/v1/about/61f7b7a4c017de6244c51144${getParamTenantId()}`;
  const { data } = await axios.get(url);

  if (data.success) {
    successCallBack(data.responseData);
  } else {

  }
};

// ---Edit nft
export const EditNft = async (id, reqData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + `api/v1/nfts/${id}${getParamTenantId()}`;
    const { data } = await axios.put(url, reqData, { headers: AuthToken });
    successCallBack(data);
  } catch (e) {
    ;
  }
};
