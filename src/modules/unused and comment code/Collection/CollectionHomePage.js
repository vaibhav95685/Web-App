// import React, { Component } from "react";
// import Collections_tile from "../../common/components/Collections_tile";

// export class CollectionHomePage extends Component {
//   render() {
//     return (
//       <div>
//         {/* Filter Buttons  */}
//         <div className="lower__homepage">
//           <div id="filters">
//             <div className="dropdown">
//               <button
//                 className="btn btn-secondary dropdown-toggle"
//                 type="button"
//                 id="dropdownMenuButton1"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//                 placeholder="All"
//                 style={{
//                   width: "200%",
//                   backgroundColor: "white",
//                   color: "black",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 Categories
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
//           </div>
//           <div className="dropdown">
//             <button
//               className="btn btn-secondary dropdown-toggle"
//               type="button"
//               id="dropdownMenuButton3"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//               style={{
//                 width: "100%",
//                 backgroundColor: "white",
//                 color: "black",
//                 border: "1px solid #ddd",
//               }}
//             >
//               Sort by
//             </button>
//             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Action
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Another action
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Something else here
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="row   mx-0 text-center">
//           {/* map- API */}
//           {[1].map(() => {
//             return (
//               <div className="row">
//                 <Collections_tile
//                   Collections_title={"Abstract Illusion"}
//                   collection_image={
//                     "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202111/ab-nft-sixteen_nine.jpg"
//                   }
//                   no_of_items={"2"}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// export default CollectionHomePage;
