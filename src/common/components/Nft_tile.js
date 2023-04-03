// import React, { Component } from "react";
// import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";
// import NftToggle from "./NftToggle";
// // import './Nft_tile.css'

// export default function Nft_tile({ image, title, price, maxPrice, daysLeft }) {
//   return (
//     <div className="container">
//       <NftToggle/>
//       <Lower__homepage/>
//       <div className="row mob_row" style={{ justifyContent: "space-between" }}>
//         {Nfts_Tile_Api.map((curElem) => {
//           const { id, image, title, price, maxPrice, daysLeft } = curElem;
//           return (
//             <div className="col-md-6 col-lg-3 col-sm-12 mt-5">
//               <Link to="/nft-information" style={{ textDecoration: "none" }}>
//                 <div
//                   className="card nft-card-radius border-radius cardmob"
//                   style={{ marginLeft: "1em" }}
//                 >
//                   <img
//                     className="img-fluid border-radius nft-img-radius card_imgmob"
//                     src={image}
//                     // style={{ width: "270px" }}
//                   />
//                   <img
//                     id="like_icon"
//                     src={require("../asset//images/Like.png")}
//                   />
//                   <div>
//                     <div className="container__up">
//                       <h6
//                         className="font-15 font-weight-700 text-dark"
//                         style={{ marginLeft: "1em" }}
//                       >
//                         {title}
//                       </h6>
//                       <h6 className="value">{price}</h6>
//                     </div>
//                     <h6
//                       className="value__high font-13 text-dark"
//                       style={{ marginLeft: "1em" }}
//                     >
//                       Highest bid:
//                       <span className="font-weight-900">{maxPrice}</span>
//                       <span
//                         className="dayleft_mob"
//                         style={{ marginLeft: "2em", color: "#000" }}
//                       >
//                         <i className="far fa-clock" style={{ color: "#f54" }}></i>
//                         {daysLeft} days left
//                       </span>
//                     </h6>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
