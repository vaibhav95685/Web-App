// import React from "react";
// import { useEffect } from "react";
// import styled from "styled-components";
// import Utils from "../../utility";
// import CloseIcon from "../../assets/images/closeIcon.svg";

// const UpperDiv=styled.div`
// position: relative;
// `;

// const HeaderDiv = styled.div`
//   background-color: white;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 169px;
//   margin-bottom: 439px;
// `;

// const ParentSaleDiv = styled.div`
//   max-width: 710px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
// `;

// const SaleDiv = styled.div`
//   font: normal normal bold 32px/48px Poppins;
//   letter-spacing: 0px;
//   color: #191919;
// `;
// const PriceDiv = styled.div`
//   margin-top: 32px;
//   width: 100%;
// `;
// const CommonText = styled.label`
//   font: normal normal bold 16px/25px Poppins;
//   letter-spacing: 0px;
//   color: #191919;
// `;
// const PriceInputDiv = styled.div`
//   margin-top: 13px;
//   width: 100%;
//   height: 42px;
//   /* UI Properties */
//   background: #ffffff 0% 0% no-repeat padding-box;
//   border: 1px solid #c8c8c8;
//   border-radius: 7px;
//   display: flex;
//   align-items: center;
// `;
// const InputDiv = styled.input`
//   max-width:620px;
//   width: 68vw;
//   padding-left: 14px;
//   outline: none;
//   border: none;
// `;
// const Line = styled.div`
//   width: 0px;
//   height: 100%;
//   outline: 1px solid #707070;
//   /* UI Properties */
// `;
// const CurrencyDiv = styled.div`
//   text-align: center;
//   font: normal normal normal 16px/25px Poppins-medium;
//   letter-spacing: 0px;
//   color: #366eef;

//   margin:auto;
//   width: 89.49px;
// `;

// const ScheduleDiv = styled.div`
//   margin-top: 28px;
//   width: 100%;
// `;
// const DesPrice = styled.label`
//   font: normal normal normal 14px/21px Poppins;
//   letter-spacing: 0px;
//   color: #707070;
//   margin-top: 20px;
//   @media only screen and (max-width:365px) {
//     font-size:3.5vw;
//   }
// `;
// const DateTimeDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 13px;
//   @media only screen and (max-width:365px) {
//     flex-direction:column;
//   }
// `;
// const DateTimeInputField = styled.input`
//   background: #ffffff 0% 0% no-repeat padding-box;
//   border: 1px solid #c8c8c8;
//   border-radius: 7px;
//   max-width: 313px;
//   width: 100%;
//   height: 42px;
//   padding-left: 7px;
//   padding-right: 7px;
// `;
// const At = styled.label`
//   font: normal normal medium 16px/25px Poppins;
//   color: #828282;
//   margin: 0px 10px;
// `;
// const Button = styled.button`
//   width: 100%;
//   height: 42px;
//   margin-top: 28px;
//   background: #366eef 0% 0% no-repeat padding-box;
//   border: none;
//   font: normal normal 600 16px/19px Segoe UI;
//   color: #ffffff;
//   border-radius: 8px;
// `;
// const Error = styled.div`
//   margin-top: 20px;
//   color: red;
  
// `;

// const PutItonSale = (props) => {

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     valueCheck(name, value);
//   };
//   const valueCheck = (name, value) => {
//     switch (name) {
//       case "date":
//         props?.setDateTimeValue({ ...props?.dateTimeValue, date: value });
//         break;
//       case "time":
//         props?.setDateTimeValue({ ...props?.dateTimeValue, time: value });
//         break;
//       default:
//         break;
//     }
//   };
//   const { pathname } = window.location;
//   const pathArray = pathname.split("/");
//   const id = pathArray[2];
//   console.log(pathArray)
 

//   return (
  
//    <>  
//     <HeaderDiv>
//     <UpperDiv>
//       <ParentSaleDiv>
//         <SaleDiv>Sell NFT</SaleDiv>
//         <PriceDiv>
//           <CommonText>Price*</CommonText>
//           <PriceInputDiv>
//             <InputDiv
//               type="number"
//               title=" "
//               placeholder="0"
//               autoComplete="off"
//               value={props?.salePrice}
//               onWheel={(e) => e.target.blur()}
//               onChange={(e) => {
//                 props.setSalePrice(e.target.value);
//                 props.setError("");
//               }}
//             />
//             <Line />
//             <CurrencyDiv>{props?.currency}</CurrencyDiv>
//           </PriceInputDiv>
//           <Error> {props?.error}</Error>
//           <DesPrice>
//             Will be on sale until you transfer or cancel the item
//           </DesPrice>
//         </PriceDiv>

//         <ScheduleDiv>
//           <CommonText>Schedule for Future time</CommonText>
//           <DateTimeDiv>
//             <DateTimeInputField
//               type={"date"}
//               name="date"
//               min={Utils.disablePastDate()}
//               placeholder=""
//               onChange={handleChange}
//             />
//             <At>at</At>
//             <DateTimeInputField
//               name="time"
//               onChange={handleChange}
//               type={"time"}
//             />
//           </DateTimeDiv>
//         </ScheduleDiv>

//         <Button onClick={props?.demoHandleSell}>Post</Button>
//       </ParentSaleDiv>
//       </UpperDiv>
//     </HeaderDiv>
//     </>
 
//   );
// };

// export default PutItonSale;
