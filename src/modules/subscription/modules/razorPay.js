import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTranscationSuccess,
  addTranscationFailure,
  updateSub,
  tenantSub,
} from "./subscriptionApi";
import Utils from "../../../utility";
import styled from "styled-components";
import Spinner from "../../../common/components/Spinner";
import Modal from "react-modal";

const Div = styled.div`
  text-align: center;
`;

const RazorPay = ({ setRazorPay, item ,setPlanUpgrade,planUpgrade}) => {
  const { user, customize } = useSelector((state) => state);
  const [loaderState, setLoaderState] = useState(false);

  useEffect(() => {
    setRazorPay(false);
    
    const loadRazorPay = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject();
        };
      });
    };

    const razor = async () => {
      const displayRazorPay = async () => {
        try {
          await loadRazorPay();

          const options = {
            key: process.env.REACT_APP_RAZOR_PAY_ID,
            amount: item.price * 100 * 78, //price pending
            currency: "INR",
            name: customize.storeName,
            description: "",
            image: customize.storeLogo,
            handler: async (response) => {
              if (response.status_code == 200) {
                await addTranscationSuccess(item, customize);
                await updateSub(response, item, customize, user);
                await tenantSub(item, customize, user);
              } else {
                await addTranscationFailure(item, customize);
                 Utils.apiFailureToast("Subscription Failed");
                 return ;
              }
              Utils.apiSuccessToast("Subscription Updated");
              setPlanUpgrade(!planUpgrade);
            },
            theme: {
              color: "#4c84ff",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } catch (err) {
          //Utils.apiFailureToast("Transcation Failure");
        }
      };
      await displayRazorPay();
    };

    razor();
  }, [setRazorPay, item.price]);

  useEffect(() => {
    document.body.className = loaderState ? "overflow" : "overflow-hidden";
  }, [loaderState]);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "1005",
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

  return (
    <Modal isOpen={loaderState} style={customStyles}>
      <Div>
        <Spinner />
        <p>Processing Please Wait...</p>
      </Div>
    </Modal>
  );
};

export default RazorPay;
