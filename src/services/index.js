/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */
//export all services from index file -

import { httpConstants } from "../constants";
import { BASE_URL, BASE_URL2 } from "../reducers/Constants";
import { getParamTenantId } from "../utility/global";
import { WHITE_LABEL_TOKEN } from "../reducers/Constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";

// export * from './user'

export const addWalletAddress = async (wallet_address) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/wallet-address`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address,
      }),
    });
    const result = await res.json();
    const user = result.responseData;
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (data, userId,token) => {
  try {
     const AuthToken = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      "x-access-token": `${token!="" ? token:localStorage.getItem(WHITE_LABEL_TOKEN)}`,
    };
    const res = await fetch(`${BASE_URL}/api/v1/user/${userId}${getParamTenantId()}`, {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: AuthToken,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

// export {​​​​​​ default as ContentService }​​​​​​ from "./contentMicroservice";
// export {​​​​​​ default as BlockchainService }​​​​​​ from "./blockchainService";
