import React, { useEffect, useState } from "react";
import Nav from "./modules/navBar";
import Footer from "./modules/footer";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AddWalletDetails, addUserData } from "../../reducers/Action";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import Utils from "../../utility";
import {
  getTenantByWallet,
  createSubDomain,
  getTenant,
  createSubsription,
} from "../../services/clientConfigMicroService";
import { toast } from "react-toastify";
import { storeConstants } from "../../constants";
import CreateStoreDialog from "./modules/createStoreDialog";
import styled from "styled-components";
import Modal from "react-modal";
import Spinner from "../../common/components/Spinner";

const Div = styled.div`
  text-align: center;
`;
const HomeStore = ({ Element, store }) => {

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "25",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let Newaddress;
  const [tenantData, setTenant] = useState({
    storeName: "",
    wallet: "",
    blockchains: ["Polygon", "Ethereum", "Binance"],
  });
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const tenantWalletAdd=async ()=>{
      if(userData?.length != 0){
        const [error, result] = await Utils.parseResponse(
          getTenantByWallet(tenantData.wallet)
        );
      }
     
    }
    tenantWalletAdd(); 
  }, [userData]);

  useEffect(()=>{
    document.body.className = loader || modal ? "overflow" : "overflow-hidden";
  },[loader,modal])

  const checkTenant = async (address) => {
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(address)
    );
    if (error || !result) {
      setLoader(false);
      return Utils.apiFailureToast("Store not launched.");
    }
    if (!result.success) {
      setLoader(false);
      setModal(true);
    } else if (result.success) {
      setTimeout(() => {
        setLoader(false);
        window.location.replace(result.responseData.siteUrl.split("?")[0]);
      }, 5000);
    }
  };

  const MetaMaskConnector = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoader(true);
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let Newaddress = accounts[0];
        if (!Newaddress || !Newaddress.length) {
          toast.error("Please login to metamask", {
            toastId: "customId",
            theme: "colored",
          });
          return;
        }
        setTenant({ ...tenantData, wallet: Newaddress });

        localStorage.setItem("walletAddress", Newaddress);
        let balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [Newaddress, "latest"],
        });
        const PriceEther = ethers.utils.formatEther(balance);
        dispatch(
          AddWalletDetails({
            Newaddress,
            PriceEther,
          })
        );
        CheckUserByWalletAddress(Newaddress, (res) => {
          dispatch(addUserData(res));
          dispatch({ type: "token", payload: res.token });
          localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
        });
        if (Newaddress) {
          const data = checkTenant(Newaddress);
        }
      } catch (e) {
        toast.error("Please login to metamask", {
          toastId: "customId",
          theme: "colored",
        });
        setModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      toast.error("Please login to metamask", {
        toastId: "customId",
        theme: "colored",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const storeValidation = (storeName) => {
    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
    if (format.test(storeName)) {
      setErrorMsg("(No Special Character Allowed.)");
      return false;
    } else if (storeName.length === 0) {
      setErrorMsg("Store Name is required.");
      return false;
    } else if (storeName.length < 3) {
      setErrorMsg("Store Name should be atleast 3 characters.");
      return false;
    } else if (storeName.length > 25) {
      setErrorMsg("Store Name cannot be grater than 25 characters.");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  const createStore = async () => {
    let validation = storeValidation(tenantData.storeName);
    if (validation) {
      setLoader(true);
      const [error, result] = await Utils.parseResponse(getTenant(tenantData));
      if (result.responseCode === 403) {
        setLoader(false);
        // Utils.apiFailureToast(storeConstants.ALREADY_EXIST_STORE_NAME );
        setErrorMsg(storeConstants.ALREADY_EXIST_STORE_NAME);
      } else if (result.success) {
        await createDomain(result);
      }
    }
  };

  const createDomain = async (result) => {
    let requestData = {
      subdomain: tenantData.storeName,
      tenantId: result.responseData._id,
    };
    const [errorDomain, domainResult] = await Utils.parseResponse(
      createSubDomain(requestData)
    );

    if (domainResult.responseCode === 403) {
      setLoader(false);
      setModal(true);
      // Utils.apiFailureToast(storeConstants.ALREADY_EXIST_STORE_NAME);
      setErrorMsg(storeConstants.ALREADY_EXIST_STORE_NAME);
    } else if (domainResult.success) {
      let subreqData = {
        planName: "Free",
        billingCycle: "monthly",
        price: 0,
        tenantId: domainResult.responseData?._id,
        walletAddress: domainResult?.responseData?.wallet,
        features: [
          "Admin Portal",
          "Multiple Blockchain Support",
          "Multi File Formats",
          "Filter And Ranking",
          "Lazy Minting",
          "Social Media Sharing",
        ],
      };
      const [error, result] = await Utils.parseResponse(
        createSubsription(subreqData)
      );

      if (error || !result) {
        Utils.apiFailureToast(error);
        setLoader(false);
        setModal(false);
        return;
      } else if (result.responseCode === 403) {
        Utils.apiFailureToast(result.message);
        setLoader(false);
        setModal(false);
        return;
      } else {
        setModal(false);
        setUserData(domainResult?.responseData);
        setTimeout(() => {
          setLoader(false);
          window.location.replace(
            domainResult?.responseData?.siteUrl?.split("?")[0]
          );
        }, 5000);
      }
    }
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value.trim().replaceAll(" ", "");

    setTenant({
      ...tenantData,
      storeName: value,
    });
    setErrorMsg("");
  };

  return (
    <div className="storeDiv">
      <Modal isOpen={loader} style={customStyles} onRequestClose={!loader}>
        <Div>
          <Spinner />
          <p>Processing Please Wait...</p>
        </Div>
      </Modal>

      <Nav MetaMaskConnector={MetaMaskConnector} setModal={setModal} />
      
      {store ? (
        <Element MetaMaskConnector={MetaMaskConnector} setModal={setModal} /> //create-store 
      ) : (
        <Element /> //other components
      )}
    <Footer MetaMaskConnector={MetaMaskConnector} />

      <CreateStoreDialog
        setModal={setModal}
        modal={modal}
        tenantData={tenantData}
        handleInputChange={handleInputChange}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        createStore={createStore}
        setTenant={setTenant}
      />
    </div>
  );
};

export default HomeStore;
