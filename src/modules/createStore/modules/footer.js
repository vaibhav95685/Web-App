import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../common/components/Spinner";
import { BrowserRouter as Router, Link } from "react-router-dom";

const FooterSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background: #172738 0% 0% no-repeat padding-box;
  opacity: 1;
  padding: 74px 73px;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  padding: 16px 11px 93px 0px;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    padding-left: 16px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const MarketPlaceDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 106%;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 66.6%;
  }
`;
const NameText = styled.label`
  text-align: left;
  font: normal normal normal 42px/48px Whiskey Girls Condensed;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  cursor: pointer;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font: normal normal normal 32px/36px Whiskey Girls Condensed;
  }
`;
const AboutText = styled.label`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const DesText = styled.label`
  text-align: left;
  margin-top: 30px;
  font: normal normal normal 16px/25px Poppins;
  letter-spacing: 0px;
  color: #e0e0e0;
  opacity: 1;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font: normal normal normal 16px/25px Poppins;
  }
`;
const OtherDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: flex-start;
    column-gap: 65px;
    margin-top: 19px;
    flex-wrap: wrap;

  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    justify-content: flex-start;
    column-gap: 58px;
    margin-top: 25px;

  }
`;
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-basis: 50%;
  }
`;
const HeadingFooter = styled.p`
  text-align: left;
  cursor: pointer;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
`;
const ParaText = styled.p``;
const LinkText = styled.a`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  cursor: pointer;
  color: #e0e0e0;
  text-decoration: none;
`;
const SecondDiv = styled.div``;
const ThirdDiv = styled.div`
@media only screen and (min-width: 320px) and (max-width: 767px) {
  /* display: none; */
  width: 100%;
}
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 74px;
    flex-basis: 50%;
  }
`;

const FooterCreateStore = styled.button`
  background: #23194200 0% 0% no-repeat padding-box;
  border: 2px solid #ffffff;
  border-radius: 6px;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  width: 173px;
  height: 40px;
  &:hover{
    background-color: #016dd9;
    color:white;

  }
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  /* display: none; */
  width: 100%;
  font: normal normal medium 16px/25px Poppins;
}
`;
const Hr=styled.div`
    background: #3e4143;
    /* position: absolute; */
    width: 100%;
    height: 1px;
`;
const LinkFooter=styled.a`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  cursor: pointer;
  color: #e0e0e0;
  text-decoration: none;
  `;


const Footer = ({MetaMaskConnector}) => {
  const navigate = useNavigate();



  return (
    <>
    <FooterSection>
      <FooterDiv>
        <MarketPlaceDetail>
          <NameText onClick={()=>navigate("/")}>NFTinger</NameText>
          {/* <AboutText>About DLT NFT marketplace</AboutText> */}
          <DesText>
            NFTinger is a B2B Saas to launch their own white-label NFT store or
            NFT marketplace without any technical knowledge.
          </DesText>
        </MarketPlaceDetail>
        <OtherDetails>
          <FirstDiv>
            <HeadingFooter>Company</HeadingFooter>
            <ParaText onClick={()=>navigate("/about")}>
            <LinkFooter>About Us</LinkFooter>
            </ParaText>
            <ParaText>
              <LinkText>Pricing</LinkText>
            </ParaText>
          </FirstDiv>
          <SecondDiv>
            <HeadingFooter>Resource</HeadingFooter>
            <ParaText onClick={()=>navigate("/help-center")}>
            <LinkFooter> Help Center</LinkFooter>
            </ParaText>
            <ParaText onClick={()=>navigate("/FAQs")}>
            <LinkFooter> FAQs</LinkFooter>
            </ParaText>
            <ParaText onClick={()=>navigate("/suggestion")}>
             <LinkFooter>Suggestions</LinkFooter>
            </ParaText>
          </SecondDiv>
          <ThirdDiv>
            <FooterCreateStore onClick={MetaMaskConnector}>
              {/* <div className="display-loader-left m-t-2">
                {loader ? <Spinner></Spinner> : ""}
              </div> */}
              Create Store
            </FooterCreateStore>
          </ThirdDiv>

        </OtherDetails>
      </FooterDiv>
    </FooterSection>
    <Hr></Hr>
    {/* <hr style={{color:"red",background:"grey",position:"absolute",width:"100%"}}></hr> */}
    <div className="copyrightDiv newHomeCopyright" style={{ background: " #172738 "}}>
      <span className="textCopyright newHome" style={{ color: " #e0e0e0 " }}>
        &copy; 2022 NFTinger.All Rights Reserved.
      </span>
    </div>
    </>
    
  );
};

export default Footer;
