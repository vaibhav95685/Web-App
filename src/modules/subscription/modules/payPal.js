import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../../assets/images/closeIcon.svg";
const PopModalDiv = styled.div`
  position: fixed;
  overflow: auto;
  display: grid;
  place-items: center;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100vw;
  inset: 0 0 0 0;
`;
const ChildDiv = styled.div`
  width: 400px;
`;

const Img = styled.img`
  float: right;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const ImgContainer = styled.div`
  margin-bottom: 3.25rem;
`;

function Paypal({ price, setShowPayPal, payPalPaymentHandler }) {
  const [paid, setPaid] = useState(false);
  const paypalRef = useRef();

  // To show PayPal buttons once the component loads
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "",
                amount: {
                  currency_code: "USD",
                  value: parseFloat(`${price}.0`),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          payPalPaymentHandler(order);
          setPaid(true);
          setShowPayPal(false);
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [setShowPayPal, price, payPalPaymentHandler]);

  return (
    <PopModalDiv>
      <ChildDiv>
        <ImgContainer>
          <Img onClick={() => setShowPayPal(false)} src={CloseIcon} />
        </ImgContainer>
        <div ref={paypalRef} />
      </ChildDiv>
    </PopModalDiv>
  );
}
export default Paypal;
