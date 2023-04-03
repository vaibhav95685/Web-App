import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { BASE_URL } from "../reducers/Constants";
import axios from "axios";
import { AuthToken } from "./UserAuthToken";
import { duration } from "moment";
import { getParamTenantId } from "../utility/global";

export function getNfts(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts"+ getParamTenantId()+ "&" + requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      // (response, "<<<< response");
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

// --------------------get nfts -----
export const getNFtsData = async (id,filterObj, successCallBack) => {
  try {
    const url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/?id="+id;
    const { data } = await axios.get(url, { params: filterObj });
    successCallBack(data);
  } catch (e) {

  }
};
export const getnftHome=async (id,filterobj)=>{
  let url=process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/?id="+id;
  return httpService(
      httpConstants.METHOD_TYPE.GET,
      { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON },
      filterobj,
      url
    )
    .then(response => {
      if (
        !response.success ||
        response.responseCode != 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
// --------

export const getNft = async (requestData, successCallBack) => {
  // alert("clled getNft")
  // (req)
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v2/nfts/" + requestData + getParamTenantId();
  const { data } = await axios.get(url, { headers: AuthToken });
  if (data) {
    successCallBack(data);
  } else {

  }
  // return httpService(
  //   httpConstants.METHOD_TYPE.GET,
  //   { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   {},
  //   url
  // )
  // .then(response => {
  //   if (
  //     !response.success ||
  //     response.responseCode != 200 ||
  //     !response.responseData ||
  //     response.responseData.length === 0
  //   )
  //     return Promise.reject();
  //   return Promise.resolve(response.responseData);
  // })
  // .catch(function (err) {
  //   return Promise.reject(err);
  // });
};

export function getCollections(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collections"+ getParamTenantId()+'&' +
    requestData;
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
        !response.responseData
        // response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getCollection(requestData, successCallBack) {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/collection/" + requestData + getParamTenantId();
    const { data } = await axios.get(url);
    successCallBack(data);
  } catch (e) {
    
  }
  // let url =
  //   process.env.REACT_APP_WEBAPP_MICROSERVICE +
  //   "api/v1/collection/" +
  //   requestData;
  // return httpService(
  //   httpConstants.METHOD_TYPE.GET,
  //   // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   AuthToken,
  //   {},
  //   url
  // )
  //   .then((response) => {
  //     if (
  //       !response.success ||
  //       response.responseCode !== 200 ||
  //       !response.responseData ||
  //       response.responseData.length === 0
  //     )
  //       return Promise.reject();
  //     return Promise.resolve(response.responseData);
  //   })
  //   .catch(function (err) {
  //     return Promise.reject(err);
  //   });
}

export function getNftsByCollectionId(id, requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collection/" +
    id +
    "/nfts" + getParamTenantId() +"&" +
    requestData;
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
export function getTopNftSales(duration, requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/get-top-nfts"+ getParamTenantId()+ "&" +
    duration;
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
        !response.responseData
        // response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getNameImageOfUser(_id) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/user/${_id}${getParamTenantId()}`);
    const result = await res.json();
    const user = result.responseData;
    return {
      name: user.firstName + " " + user.lastName,
      imageUrl: user.cdnUrl,
    };
  } catch (err) {
    return err;
  }
}
export function getNotificationListById(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/notification/" +
    requestData + getParamTenantId();
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

export function getNotificationCountById(_id) {
  // (notificationId,"sachin1111")
  let url =
  process.env.REACT_APP_WEBAPP_MICROSERVICE + `api/v1/notification/${_id}/read${getParamTenantId}`;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    {id: _id},
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

export const addNftReport = async (requestData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/reports/nfts"+getParamTenantId();
    const { data } = await axios.post(url, requestData);
    successCallBack(data);
  } catch (e) {
    
  }
};

export const addCollectionReport = async (requestData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/reported/collection" + getParamTenantId();
    const { data } = await axios.post(url, requestData);
    successCallBack(data);
  } catch (e) {
    
  }
};

// export const getNotificationListById = async () => {
//   try {
//     const res = await fetch(
//       `${BASE_URL2}/api/v1/notification/6210ce09e9384c0035598c31`
//     );
//     const result = await res.json();
//     const collectionData = result.responseData;
//     return collectionData;
//   } catch (err) {
//     (err);
//   }
// };

export function addLikeNft(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft/like" + getParamTenantId();
  return httpService(
    httpConstants.METHOD_TYPE.POST,
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

export function getPricingHistory(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/pricing-history"+ getParamTenantId() + '&' +
    requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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
export function updateCollectionTxStatus(requestData, _id) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collections/" +
    _id +
    "/status"+getParamTenantId();

  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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

export function getActivities(reqObj, id) {

  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    `api/v1/activities/${id}${getParamTenantId()}&type=${reqObj}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    reqObj,
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

export function getList(reqType, id) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    `api/v1/activities/${id}${getParamTenantId()}&` +
    "type=" +
    "list";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    reqType,
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
