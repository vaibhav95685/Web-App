import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import OwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import { getParamTenantId } from "../../../utility/global";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getNFtsData } from "../../../services/webappMicroservice";
import Spinner from "../../../common/components/Spinner";
import Admin from "../../../assets/images/Admin.png";
import Ball from "../../../assets/images/Ball.svg";
import BannerImage from "../../../assets/images/BannerImage.svg";
import Bear from "../../../assets/images/Bear.png";
import BinanceBlockchain from "../../../assets/images/BinanceBlockchain.svg";
import CardImg from "../../../assets/images/Cards.svg";
import Collectivables from "../../../assets/images/Collectivables.svg";
import CrossChain from "../../../assets/images/CrossChain.svg";
import Customer from "../../../assets/images/Customer.svg";
import customisable from "../../../assets/images/custom.svg";
import Ethereum from "../../../assets/images/Ethereum.png";
import infrastructure from "../../../assets/images/infrastructure.svg";
import invisible from "../../../assets/images/invisible.png";
import marketplace from "../../../assets/images/marketplace.png";
import MetaFox from "../../../assets/images/MetaFox.png";
import Music from "../../../assets/images/Music.svg";
import NFTBuying from "../../../assets/images/NFTBuying.png";
import Paint from "../../../assets/images/Paint.svg";
import Polygon from "../../../assets/images/Polygon.svg";
import Security from "../../../assets/images/Security.svg";
import StepGrowth from "../../../assets/images/StepGrowth.svg";
import StepStore from "../../../assets/images/StepStore.png";
import StepWallet from "../../../assets/images/StepWallet.svg";
import StoreApi from "../../../assets/images/StoreApi.svg";
import StoreFrontSetting from "../../../assets/images/StoreFrontSetting.svg";
import Utility from "../../../assets/images/Utility.svg";
import WarriorMonk from "../../../assets/images/WarriorMonk.png";
import Water from "../../../assets/images/Water.png";
import NFTinger from "../../../assets/images/NFTinger.svg";
import NFTingerLogo from "../../../assets/images/NFTingerLogo.svg";
import HamburgerMenu from "../../../assets/images/IconFeatherMenu.svg";

import {
  AddWalletDetails,
  addUserData,
} from "../../../reducers/Action";
import { CheckUserByWalletAddress } from "../../../services/UserMicroService";
import Utils from "../../../utility";
import {
  getTenantByWallet,
  createSubDomain,
  getTenant,
  createSubsription,
} from "../../../services/clientConfigMicroService";
import { storeConstants } from "../../../constants";

const MainDiv = styled.div`
  background: #031527 0% 0% no-repeat padding-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 1 0%;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CommonSection = styled.div`
  margin-top: 154px;
  margin-bottom: ${(props) => props.marginBottom};
  @media only screen  and (max-width: 767px) {
    margin-top: ${(props) => props.marginTop};
    width: ${(props) => props.width};
    margin-bottom: ${(props) => props.mobMarginBottom};
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: ${(props) => props.tabWidth};
  }
`;

const Image = styled.img`
  width: ${(props) => props.originalWidth};
  height: ${(props) => props.originalHeight};
  @media only screen  and (max-width: 767px) {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: ${(props) => props.tabWidth};
    height: ${(props) => props.tabHeight};
  }
`;

const BottomSection = styled.div`
  width: 100%;
  height: auto;
  background: #031527 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  margin-top: 70px;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    margin-top: 54px;
    font: normal normal 600 24px/35px Poppins;
    letter-spacing: 0px;
    opacity: 1;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal 600 32px/48px Poppins;
    text-align: center;
    margin-top: 69px;
  }
