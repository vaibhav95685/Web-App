import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";

const MenuDiv=styled.div`
height: auto;
top: 71px;
display: ${(props) => (props?.display ? "block" : "none")};
width: 100%;
position: absolute;
padding: 16px 16px;
background: #031527 0% 0% no-repeat padding-box;
z-index: 3;
@media screen and (min-width: 600px) {
  display: none;
}
`;
const ParentDiv=styled.div`
border: 1px solid #ffffff;
border-radius: 6px;
padding: 10px;
display: flex;
row-gap: 15px;
flex-direction: column;
`;
const SubMenuDiv=styled.div`
display: flex;
flex-direction: row;
cursor: pointer;
justify-content:space-between;
`;
const CommonTitleHumBurger=styled.label`
font: normal normal 600 18px/27px Poppins;
letter-spacing: 0px;
color: #FFFFFF;
`;

const HumburgerMenu = ({menu,setMenu,MetaMaskConnector}) => {
  const [ExpandList ,setExpandList]=useState(false);
  const navigate = useNavigate();

  const handleClicker=(path)=>{
    setMenu(false);
    navigate(path);
    
}
  return <>
    <MenuDiv display={menu}>
        <ParentDiv>
        <SubMenuDiv>
          <CommonTitleHumBurger>Pricing</CommonTitleHumBurger>
          <BsChevronRight style={{color:"white" , width:"21px",height:"21px" }}/>         
        </SubMenuDiv>  
        <SubMenuDiv onClick={()=>setExpandList(!ExpandList)}>
          <CommonTitleHumBurger>Resource</CommonTitleHumBurger>
          {ExpandList ? (  <BsChevronUp style={{color:"white" , width:"21px",height:"21px" }}/>   )
          :(
            <BsChevronRight style={{color:"white" , width:"21px",height:"21px" }}/>   

          )}
              
        </SubMenuDiv> 
   
        {ExpandList && ( 
         <>
        
        <SubMenuDiv onClick={()=>handleClicker("/help-center")}>
          <CommonTitleHumBurger>Help-Center</CommonTitleHumBurger>
          <BsChevronRight style={{color:"white" , width:"21px",height:"21px" }}/>         
        </SubMenuDiv> 

        <SubMenuDiv onClick={()=>handleClicker("/suggestion")}>
          <CommonTitleHumBurger>Suggestion</CommonTitleHumBurger>
          <BsChevronRight style={{color:"white" , width:"21px",height:"21px" }}/>         
        </SubMenuDiv> 

         </>
          )}
      
       
        <SubMenuDiv onClick={MetaMaskConnector}>
          <CommonTitleHumBurger >Login</CommonTitleHumBurger>
          <BsChevronRight style={{color:"white" , width:"21px",height:"21px" }}/>         
        </SubMenuDiv> 
        </ParentDiv>
      </MenuDiv>
  </>;
};

export default HumburgerMenu;
