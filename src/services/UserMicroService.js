import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { BASE_URL, WHITE_LABEL_TOKEN } from "../reducers/Constants";
import axios from "axios";
import { addUseraction, addUserData } from "../reducers/Action";
import { getParamTenantId } from "../utility/global";
const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file
const AuthToken = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    Authorization: `Bearer ${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
  },
};

export const CheckUserByWalletAddress = async (
  walletAddress,
  successCallBack
) => {
  let url = BASE_URL + `/api/v1/wallet-address${getParamTenantId()}`;

  const { data } = await axios.put(
    url,
    { wallet_address: walletAddress }
    // { headers: AuthToken }
  );

  if (data.success) {
    // return data.responseData;
    successCallBack(data.responseData);

    if (walletAddress) localStorage.setItem("has_wallet", true);
    else localStorage.setItem("has_wallet", false);

    // dispatch(addUserData(data.responseData));
  } else {
    // return data;
  }
  // successCallback(data)
  // return httpService(
  //   httpConstants.METHOD_TYPE.PUT,
  //   { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   { wallet_address: walletAddress },
  //   url
  // )
  //   .then((response) => {
  //     (response, "<<<<getting userDAta");
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
};
export const addEmail = async (bodyData, successCallback) => {
  try {
    const url = process.env.REACT_APP_WEBAPP_USER_MICROSERVICE + "api/v1/email" + getParamTenantId();
    const { data } = await axios.post(url, bodyData, { headers: AuthToken });
    if (data.success) {
      successCallback(data.responseData);
    }
  } catch (e) {}
};
export function getUser(requestData) {
  let url =
    process.env.REACT_APP_USER_MICROSERVICE + "api/v1/user/" + requestData;
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

export const getCategories = async (successCallBack) => {
  const url = dev_url + "api/v1/categories" + getParamTenantId();

  const { data } = await axios.get(url, { headers: AuthToken });
  if (data.success && data.responseCode == 200) {
    successCallBack(data);
  } else {
  }
};

export const updateUser = async (userData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_USER_MICROSERVICE + `api/v1/user/${userData._id}${getParamTenantId()}`;
    const { data } = await axios.put(url, { userData }, { headers: AuthToken });
  } catch (e) {}
};

export const updateBannerByUserId = async (
  formData,
  userId,
  successCallBack
) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_USER_MICROSERVICE +
      `api/v1/edit-banner/${userId}${getParamTenantId()}`;
    const { data } = await axios.post(url, formData);
    successCallBack(data);
  } catch (e) {}
};

// for public user-profile

export const userPublicProfile = async (successCallBack, userId) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_USER_MICROSERVICE + "api/v1/users/" + userId + getParamTenantId();

    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false }); //msg: "Unable To Fetch Data" });
    }
  } catch (e) {}
};