`;

const CardDiv = styled.div`
  width: 16.9vw;
  height: 381px;
  /* UI Properties */
  background: #253c54 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  display: flex;
  @media only screen  and (max-width: 767px) {
    width: 100%;
    margin-top: 24px;
    height: 331px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 46.8%;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;
  @media only screen  and (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    justify-content: flex-start;
  }
`;
const MainCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 123%;
  margin-top: 67px;
  @media only screen  and (max-width: 767px) {
    flex-direction: column;
    width: 91.5%;
    margin-top: 28px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-wrap: wrap;
    /* width: 90.15%; */
    width: 90.15%;
    & > :nth-child(odd) {
      margin-right: 2.75em;
    }
    & > :nth-last-child(-n + 2) {
      margin-top: 41px;
    }
  }
`;
const Title = styled.label`
  text-align: center;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    font: normal normal 600 16px/25px Poppins;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal 600 18px/27px Poppins;
  }
`;
const SubTitle = styled.label`
  text-align: center;
  font: normal normal normal 0.95vw/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  opacity: 1;
  margin-top: 1rem;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    font: normal normal normal 16px/24px Poppins;
    letter-spacing: 0px;
    color: #f0f0f0;
    opacity: 1;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal normal 18px/32px Poppins;
  }
`;

const HeadTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CommonText = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  margin-bottom: ${(props) => props.marginBottom};
  @media only screen  and (max-width: 767px) {
    text-align: center;
    font: normal normal 600 24px/32px Poppins;
    margin-bottom: ${(props) => props.marginTop};
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal 600 32px/48px Poppins;
    // margin-bottom: -100px;
  }
`;
const TitleSecond = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  width:80%;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    font: normal normal 600 24px/32px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal 600 32px/48px Poppins;
  }
`;
const ExperienceText = styled.label`
  text-align: center;
  margin-top: 2.65rem;
  margin-bottom: 6.42rem;
  font: normal normal normal 22px/33px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    font: normal normal normal 16px/24px Poppins;
    margin: 2rem 0rem;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal normal 22px/33px Poppins;
    margin-top:24px;
    margin-bottom:32px;
  }
  @media only screen  and (max-width: 1024px) {
    width: 80%;
  }
`;

const OfferCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 98px;
  @media only screen  and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    display: grid;
    gap: 30px 30px;
    grid-template-columns: auto auto;
    & > :last-child {
      margin-right: 0;
    }
    /* & >:nth-child(3n+3) { margin-right: 0; } */
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    justify-content: center;
    align-items: center;
    margin-top: 11px;
    display: grid;
    gap: 48px 97px;
    grid-template-columns: auto auto auto;

    & > :last-child {
      /* margin-right: 0; */
    }
    /* & > :nth-child(3n+3) { margin-right: 0; } */
  }
`;
const OfferCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  margin-right: 6.07rem;
   margin-right: 6.07rem; 
  height: 150px;
  background: #19293a 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  margin-top: 20px;
  @media only screen  and (max-width: 767px) {
     margin-right: 0px; 
    margin-top: 30px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
     margin-right: 0px; 
    margin-top: 48px;
  }
`;
const OfferName = styled.label`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  margin-top: 1.5rem;
  color: #e8e8e8;
  opacity: 1;
`;

const BlockchainSection = styled.div`
  background: #19293a 0% 0% no-repeat padding-box;
  margin-top: 321px;
  opacity: 1;
  width: 100%;
  height: 690px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen  and (max-width: 767px) {
    margin-top: 31.08px;
    justify-content: flex-start;
    padding: 24px 27px 0px 28px;
    height: 345px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 78px;
    justify-content: flex-start;
    padding: 46px 43px 0px 43px;
    height: 517px;
  }
`;
const BlockchainsDiv = styled.div`
  margin-top: 95px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  @media only screen  and (max-width: 767px) {
    margin-top: 75px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 59px;
  }
`;
const Blockchain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BlockchainText = styled.div`
  text-align: left;
  margin-top: 32px;
  font: normal normal 600 22px/32px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    font: normal normal 600 16px/32px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal 600 22px/32px Poppins;
  }
`;
const StoreFrontPage = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 95px;
  @media only screen  and (max-width: 767px) {
    flex-direction: column;
    width: 90%;
    margin-top: 12px;
  }
