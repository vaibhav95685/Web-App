import React, { Component } from "react";
import styled from "styled-components";

const ListItem = styled.li`
  width: 941px;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px #0000000f;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  padding: 30px 24px 30px 16px;
  margin-bottom: 32px;
  cursor: pointer;
  @media screen and (min-width: 426px) and (max-width: 701px) {
    padding: 30px 14px 30px 16px;
    width: 100%;
  }
  @media screen and (min-width: 500px) and (max-width: 605px) {
    padding: 30px 14px 30px 16px;
    width: 485px;
    
  }
  @media screen and (min-width: 605px) and (max-width: 700px) {
    padding: 30px 14px 30px 16px;
    width: 585px;
    
  }
  @media screen and (min-width: 700px) and (max-width: 955px) {
    padding: 30px 14px 30px 16px;
    width: 683px;
    
  }
  @media screen and (max-width: 426px) {
    padding: 32px 8px 32px 16px;
    width: 100%;
  }
`;
const QuestionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const Question = styled.h1`
  font-size: 16px;
  font-weight: 600;
  padding-right: 60px;
  margin-bottom: 0px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 12px;
    padding-right: 16px;
  }
  @media screen and (max-width: 426px) {
    font-size: 14px;
    padding-right:0px;
  }
`;
const Answer = styled.p`
  font-size: 14px;
  font-weight: 500;
  /* width: 759px; */
  margin-bottom: 0px;
  padding-top:16px;
  margin-bottom:-20px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    width: 90%;
  }
  @media screen and (max-width: 426px) {
    width: 100%;
  }
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
`;
class BuyItem extends Component {
  state = {
    isActive: false,
  };

  renderAnswer = () => {
    const { faqDetails } = this.props;
    const { answerText } = faqDetails;
    const { isActive } = this.state;

    if (isActive) {
      return (
        <div>
          <Answer className="answer">{answerText}</Answer>
        </div>
      );
    }
    return null;
  };

  onToggleIsActive = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  };

  renderActiveImage = () => {
    const { isActive } = this.state;
    const image = isActive ? (
      <i class="fa-solid fa-minus"></i>
    ) : (
      <i class="fa-solid fa-plus"></i>
    );

    return (
      <Button className="button" type="button" >
        {image}
      </Button>
    );
  };

  render() {
    const { faqDetails } = this.props;
    const { questionText } = faqDetails;

    return (
      <ListItem onClick={this.onToggleIsActive}>
        <QuestionDiv>
          <Question className="question">{questionText}</Question>
          {this.renderActiveImage()}
        </QuestionDiv>
        {this.renderAnswer()}
      </ListItem>
    );
  }
}

export default BuyItem;
