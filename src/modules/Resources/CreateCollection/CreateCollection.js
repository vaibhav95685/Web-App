import React, { useState } from "react";
import styled from "styled-components";
import CollectionItem from "./CollectionItem";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/styles/buying.css"
import { post } from "jquery";
import { fetchPalletsColor } from "../../../utility/global";
import { useSelector } from "react-redux";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  color: #191919;
  min-height:70vh;
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











const ListItem = styled.li`
  width: 941px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px #0000000f;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  padding: 30px 24px 13px 16px;
  margin-bottom: 32px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    padding: 30px 14px 13px 16px;
    width: 100%;
    
  }
  @media screen and (min-width: 770px) and (max-width: 955px) {
    padding: 30px 14px 13px 16px;
    width: 100%;
    
  }
  @media screen and (max-width: 426px) {
    padding: 32px 8px 24px 16px;
    width: 100%;
    
  }
`;

const Question = styled.h1`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 28px;
  padding-right: 60px;
  margin-bottom: 0px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 12px;
    padding-right: 16px;
  }
  @media screen and (max-width: 426px) {
    font-size: 14px;
    padding-bottom: 12px;
    padding-right:0px;
  }
`;



const CreateCollection = (props) => {
  const [query ,setQuery]=useState("")
  const navigate=useNavigate();

  const appearance = useSelector(state => state.customize.appearance);

  const BuyList = [
    {
      id: 0,
      questionText:
        "How do I create an NFT?",
      answerText:
        "Click \"Create\" in the top right corner. You'll be taken to the NFT item creation page. This page will allow you to upload your NFT file, name it and add a description.",
    },
    {
      id: 1,
      questionText:
        "How do I change the properties of my NFT?",
      answerText:
        "It’s easy - if you’ve minted your item on NFTinger, you can simply click on the Edit button on your NFT. As a note, you won’t be able to edit an NFT after it’s been sold.",
    },
    {
      id: 2,
      questionText:
        "How do I add a collection collaborator?",
      answerText:
        "To get started, navigate to the My Collections view, and click on a collection you'd like to Edit. This will take you to the Edit My Collection view. Please note that you can only add a collaborator to an existing collection.",
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
            Create collection
          </li>
        </ol>
      </nav>
    <MainContainer>
      <Container>
        
        <Header>
        <img src={require("../../../assets/images/leftarrowbuying.png")} onClick={()=>navigate(-1)}style={{marginRight:"16px",width:"26px",height:"23px"}} className="backbuying" />
          <Title>Creating Collection</Title>
          <SearchBox>
            <Input type="search" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <i class="fa-solid fa-magnifying-glass"></i>
          </SearchBox>
        </Header>
        <ul>
          {match.length==0 ? (
         
         <ListItem>
         
           <Question className="question">"No Data Found"</Question>
         
       </ListItem>
            
        ):(
          match.map((eachCollection) => {
            return(
            <CollectionItem key={eachCollection.id} faqDetails={eachCollection} />
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

export default CreateCollection;