`;
const StoreFrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20%;
  @media only screen  and (max-width: 767px) {
    width: 100%;
    margin-top: 26px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 26.1%;
  }
`;
const StoreFrontName = styled.label`
  text-align: center;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    font: normal normal 600 16px/25px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal 600 18px/27px Poppins;
    text-align: left;
  }
`;
const DesStoreFrontDiv = styled.label`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    font: normal normal normal 16px/24px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: left;
    font: normal normal normal 18px/27px Poppins;
    letter-spacing: 0px;
    color: #e8e8e8;
    opacity: 1;
  }
`;
const StoreButton = styled.button`
  margin-top: 92px;
  background: #016dd9 0% 0% no-repeat padding-box;
  border-radius: 12px;
  border: none;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 216px;
  height: 54px;
  font: normal normal medium 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  &:hover {
    background: white 0% 0% no-repeat padding-box;
    color: blue;
  }
  @media only screen  and (max-width: 767px) {
    width: 242px;
    height: 40px;
    margin-top: 32px;
  }
`;
const StepDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 149px;
  @media only screen  and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    margin-top: 55px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const StepDivSecond = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-top: 149px;
  @media only screen  and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const StepImageDiv = styled.div`
  margin-right: 150px;
  @media only screen  and (max-width: 767px) {
    margin-right: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-right: 0;
  }
`;
const StepDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 43px;
  @media only screen  and (max-width: 767px) {
    align-items: center;
  }
`;
const StepTitle = styled.label`
  text-align: center;
  font: normal normal 600 40px/60px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    font: normal normal 600 16px/25px Poppins;
    color: #f0f0f0;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal 600 40px/60px Poppins;
  }
`;
const StepDes = styled.label`
  text-align: left;
  font: normal normal normal 22px/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  margin-top: 38px;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    text-align: center;
    margin-top: ${(props) => props.marginTop};
    font: normal normal normal 16px/24px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal normal 22px/32px Poppins;
  }
`;

const StepCreateStore = styled.button`
  /* padding: 16px 53px 13px 51px; */
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  margin-top: 46px;
  width: 216px;
  height: 54px;

  &:hover {
    background-color: #016dd9;
    color: white;
  }
  @media only screen  and (max-width: 767px) {
    width: 242px;
    height: 40px;
  }
`;
const How = styled.label`
  text-align: center;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #016dd9;
  opacity: 1;
  @media only screen  and (max-width: 767px) {
    font: normal normal 600 14px/21px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal 600 16px/25px Poppins;
  }
`;

const SubMainDiv = styled.div`
  display: flex;
  height: 911px;
  @media only screen and (max-width: 767px){
    height: 663px;
  }
`;
const NFTDetails = styled.div`
  background: #041628 0% 0% no-repeat padding-box;
  border-radius: 0px 6px 6px 0px;
  position: absolute;
  padding: 10px;
  top: 78.8%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const NamePrice = styled.label`
  text-align: center;
  font: normal normal normal 1.1rem/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

const Symbol = styled.div``;
const Currency = styled.label``;
const CurrencyPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
`;
const Number = styled.label`
  color: #016dd9;
  @media only screen  and (max-width: 767px) {
    font: normal normal 600 24px/25px Poppins;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font: normal normal 600 48px/72px Poppins;
  }
`;

const LoaderDiv = styled.div`
  white-space: nowrap;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px;
  font: normal normal normal 18px/27px Poppins;
  color: #031527;

  @media only screen  and (max-width: 767px) {
    font: normal normal normal 16px/25px Poppins;
  }
`;
const FirstContainer = styled.div`
  width: 100%;
  position: absolute;
  overflow: hidden;
`;
const BgImage = styled.div`
  background: url("./BannerImage.svg");
  height: 911px;
  background-size: cover;
  opacity: 1;
  /* background-color: rgb(255, 255, 255);
  background-position: center center;
  opacity: 0.3; */
  filter: blur(33px);
  /* -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent); */
  @media only screen and (max-width: 767px){
    height: 663px;
  }
`;
const SecondContainer = styled.div`
  display: flex;
  margin: 0px auto;
  max-width: min(1580px, 100% - 40px);
  width: 100%;
  flex-wrap: wrap;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;
const FirstDiv = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding: 30px 20px 20px;
  @media (min-width: 1024px) {
    width: 50%;
    padding: 110px 20px 44px 30px;
    align-items: flex-start;
  }
`;
const SecondDiv = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding-top: 0px;
  @media (min-width: 1024px) {
    width: 54%;
    padding: 60px 0px;
    align-items: flex-end;
  }
