import React from "react";
import NoPageFound from "../../assets/images/Nopagefound.svg";
import styled from "styled-components";
import { style } from "@mui/system";

const MainDiv=styled.div`
align-items: center;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
margin-top: 100px;
margin-bottom: 83px;

@media only screen and (min-width:1620px){
margin-top:227px;
}
`;
const Text=styled.p`
font: normal normal medium 20px/30px Poppins;
font-size: 20px;
line-height: 30px;
font-family: Poppins;
font-style: normal;
font-weight: normal;
color: #191919;
opacity: 1;
margin-top:26.76px;
`;


function PageNotFound() {
  return(
    <MainDiv>
        <img src={NoPageFound} alt="noPageFound"/> 
        <Text>Oops no page found</Text>
    </MainDiv>
  )
}

export default PageNotFound;
