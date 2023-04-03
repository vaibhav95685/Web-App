import React, { useState } from "react";
import styled from "styled-components";
import BuyItem from "./BuyItem";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/buying.css";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../../utility/global";


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  color: #191919;
  min-height: 70vh;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    width: 88.8%;
    margin: auto;
    padding-top: 34px;
  }
  @media screen and (min-width: 770px) and (max-width: 1024px) {
    width: 88.8%;
    margin: auto;
    padding-top: 34px;
  }
  @media screen and (max-width: 426px) {
    width: 90%;
    margin: auto;
    padding-top: 44px;
  }
`;
const Container = styled.div`
  @media screen and (max-width: 992px) {
    width: 100%;
  }  
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 42px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    padding-bottom: 32px;
  }
  @media screen and (max-width: 426px) {
    padding-bottom: 13px;
  }
`;
const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  padding-right: 14px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 20px;
  }
  @media screen and (max-width: 426px) {
    font-size: 18px;
  }
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  width: 217px;
  height: 42px;
  padding: 8px 11px 8px 11px;
  @media screen and (max-width: 426px) {
    width: 100%;
  }
`;
const Input = styled.input`
  border: none;
  width: 80%;
  font-size: 16px;
`;
const ListItem = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 941px;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px #0000000f;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  margin-bottom: 32px;
  height:100px;
  
  @media screen and (max-width: 955px) {
    width: 100%;
    
  }
`;
const Question = styled.h1`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 0px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 12px;
  } 
  @media screen and (max-width: 426px) {
    font-size: 14px;
  }
`;



const Buy = (props) => {
  const [query ,setQuery]=useState("")
  const navigate=useNavigate();

  const appearance = useSelector(state => state.customize.appearance);

  const BuyList = [
    {
      id: 0,
      questionText:
        "How do I purchase NFT?",
      answerText:
        "To buy an NFT, you must be a registered marketplace user, and your digital wallet balance must be positive. Click on the NFT that you want to buy and then click on Buy now button. It will navigate you to your wallet through which you can make your purchase.",
    },
    {
      id: 1,
      questionText:
        "How do I make an offer on NFT?",
      answerText:
        "Select \"Make Offer\" on the item page. If the item is part of an unsafelisted collection, you'll be prompted to review collection details and confirm that this collection is the correct one. Select the currency you'd like to make your offer in.",
    },
    {
      id: 2,
      questionText:
        "Is there a minimum bid requirement?",
      answerText:
        "Bids must be at least 5% higher than the previous bid. Only bids in the same payment token as the auction will be counted towards the winning bid.",
    },
  ];
const match=BuyList.filter(val => val.questionText.toLocaleLowerCase().includes(query));

  return (
    <>
    <nav aria-label="breadcrumb" className="headerbuying">
        <ol className="breadcrumb mt-4 offset-1">
          <li className="breadcrumb-item">
            <Link
              to="/help-center"
              style={{ textDecoration: "none" }}
              className="text-dark"
            >
              Help Center
            </Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{color: `${fetchPalletsColor(appearance.colorPalette)}`}}
          >
            Buying
          </li>
        </ol>
      </nav>
    <MainContainer>
      <Container>        
        <Header>
        <img src={require("../../../assets/images/leftarrowbuying.png")} alt="" onClick={()=>navigate(-1)} style={{marginRight:"16px",width:"26px",height:"23px"}} className="backbuying" />
          <Title>Buying</Title>
          <SearchBox>
            <Input type="search" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <i class="fa-solid fa-magnifying-glass"></i>
          </SearchBox>
        </Header>
        <ul>
          {match.length === 0 ? (
         
         <ListItem>
         
           <Question className="question">"No Data Found"</Question>
         
       </ListItem>
            
        ):(
          match.map((eachBuy) => {
            return(
            <BuyItem key={eachBuy.id} faqDetails={eachBuy} />
            )
        })
          
        )
      }
        </ul>
      </Container>
    </MainContainer>
    </>
  );
};

export default Buy;