`;
const H1 = styled.h1`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  @media (max-width: 768px) {
    text-align: center;
    font: normal normal 600 24px/40px Poppins;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal 600 32px/48px Poppins;
  }
  @media (min-width: 1024px) {
    text-align: left;
  }
`;
const SpanFirst = styled.span`
  margin-top: 20px;
  max-width: 400px;
  /* text-align: center; */
  z-index: 2;
  /* font-size: 18px; */
  color: #ffffff;
  @media (max-width: 768px) {
    text-align: center;
    font: normal normal medium 16px/24px Poppins;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
    font: normal normal medium 16px/25px Poppins;
  }
  @media (min-width: 1024px) {
    text-align: left;
    font: normal normal normal 22px/33px Poppins;
  }
`;
const FirstCardDiv = styled.div`
      z-index: 1;
    display: grid;
    grid-template-columns: auto auto;
    gap: 64px 3.875em;
  @media only screen and (max-width:767px){
    justify-content: center;
    gap: 24px 1.5em;
    
  }
  @media only screen and  (min-width:767px) and (max-width:1024px){
    justify-content: center;
    gap: 40px 2.5em;
  }
  
`;
const ButtonStore = styled.button`
  width: 242px;
  height: 54px;
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 35px;
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: row;
  font: normal normal normal 18px/27px Poppins;
  &:hover {
    background-color: #016dd9;
    color: #ffffff;
  }
`;
const NFTCardDiv = styled.div`
  margin-right: ${(props) => props.marginRight};
  margin-Top: ${(props) => props.marginTop};
`;
const NFTCardImage = styled.img`
width: 331px;
height: 373px;
@media only screen and (max-width:480px){
  width:101.04%;
  height: 142px;
  }
  @media (min-width:481px) and (max-width:768px){
  width:200px;
  height: 214px;
    
  }
@media (min-width: 768px) and (max-width:1024px) {
  width:207px;
  height: 234px;
}
@media (min-width: 1024px)  {
  width: 22vw;
  height: 375px;
}

