import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTenantByStoreName } from "../../../services/clientConfigMicroService";
import Utils from "../../../utility";
import CheckIcon from "../../../assets/images/checkCircle.svg";
import {
  BsChevronLeft,
} from "react-icons/bs";

const OuterDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.display ? "block" : "none")};
  top: 0%;
  left: 0%;
  z-index: 20;

`;
const PopModalDiv = styled.div`
  position: fixed;
  overflow: auto;
  display: grid;
  z-index: 101;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100vw;
  inset: 0 0 0 0;

  @media screen and (max-width:600px) {
    top: 71px;
    position: absolute;
  }


`;
const ChildDiv = styled.div`
  width: 576px;
  background: #031527 0% 0% no-repeat padding-box;
  padding: 33px 32px 59px 32px;
  border-radius: 12px;
  @media screen and (max-width:600px) {
    position: absolute;
    width: 100vw;
    top: 0px;
    height: 100%;
    padding: 16px 16px;
  }


  
`;
const StoreCheck = styled.div`
  font: normal normal normal 12px/18px Poppins;
  letter-spacing: 0px;
  color: ${(props) => props.color};
`;

const AddressContainer = styled.div`
  margin-bottom: 32px;
  margin-top: 24px;
`;
const MobCommonContainer = styled.div`
  margin-bottom: 8px;
`;
const InputMobDiv = styled.div`
  background: #253c54 0% 0% no-repeat padding-box;
  border: 1px solid #00af51;
  border-radius: 6px;
  height: 40px;
  width: 400px;
  margin-top: 8px;
  display: flex;
  padding-right: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width:600px) {
    width: 100%;
  }
`;
const MobInputField = styled.input`
  width: 90%;
  background: #253c54 0% 0% no-repeat padding-box;
  font: normal normal normal 14px/21px Poppins;
  padding-left: 12px;
  color: #e8e8e8;
  height: 100%;
  outline: none;
  border: none;
  @media only screen and (max-width: 375px) {
    font: normal normal normal 3.6vw/21px Poppins;
  }
`;
const DefaultText = styled.label`
  margin-top: 16px;
  font: normal normal normal 12px/18px Poppins;
  color: #e8e8e8;
`;
const MobCreateStore = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font: normal normal medium 16px/25px Poppins;
  color: #031527;
  margin-top: 20px;
`;
const TitleText = styled.label`
font: normal normal 600 18px/27px Poppins;
letter-spacing: 0px;
color: #FFFFFF;

`;

const CommonMobText = styled.label`
  font: normal normal normal 16px/25px Poppins;
  color: #ffffff;
`;
const WalletMobText = styled.div`
  font: normal normal normal 14px/21px Poppins;
  color: #e8e8e8;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  height: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width:375px) {
    font: normal normal normal 3.6vw/21px Poppins;
  }
`;
const LaunchStoreContanier = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width:600px) {
    justify-content: flex-start;
    gap: 16px;

  }
`;
const UrlText=styled.label`
font: normal normal normal 14px/21px Poppins;
color: #E8E8E8;
@media screen and (max-width:600px) {
  display: none;
}
`;
const StoreContainer=styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
gap: 8px;
`;

const CrossIcon=styled.span`
  @media only screen and (max-width:600px) {
    display: none;
  }
`;
const MobBack=styled.span`
display: none;
  @media only screen and (max-width:600px) {
    display: block;
  }
`;
const CreateStoreDialog = ({
  handleInputChange,
  createStore,
  errorMsg,
  setErrorMsg,
  modal,
  setModal,
  tenantData,
}) => {
  const [checkStore, setCheckStore] = useState(null);

  useEffect(() => {
    const checkStore = async () => {
      if (tenantData.storeName?.length > 2) {
        const [error, result] = await Utils.parseResponse(
          getTenantByStoreName(tenantData.storeName)
        );
        if (result.success) {
          setCheckStore(false);
        } else {
          setCheckStore(true);
        }
      } else {
        setCheckStore(false);
      }
    };
    checkStore();
  }, [tenantData.storeName]);

  return (
    <OuterDiv display={modal}>
      <PopModalDiv>
        <ChildDiv>
          <LaunchStoreContanier>
            <MobBack>
            <BsChevronLeft
            style={{ color: "white", width: "21px", height: "21px" }}
            onClick={() => setModal(false)}
            />

            </MobBack>
          
            <TitleText>Launch Store for free</TitleText>
            
            <CrossIcon>
            <i
              className="fa-solid fa-xmark cross-icon"
              onClick={() => {
                setModal(false);
                setErrorMsg("");
              }} ></i>

            </CrossIcon>
          </LaunchStoreContanier>

          <AddressContainer>
            <CommonMobText>Your Address </CommonMobText>
            <InputMobDiv>
            <MobInputField
                value={tenantData.wallet}
                disabled={true}
               
              />
              {tenantData?.wallet !== "" ? (
                <img src={CheckIcon} alt="" className="" />
              ) : (
                ""
              )}
            </InputMobDiv>
          </AddressContainer>

          <MobCommonContainer>
            <CommonMobText>Your Store/MarketPlace name </CommonMobText>
            
            <StoreContainer>
            <InputMobDiv>
              <MobInputField
                value={tenantData.storeName}
                onChange={(e) => handleInputChange(e)}
              />
              {checkStore && tenantData?.storeName?.length > 2 ? (
                <img src={CheckIcon} alt="" className="" />
              ) : (
                ""
              )}
            </InputMobDiv>
            <UrlText>.NFTinger.com</UrlText>
            </StoreContainer>
            {errorMsg && (
              <label className="lastLabel color-red">
                <p>
                  {errorMsg}&nbsp;
                  <a href="https://market.nftinger.com/">
                    https://market.nftinger.com/
                  </a>
                </p>
              </label>
            )}
          </MobCommonContainer>
          <StoreCheck color={checkStore ? "#17af51" : "red"}>
            {checkStore && tenantData?.storeName?.length > 2 ? (
              <> Name available for store</>
            ) : !checkStore && tenantData?.storeName?.length > 2 ? (
              <> Name not available for store</>
            ) : (
              ""
            )}
          </StoreCheck>

          <DefaultText>
            This is the url your customer will use to visit the store/
            marketplace
          </DefaultText>

          <MobCreateStore
          onClick={createStore}
          disabled={errorMsg?.length > 0 ? true : false}
        >
          Create Store
        </MobCreateStore>

        </ChildDiv>
      </PopModalDiv>
    </OuterDiv>
  );
};

export default CreateStoreDialog;
