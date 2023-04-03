// {/* <div className="row border-bottom pb-2 mt-3">
//                 {/* <div className="col-1">
//                   <a
//                     className="text-dark font-15 font-weight-900"
//                     style={{ textDecoration: "none" }}
//                     href="#pills-active_section"
//                     role="tab"
//                     aria-controls="pills-active_section"
//                     aria-selected="true"
//                     onClick={() => setActiveInActive("active")}
//                   >
//                     Bidsd
//                   </a>
//                 </div> */}
//                 <div className="col-1">
//                   <a
//                     className="text-secondary font-15 font-weight-900"
//                     style={{ textDecoration: "none" }}
//                     href="#pills-inactive_section"
//                     role="tab"
//                     aria-controls="pills-inactive_section"
//                     aria-selected="false"
//                     onClick={() => setActiveInActive("inActive")}
//                   >
//                     Offers
//                   </a>
//                 </div>
//               </div>
//               <div className="Data">
//                 {activeInActive === "active" ? (
//                   <NftActiveInActiveBlock apiData={BidApi} />
//                 ) : (
//                   <NftActiveInActiveBlock apiData={OfferApi} />
//                 )}
//               </div>
//               {activeInActive == "active" ? (
//                 <button
//                   className="btn btn-primary mt-3"
//                   data-bs-toggle="modal"
//                   data-bs-target="#myModalShare"
//                   style={{
//                     display:
//                       props?.responseData?.createdBy != loggedInUser?._id &&
//                         props?.responseData?.salesInfo?.isOpenForSale
//                         ? "block"
//                         : "none",
//                     height: "40px",
//                     width: "180px",
//                     padding: "0px",
//                     marginLeft: "1em",
//                   }}
//                 >
//                   Place Bid
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     className="btn btn-primary mt-3"
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModalShare"
//                     style={{
//                       height: "40px",
//                       width: "180px",
//                       padding: "0px",
//                       marginLeft: "1em",
//                     }}
//                   >
//                     Make Offer
//                   </button>
//                 </>
//               )}

//               {/* <!-- The Modal --> */}
//               <div className="modal" id="myModal">
//                 <div className="modal-dialog">
//                   <div
//                     className="modal-content"
//                     style={{ borderRadius: "10px", paddingRight: "10px" }}
//                   >
//                     {/* <!-- Modal Header --> */}
//                     <div className="modal-header">
//                       <h4 className="modal-title font-15 font-weight-700">
//                         Make Bid
//                       </h4>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         style={{
//                           width: "10px",
//                           height: "10px",
//                           boxShadow: "none",
//                         }}
//                       ></button>
//                     </div>

//                     {/* <!-- Modal body --> */}
//                     <div className="modal-body">
//                       <h5
//                         className="font-14 font-weight-700"
//                         style={{ marginLeft: "-0.6em" }}
//                       >
//                         Price*
//                       </h5>
//                       <div className="input-group">
//                         <span
//                           className="input-group-text text-primary bg-white font-15"
//                           id="basic-addon1"
//                           style={{ marginLeft: "-0.6em" }}
//                         >
//                           ETH
//                         </span>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="0.01($210)"
//                           aria-label="Username"
//                           aria-describedby="basic-addon1"
//                         />
//                       </div>
//                     </div>

//                     {/* <!-- Modal footer --> */}
//                     <div className="modal-footer mb-4">
//                       <button
//                         type="button"
//                         className="btn btn-primary w-100"
//                         data-bs-dismiss="modal"
//                         style={{ marginLeft: "1.1em" }}
//                       >
//                         Make Bid
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

// /* PricingHistoryComponentTable*/

// <h5 className="font-weight-900 font-16">Pricing History</h5>
//       <div className="row no-gutters  ">
//         <div className=" col-lg-3 col-sm-4">
//           <select
//             id="filter_mobile"
//             style={{
//               width: "100px",
//               fontSize: "14px",
//               height: "37px",
//               borderRadius: "5px",
//             }}
//           >
//             <option>Filter</option>
//             <option>Events</option>
//             <option>Price</option>
//             <option>Date</option>
//           </select>
//         </div>
//         <div className=" col-lg-3 col-sm-4">
//           <button
//             className="text-sky text-start font-15"
//             id="choice_mobile"
//             style={{
//               width: "90px",
//               height: "35px",
//               fontSize: "14px",
//               borderRadius: "5px",
//               borderColor: "#366EEF",
//               backgroundColor: "#fff",
//             }}
//           >
//             Bids <CloseIcon style={{ fontSize: "18px", marginLeft: "1.8em" }} />
//           </button>
//         </div>
//         <div className=" col-lg-3 col-sm-4">
//           <button
//             className="text-sky text-start font-15"
//             style={{
//               width: "90px",
//               height: "35px",
//               fontSize: "14px",

//               borderRadius: "5px",
//               borderColor: "#366EEF",
//               backgroundColor: "#fff",
//             }}
//           >
//             List <CloseIcon style={{ fontSize: "18px", marginLeft: "1.8em" }} />
//           </button>
//         </div>
//         <div className=" col-lg-3 col-sm-4">
//           <button
//             className="text-sky text-start font-15"
//             style={{
//               width: "90px",
//               height: "35px",
//               borderRadius: "5px",
//               fontSize: "14px",

//               borderColor: "#366EEF",
//               backgroundColor: "#fff",
//             }}
//           >
//             Offer{" "}
//             <CloseIcon style={{ fontSize: "18px", marginLeft: "1.6em" }} />
//           </button>
//         </div>
//       </div>
//       {/* </div> */}
//       <div
//         className="row no-gutters mt-3 font-15 font-weight-900"
//         style={{ backgroundColor: "#FBFBFB", padding: "10px" }}
//       >
//         <div className=" col-3">Event</div>
//         <div className=" col-2">Price</div>
//         <div className=" col-2">From</div>
//         <div className=" col-3">To</div>
//         <div className=" col-2">Date</div>
//       </div>
//       <div
//         className="border mt-2 pricingtable_mob"
//         style={{ width: "550px", marginLeft: "-0.7em" }}
//       >
//         <div className="row no-gutters font-14" style={{ padding: "10px" }}>
//           <div className=" col-3 border-bottom">List</div>
//           <div className=" col-2 border-bottom">0.09 ETH</div>
//           <div className=" col-2 border-bottom">CreatX</div>
//           <div className=" col-3 border-bottom">Beeple</div>
//           <div className=" col-2 border-bottom">1 July</div>
//         </div>
//         <div className="row no-gutters font-14" style={{ padding: "10px" }}>
//           <div className=" col-3 border-bottom">List</div>
//           <div className=" col-2 border-bottom">0.09 ETH</div>
//           <div className=" col-2 border-bottom">CreatX</div>
//           <div className=" col-3 border-bottom">Beeple</div>
//           <div className=" col-2 border-bottom">1 July</div>
//         </div>
//         <div className="row no-gutters font-14" style={{ padding: "10px" }}>
//           <div className=" col-3 border-bottom">List</div>
//           <div className=" col-2 border-bottom">0.09 ETH</div>
//           <div className=" col-2 border-bottom">CreatX</div>
//           <div className=" col-3 border-bottom">Beeple</div>
//           <div className=" col-2 border-bottom">1 July</div>
//         </div>
//         {/* <div className="row no-gutters font-14" style={{ padding: "10px" }}>
//           <div className="col-3">List</div>
//           <div className="col-2">0.09 ETH</div>
//           <div className="col-2">CreatX</div>
//           <div className="col-3">Beeple</div>
//           <div className="col-2">1 July</div>
//         </div> */}
//       </div> */}