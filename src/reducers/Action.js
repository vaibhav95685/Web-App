// const ACTION={
//     USER_LOGGED_IN:"USER_LOGGED_IN",
//     CLOUDINARY_IMAGE:"CLOUDINARY_IMAGE",
//     SEARCH_POST:"SEARCH_POST",
//     CHALLENGE_POST:"CHALLENGE_POST",
//     COMMUNITY_POST:"COMMUNITY_POST",
//     COMMUNITY:"COMMUNITY"
// }

// export default ACTION

import {
  BASE_URL,
  ADD_WALLET,
  OPEN_NOTIFICATION,
  LOGGED_IN_UER_DETAILS,
  OPEN_WALLET,
  USER_DETAILS,
  REDIRECT_URL,
  SEARCH_FROM_NAV,
  LOG_OUT,
  WHITE_LABEL_TOKEN
} from "./Constants";
import { ADD_USER, GET_ERRORS, ALL_USERS } from "./Constants";
import axios from "axios";
import { ethers } from "ethers";
import { getTenantData } from "../services/clientConfigMicroService";

export const addUseraction = (data) => (dispatch) => {
  axios
    .post(BASE_URL + `/api/v1/user`, data)
    .then((response) => {
      if (response.data.responseCode === 200) {
        dispatch({
          type: ADD_USER,
          payload: response,
        });
      }
      if (
        response.data.responseCode === 400 ||
        response.data.responseCode === 403
      ) {
        dispatch({
          type: GET_ERRORS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      if (error && error.responseCode && error.responseCode === 403) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      }
    });
};
export const AddWalletDetails = (data) => (dispatch) => {
  if (localStorage.getItem(WHITE_LABEL_TOKEN) !== null) {
    dispatch({ type: ADD_WALLET, payload: data });
  }
};

export const addUserData = (data) => (dispatch) => {
  dispatch({ type: LOGGED_IN_UER_DETAILS, payload: data });

  // Fetch Tenent data
  // getTenantData(data.token, data.wallet_address)
  //   .then(response => {
  //     dispatch({ type: 'ADD_CUSTOMIZE_DATA', payload: response[0] })
  //   })
  //   .catch(error => {

  //   })

  let address = data.wallet_address;

  window.ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  }).then((wallet_balance) => {
    const balance = ethers.utils.formatEther(wallet_balance);
    dispatch(
      AddWalletDetails({
        address,
        balance,
      })
    );
  })
};

export const allUseraction = () => (dispatch) => {
  axios
    .get(BASE_URL + `/api/v1/users`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: ALL_USERS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      if (error && error.response && error.responseCode === 404) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      }
    });
};

export const RedirectTo = (data) => (dispatch) => {
  dispatch({ type: REDIRECT_URL, payload: data });
};
export const ManageNotiSideBar = (data) => (dispatch) => {
  // alert("manage noti");
  dispatch({ type: OPEN_NOTIFICATION, payload: data });
};
export const ManageWalletSideBar = (data) => (dispatch) => {
  // alert("manageNotiWallet");
  dispatch({ type: OPEN_WALLET, payload: data });
};

export const searchNav = (data) => (dispatch) => {
  dispatch({ type: SEARCH_FROM_NAV, payload: data });
};

export const logOut = () => (dispatch) => new Promise((resolve, refect) => {
  dispatch({ type: LOG_OUT });
  dispatch({ type: OPEN_WALLET, payload: false })
  // dispatch({type: 'RESET_APPEARENCE'})

  localStorage.removeItem(WHITE_LABEL_TOKEN);
  localStorage.setItem('has_wallet', false)

  resolve(true);
});