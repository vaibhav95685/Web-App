// import React from "react";
// import image from "../../assets/images/1.jpg";
// import NftNoBid from "../../assets/images/NftNoBid.png";
// import share from "../../assets/images/share.png";
// import doublearrow from "../../assets/images/doublearrow.png";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
// import "../../assets/styles/Leader.css";

// function NftInformation2() {
//   return (
//     <div className="nftFull">
//       <div className="container">
//         <div className="row mt-5">
//           <div className="col-lg-6 col-sm-12 col-md-6">
//             <div>
//               <img
//                 src={image}
//                 className="border-radius"
//                 style={{
//                   width: "100%",
//                   height: "550px",
//                   borderRadius: "8px",
//                 }}
//               />
//             </div>
//           </div>
//           <div className="col-lg-6 col-sm-12 col-md-6">
//             <div className="row">
//               <div className="nftsell1">
//                 <span className="text-dark font-22 font-weight-900">
//                   Abstract Art Poster
//                 </span>

//                 <span className="icon-img2">
//                   <img src={share} style={{ width: "35px", height: "30px" }} />
//                   <img
//                     src={doublearrow}
//                     style={{ width: "35px", height: "30px" }}
//                   />
//                 </span>
//               </div>
//               <div className="second-text mt-4">
//                 <span className="font-13 text-dark">Minimum Bid: </span>
//                 <span
//                   className="font-13 font-weight-700"
//                   style={{ color: "#16AB6E" }}
//                 >
//                   0.32 ETH
//                 </span>
//                 <span
//                   className="font-13 text-dark"
//                   style={{ marginLeft: "1em" }}
//                 >
//                   Highest Bid:{" "}
//                 </span>
//                 <span
//                   className="font-13 font-weight-700"
//                   style={{ color: "#366EEF" }}
//                 >
//                   0.49 ETH
//                 </span>
//                 <span style={{ marginLeft: "3.6em" }}>
//                   <i className="far fa-clock" style={{ color: "#f54" }}></i>
//                 </span>
//                 <span className="font-13 text-dark"> Ends in 5 days </span>
//               </div>
//               <div className="row">
//                 <div className="col-lg-4 col-sm-12  mt-3">
//                   <span className="font-13 text-dark">
//                     Owned by:
//                     <span className="font-13 font-weight-900 text-dark">
//                       Beeple
//                     </span>
//                   </span>
//                 </div>
//                 <div className="col-lg-4 col-sm-12  mt-3">
//                   <span className="font-13 text-dark">
//                     Created by:
//                     <span className="font-13 font-weight-900 text-dark">
//                       Beeple
//                     </span>
//                   </span>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-lg-3 col-sm-12 mt-3">
//                   <span className="font-13 text-dark">
//                     <VisibilityIcon
//                       style={{ fontSize: "20px", color: "#366EEF" }}
//                     />
//                     <span
//                       className="font-13 font-weight-900 text-dark"
//                       style={{ marginLeft: "0.5em" }}
//                     >
//                       100
//                     </span>
//                   </span>
//                 </div>
//                 <div className="col-lg-3 col-sm-12 mt-3">
//                   <span className="font-13 text-dark">
//                     <FavoriteIcon
//                       style={{ fontSize: "20px", color: "#EF3643" }}
//                     />
//                     <span
//                       className="font-13 font-weight-900 text-dark"
//                       style={{ marginLeft: "0.5em" }}
//                     >
//                       23
//                     </span>
//                   </span>
//                 </div>
//               </div>
//               <div className="row">
//                 <h4 className="font-13  font-weight-900 mt-3">Description</h4>
//               </div>
//               <div className="row">
//                 <h4 className="font-13 ">
//                   Abstract art is art that does not attempt to represent an
//                   accurate depiction
//                   <br />
//                   of a visual reality but instead use shapes, colours, forms and
//                   gestural <br />
//                   marks to achieve its effect.
//                 </h4>
//               </div>
//               <div
//                 className="row"
//                 style={{ width: "34rem", paddingLeft: "1.5rem" }}
//               >
//                 <span className=" border-bottom">
//                   <Link
//                     to="/BidsComponent"
//                     style={{
//                       textDecoration: "none",
//                       color: "#000",
//                       fontSize: "14px",
//                     }}
//                     className="font-weight-900"
//                   >
//                     Bids
//                   </Link>
//                   <Link
//                     to="/OffersComponent"
//                     style={{
//                       textDecoration: "none",
//                       color: "#000",
//                       fontSize: "14px",
//                       marginLeft: "1em",
//                     }}
//                     className="font-weight-900"
//                   >
//                     Offers
//                   </Link>
//                 </span>
//               </div>
//               <div
//                 className="row"
//                 style={{ marginTop: "1.3rem", paddingLeft: "1.5rem" }}
//               >
//                 <div className="nftbox font-13">
//                   <img src={NftNoBid} alt="" />
//                   <div>No bids available</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container contPricing">
//         <div className="Pricing">
//           <div className="pricing1">Pricing History</div>
//           <div className="pricingHistory" style={{ display: "flex" }}>
//             <div className="dropdown filter">
//               <button
//                 className="btn btn-secondary dropdown-toggle"
//                 type="button"
//                 id="dropdownMenuButton1"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//                 placeholder="All"
//                 style={{
//                   width: "100%",
//                   backgroundColor: "white",
//                   color: "black",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 Filter
//                 <i className="fas fa-caret-down"></i>
//               </button>
//               <ul
//                 className="dropdown-menu"
//                 aria-labelledby="dropdownMenuButton1"
//               >
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Action
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Another action
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Something else here
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <button style={{ width: "100%" }}>
//               Bids <i className="fas fa-times"></i>
//             </button>
//             <button style={{ width: "100%" }}>
//               List <i className="fas fa-times"></i>
//             </button>
//             <button style={{ width: "100%" }}>
//               Offer <i className="fas fa-times"></i>
//             </button>
//           </div>
//           <div className="nftEvent">
//             <div>Event</div>
//             <div>Price</div>
//             <div>From</div>
//             <div>To</div>
//             <div className="date">Date</div>
//           </div>
//           <div className="nftList">
//             <div className="nftEvent01">
//               <div>List</div>
//               <div>0.09 ETH</div>
//               <div>Beeple</div>
//               <div></div>
//               <div>28jun</div>
//             </div>
//             <hr style={{ margin: "0px" }} />
//           </div>
//         </div>
//         <div className="Pricing2">
//           <div className="pricing1">Pricing History</div>
//           <div className="box1">
//             <div className="boxAlign">
//               <div>Average Price</div>
//               <div className="dropdown" style={{ width: "34%" }}>
//                 <button
//                   className="btn btn-secondary dropdown-toggle"
//                   type="button"
//                   id="dropdownMenuButton1"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   placeholder="All"
//                   style={{
//                     width: "100%",
//                     backgroundColor: "white",
//                     color: "black",
//                     border: "1px solid #ddd",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   All time
//                   <i className="fas fa-caret-down"></i>
//                 </button>
//                 <ul
//                   className="dropdown-menu"
//                   aria-labelledby="dropdownMenuButton1"
//                 >
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="box4">
//               <div className="box2">No information available</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NftInformation2;
