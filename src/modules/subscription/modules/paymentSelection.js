import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PayPalImg from "../../../assets/images/payPal.png";
import BankUpi from "../../../assets/images/bankUpi.png";

const HeadPaymentDiv = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 2.5rem;
  column-gap: 100px;
  align-items: center;
`;
const ParentPaymentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
`;
const Label = styled.label`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0;
  margin-top: ${(props) => props.marginTop};
`;
const PaymentDivPaypal = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0;
  font-family: sans-serif;
  margin-top: 12px;
`;
const PaymentDiv = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0;
  margin-top: -1.5rem;
  font-family: sans-serif;
  text-align: center;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 1.25rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;
const Button = styled.button`
  outline: none;
  color: white;
  background: ${(props)=>props.backgroundColor};
  opacity: ${(props)=>props.opacity};
  padding: 11px;
  border-radius: 5px;
  border: none;
`;
const InputRadio = styled.input`
  border: 3px solid rgba(0, 0, 0, 0.7450980392156863);
  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  transition: all 0.2s ease-in;
  cursor: pointer;
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
`;
const ChildDiv = styled.div`
  width: auto;
  background-color: white;
  padding: 2rem;
  border: 10px solid #366eef;
  border-radius: 12px;
`;

const PaymentSelection = ({ item, setDisplay, setShowPayPal, setRazorPay }) => {
  const [selectedOption, setSelectOption] = useState("");
  const { user, customize } = useSelector((state) => state);
  const [loaderState, setLoaderState] = useState(false);

  const paymentHandler = async () => {
    if (selectedOption === "paypal") {
      setShowPayPal(true);
    } else {
      setRazorPay(true);
    }
  };

  const onValueChange = (e) => {
    setSelectOption(e.target.value);
  };

  return (
    <>
      <PopModalDiv>
        <ChildDiv>
          <div>
            <HeadPaymentDiv>
              <ParentPaymentDiv>
                <div>
                  <InputRadio
                    type="radio"
                    value="paypal"
                    name="paypal"
                    onChange={(e) => onValueChange(e)}
                    checked={selectedOption === "paypal"}
                  />
                </div>
                <Label marginTop={"4.5rem"}>
                  <Img src={PayPalImg} />
                  <PaymentDivPaypal>
                    Paypal, Visa, Master Card and American Express
                  </PaymentDivPaypal>
                </Label>
              </ParentPaymentDiv>

              <ParentPaymentDiv>
                <InputRadio
                  type="radio"
                  value="upi"
                  name="upi"
                  onChange={(e) => onValueChange(e)}
                  checked={selectedOption === "upi"}
                />
                <Label>
                  <Img src={BankUpi} />
                  <PaymentDiv>UPI and Netbanking</PaymentDiv>
                </Label>
              </ParentPaymentDiv>
            </HeadPaymentDiv>
            <ButtonDiv>
              <Button
                backgroundColor={"#366eef 0% 0% no-repeat padding-box"}
                opacity={1}
               onClick={() => setDisplay(false)}>Cancel</Button>

              <Button
                onClick={paymentHandler}
                backgroundColor={selectedOption != "" ? "#366eef 0% 0% no-repeat padding-box": "0% 0% no-repeat padding-box padding-box rgb(155, 183, 247)"}
                opacity={selectedOption != "" ? 1:0.8}
                disabled={selectedOption != "" ? false : true}
              >
                Make Payment
              </Button>
            </ButtonDiv>
          </div>
        </ChildDiv>
      </PopModalDiv>
    </>
  );
};

export default PaymentSelection;
