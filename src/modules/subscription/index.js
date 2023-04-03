import React, { useState,useEffect } from "react";
import "../../assets/styles/nftReportModal.css";
import "../../assets/styles/billing.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility";
import {
  getSubscription,
  getSubscriptionPlan
} from "../../services/clientConfigMicroService";
import { sessionManager } from "../../managers/sessionManager";
import CardSubPlan from "./cardSubPlan";
import Skelton from "./modules/skeltonCard"

const Modal = styled.div`
  position: absolute;
  background-color: white;
  opacity: 1 !important;
  top: 79px;
  /* width: 69.74%; */
  height: fit-content;
  border-radius: 13px;
`;
const ModalInner = styled.div`
  opacity: 1;
  margin: auto;
  opacity: 1;
  width: 100%;
  padding: 32px 32px 63px 32px;
`;


const UpgradePlan = (props) => {
  const [modal, setModal] = useState(false);
  const [planUpgrade,setPlanUpgrade]=useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
   const { user ,customize} = useSelector((state) => state);
  const [currentPlan,setCurrentPlan]=useState({});
  const dispatch=useDispatch();
  



  useEffect(()=>{
    const getSubData=async ()=>{
      if(user?.token!=""){
        const [error,result]=await Utils.parseResponse(
          getSubscription("monthly",user?.token)
        );
        const [err,res]=await Utils.parseResponse(
          getSubscription("Yearly",user?.token)
        );
    
        if(res.responsecode ||result.responsecode===403){
          Utils.apiFailureToast("Subscription Data Not Load")
        }
        else{
          dispatch({type:"SubscriptionMonthlyData", payload:result.responseData})
          dispatch({type:"SubscriptionYearlyData", payload:res.responseData.reverse()})
        }
      }
    }
    getSubData();
     
  },[customize.id,user?.token,billingPeriod])

  useEffect(()=>{
    const getCurrentPlan=async ()=>{
      if(customize?.id){
        const [subError ,subscriptionUser]=await Utils.parseResponse(
          getSubscriptionPlan(customize?.id)
        )
        if(subscriptionUser?.responseCode !== 200){
        console.log(subscriptionUser?.message);
        }
        else {
          setCurrentPlan(subscriptionUser?.responseData);
        } 
      }
    }
    getCurrentPlan();
  },[planUpgrade,customize.id])

  return (
    <>    
    <div
      className="report-outer"
      style={{ display: `${props?.Modal ? "block" : "none"}` }}
    >
      <div className="report-abs-modal">
        <Modal>
          <ModalInner>
            <div
              className="reportthisitem"
              style={{
                paddingTop:"0px",
                marginBottom:"24px"
              }}
            >
              <h3 className="upgrade">Upgrade Your Plan</h3>
              <i
                className="fa-solid fa-xmark cross-icon"
                onClick={() => props?.setModal(false)}
              ></i>

            </div>
            {/* <button onClick={()=>displayRazorPay()}>Razor Pay</button> */}
            <div className="billingPeriodContainer">
              <div
                onClick={() => {
                  setBillingPeriod("monthly");
                }}
                className={`billingPeriod ${
                  billingPeriod === "monthly" && "billingPeriod--active"
                }`}
              >
                Monthly
              </div>

            
              <div
                // className='billingPeriod'
                onClick={() => {
                  setBillingPeriod("Yearly");
                }}
                className={`billingPeriod ${
                  billingPeriod === "Yearly" && "billingPeriod--active"
                }`}
              >
                Annual
              </div>
            </div>
            {billingPeriod === "monthly" ? (
              <>
              <div className="plansContainer">
                {user?.SubscriptionMonthlyData?.map((item, key) => {
                  return (
                  <CardSubPlan 
                   subscriptionData={item}  
                   currentPlan={currentPlan} 
                   setPlanUpgrade={setPlanUpgrade} 
                   planUpgrade={planUpgrade} />
                  );
                })}
                 </div>
               <div className="plansContainer">
                  {user?.SubscriptionMonthlyData?.length == 0 && (
                    <> 
                   <Skelton />
                   <Skelton />
                   <Skelton />
                   <Skelton />
                   </>
                  )}
                </div>
                </>
            ) : (
              <>
              <div className="plansContainer">
                 {user?.SubscriptionYearlyData?.map((item, key) => {
                  return (
                    <CardSubPlan
                     subscriptionData={item}
                     
                    />
                  );
                 })}
                 </div>
               <div className="plansContainer">
                  {user?.SubscriptionYearlyData?.length == 0 && (
                    <>
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  <Skelton />
                  </>
                  )}
              </div>
              </>
            )}
          </ModalInner>
        </Modal>
      </div>
    </div>
    </>

  );
};

export default UpgradePlan;
