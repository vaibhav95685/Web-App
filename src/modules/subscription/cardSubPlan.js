import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import PaymentSelection from "./modules/paymentSelection";
import Paypal from "./modules/payPal";
import RazorPay from "./modules/razorPay";

const CardPlan = ({ subscriptionData, loader,currentPlan,setPlanUpgrade,planUpgrade }) => {
  const { user } = useSelector((state) => state);
  const [display, setDisplay] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showPaypal, setShowPayPal] = useState(false);
  const [razorPay, setRazorPay] = useState(false);

  const handleClick = (data) => {
    setModalData(data);
    setDisplay(true);
  };

  const payPalPaymentHandler = (order) => {
    console.log(order);
  };



  useEffect(() => {
    document.body.className =
      showPaypal || display ? "overflow" : "overflow-hidden";
  }, [showPaypal, display]);

  const current=subscriptionData.planName === currentPlan?.planName ? true :false;

  return (
    <>
      <div>
        {display === true ? (
          <PaymentSelection
            item={modalData}
            setDisplay={setDisplay}
            setShowPayPal={setShowPayPal}
            setRazorPay={setRazorPay}
          />
        ) : (
          ""
        )}
        {showPaypal === true ? (
          <Paypal
            showPaypal={showPaypal}
            setShowPayPal={setShowPayPal}
            payPalPaymentHandler={payPalPaymentHandler}
            price={subscriptionData.price}
          />
        ) : (
          ""
        )}
        {razorPay ? (
          <RazorPay
           setRazorPay={setRazorPay} 
           item={subscriptionData} 
           setPlanUpgrade={setPlanUpgrade} 
           planUpgrade={planUpgrade} />
        ) : (
          ""
        )}

        <div
          //to="/"
          className="plansEach"
        >
          <div className="plansEachCircle"></div>
          <div className="plansHeading">
            {subscriptionData.planName}
          </div>
          <div className="plansHeading2">
            ${subscriptionData.price}/{subscriptionData.billingCycle}
          </div>
          <div
            className={ current ? "chooseplanButtonWhite" :( subscriptionData.planName==="Free Forever" ? "":"chooseplanButton")}
            onClick={() =>`${current ? "" :handleClick(subscriptionData)}` }
          >
              {current   ? "current" :(subscriptionData.planName==="Free Forever" ?"":"upgrade")}
          </div>

          <div className="planFeature">
            <div className="NFTCollection">
              { subscriptionData.NFTCollection}
            </div>
            <div className="planTitle">
              { subscriptionData.planTitle}
            </div>
            <ul className="ulDes">
              {subscriptionData?.feature?.map((ele) => (
                <li className="DescriptionPlan">
                  <span class="BlueCircle"></span>
                  { ele}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPlan;