@media (min-width: 1600px) {
  width:331px;
  height:373px;
}
`;


const HomeCard = ({MetaMaskConnector}) => {
 
  const data = [
    {
      image: customisable,
      title: "Fully customisable",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: Customer,
      title: "Customer centric approach",
      subtitle:
        "NFTinger is super easy for anyone as it subtracts the the complexities of",
    },
    {
      image: Security,
      title: "Reliable Security",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: CrossChain,
      title: "Cross-chain support",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
  ];

  const offer = [
    {
      img: Paint,
      name: "Art",
    },
    {
      img: Ball,
      name: "Sports",
    },
    {
      img: CardImg,
      name: "Trading Cards",
    },
    {
      img: CardImg,
      name: "Photography",
    },
    {
      img: Collectivables,
      name: "Collectibles",
    },
    {
      img: Utility,
      name: "Utility",
    },
    {
      img: Music,
      name: "Music",
    },
  ];

  return (
    <>
      <MainDiv>
        <SubMainDiv>
          <FirstContainer>
            <BgImage></BgImage>
          </FirstContainer>
          <SecondContainer>
            <FirstDiv>
              <H1>Launch your NFT Marketplace in a minute</H1>
              <SpanFirst>
                Just connect your Metamask wallet to launch your store. No
                Coding knowledge required.
              </SpanFirst>
              <ButtonStore
                //onClick={() => createHandle(customize.appearance.buttons)}

                // className={`button-hide second`}
                onClick={MetaMaskConnector}
              >
                {/* {loader ? <Spinner></Spinner> : ""} */}
                <Image src={MetaFox} style={{ marginRight: "5px" }}></Image>
                {`${
                  localStorage.getItem("has_wallet") === "false"
                    ? "connect to Wallet"
                    : "Launch your store"
                }`}
              </ButtonStore>
            </FirstDiv>
            <SecondDiv>
              <FirstCardDiv>
                <NFTCardDiv >
                  <NFTCardImage src={WarriorMonk}></NFTCardImage>
                </NFTCardDiv>
                <NFTCardDiv>
                  <NFTCardImage src={Bear}></NFTCardImage>
                </NFTCardDiv>
                <NFTCardDiv >
                  <NFTCardImage src={Water}></NFTCardImage>
                </NFTCardDiv>
                <NFTCardDiv>
                  <NFTCardImage src={invisible}></NFTCardImage>
                </NFTCardDiv>
              </FirstCardDiv>
            </SecondDiv>
          </SecondContainer>
        </SubMainDiv>

        <BottomSection>
          <FirstSection>
            <LabelText>
              Why use <span style={{ color: "#016dd9" }}>NFTinger</span>
            </LabelText>

            <MainCardDiv>
              {data.map((ele) => (
                <CardDiv>
                  <Cards>
                    <Image src={ele.image}></Image>
                    <Title>{ele.title}</Title>
                    <SubTitle>{ele.subtitle}</SubTitle>
                  </Cards>
                </CardDiv>
              ))}
            </MainCardDiv>
          </FirstSection>

          <CommonSection marginTop="54px" tabWidth="74%">
            <HeadTitle>
              <How>How its Works</How>
              <CommonText>Get started in 3 simple steps </CommonText>
            </HeadTitle>

            <StepDiv>
              <StepImageDiv>
                <Image
                  width="319px"
                  height="318px"
                  tabWidth="516px"
                  tabHeight="418px"
                  originalWidth="541px"
                  originalHeight="418px"
                  src={StepWallet}
                ></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle>
                  <Number>01</Number> Connect your wallet
                </StepTitle>
                <StepDes marginTop="22px">
                  NFTinger is super easy for anyone as it subtracts the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={MetaMaskConnector}>
                  <LoaderDiv>
                    {/* {loader ? <Spinner></Spinner> : ""} */}
                    Connect Wallet
                  </LoaderDiv>
                </StepCreateStore>
              </StepDetails>
            </StepDiv>

            <StepDivSecond>
              <StepImageDiv>
                <Image
                  width="319px"
                  height="318px"
                  tabWidth="516px"
                  tabHeight="418px"
                  originalWidth="540px"
                  originalHeight="458px"
                  src={StepStore}
                ></Image>
              </StepImageDiv>
              <StepDetails>
                <StepTitle>
                  <Number>02</Number> Create your NFT store
                </StepTitle>
                <StepDes marginTop="16px">
                  NFTinger is super easy for anyone as it subtracts the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={MetaMaskConnector}>
                  <LoaderDiv>
                    {/* {loader ? <Spinner></Spinner> : ""} */}
                    Create Store
                  </LoaderDiv>
                </StepCreateStore>
              </StepDetails>
            </StepDivSecond>

            <StepDiv>
              <StepImageDiv>
                <Image
                  width="319px"
                  height="318px"
                  tabWidth="516px"
                  tabHeight="418px"
                  originalWidth="540px"
                  originalHeight="540px"
                  src={StepGrowth}
                ></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle>
                  <Number>03</Number> Start selling and grow
                </StepTitle>
                <StepDes marginTop="16px">
                  NFTinger is super easy for anyone as it subtracts the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={MetaMaskConnector}>
                  <LoaderDiv>
                    {/* {loader ? <Spinner></Spinner> : ""} */}
                    Create Store
                  </LoaderDiv>
                </StepCreateStore>
              </StepDetails>
            </StepDiv>
          </CommonSection>

          <CommonSection marginTop="76px">
            <HeadTitle>
              {/* <CommonText>Intuitive UI & Seamless NFT Buying Experience</CommonText> */}
              <TitleSecond>Intuitive UI & Seamless NFT Buying Experience</TitleSecond>
              <ExperienceText>
                Enable customer to buy NFT seamlessly
              </ExperienceText>
              <Image
                width="91.5%"
                height="266px"
                tabWidth="89.60vw"
                tabHeight="415px"
                originalWidth="55.11vw"
                originalHeight="639px"
                src={NFTBuying}
              ></Image>
            </HeadTitle>
          </CommonSection>

          <CommonSection marginTop="31.92px">
            <HeadTitle>
              <CommonText>Manage you marketplace </CommonText>
              <ExperienceText>
                Enable customer to buy NFT seamlessly
              </ExperienceText>
              <Image
                width="91.5%"
                height="267px"
                tabWidth="89.60vw"
                tabHeight="415px"
                originalWidth="55.11vw"
                originalHeight="639px"
                src={Admin}
              ></Image>
            </HeadTitle>
          </CommonSection>

          <BlockchainSection>
            <HeadTitle>
              <CommonText>Major Blockchains we support </CommonText>
            </HeadTitle>

            <BlockchainsDiv>
              <Blockchain>
                <Image
                  width="72px"
                  height="72px"
                  tabWidth="181px"
                  tabHeight="181px"
                  originalWidth="181px"
                  originalHeight="181px"
                  src={Ethereum}
                ></Image>
                <BlockchainText>Ethereum</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image
                  width="72px"
                  height="72px"
                  tabWidth="181px"
                  tabHeight="181px"
                  originalWidth="181px"
                  originalHeight="181px"
                  src={Polygon}
                ></Image>
                <BlockchainText>Polygon Matic</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image
                  width="72px"
                  height="72px"
                  tabWidth="181px"
                  tabHeight="181px"
                  originalWidth="181px"
                  originalHeight="181px"
                  src={BinanceBlockchain}
                ></Image>
                <BlockchainText>Binance </BlockchainText>
              </Blockchain>
            </BlockchainsDiv>
          </BlockchainSection>

          <CommonSection marginTop="54px">
            <HeadTitle>
              <CommonText>No code storefront</CommonText>

              <StoreFrontPage>
                <StoreFrontDiv>
                  <Image src={StoreApi}></Image>
                  <StoreFrontName>NFT APIs</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src={StoreFrontSetting}></Image>
                  <StoreFrontName>NFT Tools</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src={infrastructure}></Image>
                  <StoreFrontName>NFT Infrastructure</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
              </StoreFrontPage>

              <StoreButton onClick={MetaMaskConnector}>
                <div className="display-loader-left storefront-create-store">
                  {/* {loader ? <Spinner></Spinner> : ""} */}
               
                </div>
                Create Store
              </StoreButton>
            </HeadTitle>
          </CommonSection>

          <CommonSection marginTop="54px">
            <HeadTitle>
              <CommonText>NFTs our whitelabel marketplace offer </CommonText>
              <OfferCardDiv>
                {offer.map((ele) => (
                  <OfferCard>
                    <Image src={ele.img}></Image>
                    <OfferName>{ele.name}</OfferName>
                  </OfferCard>
                ))}
              </OfferCardDiv>
            </HeadTitle>
          </CommonSection>

          <CommonSection
            marginBottom="163px"
            marginTop="82px"
            width="97%"
            mobMarginBottom="95px"
          >
            <HeadTitle>
              <CommonText marginBottom="88px" marginTop="22px">
                NFTinger Marketplace
              </CommonText>

              <Image
                width="293px"
                height="173px"
                tabWidth="622px"
                tabHeight="366px"
                originalWidth="63.86vw"
                originalHeight="722px"
                src={marketplace}
              ></Image>
            </HeadTitle>
          </CommonSection>
        </BottomSection>
      </MainDiv>
    </>
  );
};

export default HomeCard;
